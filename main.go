package main

import (
	j "encoding/json"
	"io/ioutil"
	"log"
	"net/http"
	"time"

	"golang.org/x/crypto/bcrypt"

	"github.com/globalsign/mgo/bson"
	"github.com/robfig/cron"

	"github.com/spf13/viper"

	config "./config"
	"./db"
	"./dto"
	"./service"
	"github.com/gorilla/mux"
	"github.com/gorilla/rpc"
	"github.com/gorilla/rpc/json"
)

func main() {
	log.SetFlags(log.LstdFlags | log.Lshortfile)
	log.Println("started..")
	config.Config()
	DbConnect()
	c := cron.New()
	c.AddFunc("@daily", service.Sheduler)
	c.Start()
	s := rpc.NewServer()
	s.RegisterCodec(json.NewCodec(), "application/json")
	s.RegisterService(new(service.UserService), "")
	r := mux.NewRouter()
	r.HandleFunc("/login", Login)
	r.HandleFunc("/loginstudent", LoginStudent)
	rrpc := r.PathPrefix("/rpc").Subrouter()
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("static")))
	rrpc.Handle("", s)
	log.Println("connected to port", viper.GetString("Port"))
	err := http.ListenAndServe(viper.GetString("Port"), r)
	if err != nil {
		log.Panic("err:", err)
	}

}
func DbConnect() {
	err1 := db.Connect(viper.GetString("MongoURL"), viper.GetString("MongoDB"))
	if err1 != nil {
		log.Fatalf("Db connection failed", err1)
	}
	log.Println("Db connected...")
	var admin *dto.Admin
	var student *dto.Student
	err2 := db.UniqueIndex(&admin, []string{"username"})
	if err2 != nil {
		log.Println(err2)
	}
	err3 := db.UniqueIndex(&student, []string{"rollno"})
	if err3 != nil {
		log.Println(err2)
	}
	count, _ := db.Count(&admin)
	if count == 0 {
		ad := &dto.Admin{}
		ad.Id = bson.NewObjectId()
		ad.Username = "admin@gmail.com"
		ad.Password = ""
		Hash, _ := bcrypt.GenerateFromPassword([]byte("Test@1234"), 5)
		ad.Hash = Hash
		ad.Role = "admin"
		ad.Name = "admin"
		ad.ContactNumber = "9002654872"
		db.Insert(ad)
	}
}
func Login(w http.ResponseWriter, r *http.Request) {
	log.Println("login called....")
	var admin dto.Admin
	body, _ := ioutil.ReadAll(r.Body)
	err := j.Unmarshal(body, &admin)
	if err != nil {
		log.Println("unmarshal error", err)
	}
	var reply string
	err1 := service.LoginAdmin(&admin, &reply)
	if err1 != nil {
		http.Error(w, "Invalid credential", 401)
	} else {
		j.NewEncoder(w).Encode(reply)
	}

}
func LoginStudent(w http.ResponseWriter, r *http.Request) {
	log.Println("loginstudent called....")
	var std dto.Student
	var res dto.Response
	var reply string
	body, _ := ioutil.ReadAll(r.Body)
	err := j.Unmarshal(body, &std)
	if err != nil {
		log.Println("unmarshal error", err)
	}
	log.Println(std.RollNo)
	time := time.Now()
	day := time.Format("2006-January-02")
	db.Find(&res, bson.M{"rollno": std.RollNo, "time": day})
	log.Println(res)
	t1 := time.Hour()
	log.Println(t1)
	log.Println(res.Lunch)
	if t1 >= 12 && t1 < 15 && res.BreakFast == 0 || t1 >= 20 && t1 < 22 && res.Lunch == 0 || t1 >= 8 && t1 < 10 && res.Dinner == 0 {
		err1 := service.LoginStudent(&std, &reply)
		if err1 != nil {
			http.Error(w, "Invalid credential", 401)
		} else {
			j.NewEncoder(w).Encode(reply)
		}
	} else {
		http.Error(w, "Already Token sent", 401)
	}

}
