package service

import (
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	"golang.org/x/crypto/bcrypt"

	"../db"
	"../dto"
	"github.com/globalsign/mgo/bson"
)

type UserService struct {
}

func (f *UserService) AddStudent(r *http.Request, student *dto.Student, reply *string) error {
	student.Id = bson.NewObjectId()
	time := time.Now()
	date := time.Format("2006-January-02")
	student.JoiningDate = date
	log.Println(student.Dob)
	err := db.Insert(&student)
	if err != nil {
		log.Println("add student error:", err)
		if strings.Contains(err.Error(), "duplicate key error collection") {
			return fmt.Errorf("RollNo already exsists")
		}
		log.Println("student error:", err)
		return err

	}

	*reply = "Inserted Successfully"
	return nil
}
func (f *UserService) GetAdmin(r *http.Request, admin *dto.Admin, reply *[]dto.Admin) error {
	err := db.Find(reply, nil)
	if err != nil {
		return err
	}
	return nil

}
func (f *UserService) GetStudent(r *http.Request, admin *dto.Student, reply *[]dto.Student) error {
	err := db.Find(reply, nil)
	if err != nil {
		return err
	}
	return nil

}
func (f *UserService) AddAdmin(r *http.Request, admin *dto.Admin, reply *string) error {
	admin.Id = bson.NewObjectId()
	pass := []byte(admin.Password)
	admin.Password = ""
	Password, err := bcrypt.GenerateFromPassword(pass, 5)
	if err != nil {
		log.Println("bycrpt error :", err)
		return err
	}
	admin.Hash = Password
	err = db.Insert(admin)
	if err != nil {
		log.Println("add admin error:", err)
		if strings.Contains(err.Error(), "duplicate key error collection") {
			return fmt.Errorf("UserName already exsists")
		}
		log.Println("admin error:", err)
		return err

	}

	*reply = "Inserted Successfully"
	return nil
}

func LoginAdmin(args *dto.Admin, reply *string) error {
	var result dto.Admin
	err := db.Find(&result, bson.M{"username": args.Username})
	if err != nil {
		if strings.Contains(err.Error(), "not found") {
			return fmt.Errorf("invalid creditional")
		}
	}
	err = bcrypt.CompareHashAndPassword(result.Hash, []byte(args.Password))
	if err == nil {
		*reply = "Login successfully"
	} else {
		log.Println("error in validation  :", err)
		return fmt.Errorf("invalid creditional")
	}

	return nil

}
func LoginStudent(args *dto.Student, reply *string) error {
	var result dto.Student
	err := db.Find(&result, bson.M{"rollno": args.RollNo})
	if err != nil {
		if strings.Contains(err.Error(), "not found") {
			return fmt.Errorf("invalid creditional")
		}
	}
	log.Println(args.Dob)
	if args.Dob == result.Dob {
		*reply = args.Name
	} else {
		log.Println("error in validation  :", err)
		return fmt.Errorf("invalid creditional")
	}
	return nil

}
func (f *UserService) FeedBack(r *http.Request, params *dto.Response, reply *int) error {
	t := time.Now()
	t1 := t.Hour()
	log.Println("time is:", t1)
	var err error
	var token int
	if t1 >= 12 && t1 < 15 {
		token, err = TokenGenerate(t1, params)
		log.Println("lunch Token is ", token)
		err = db.Update(&params, bson.M{"rollno": params.RollNo, "time": params.Time}, bson.M{"$set": bson.M{"breakfast": params.Value}})
		if err != nil {
			log.Println(" err in update :", err)
			return err
		}
	} else if t1 >= 20 && t1 < 22 {
		token, err = TokenGenerate(t1, params)
		log.Println("dinner Token is ", token)
		err = db.Update(&params, bson.M{"rollno": params.RollNo, "time": "2020-October-1"}, bson.M{"$set": bson.M{"lunch": params.Value}})
	} else if t1 >= 8 && t1 < 10 {
		token, err = TokenGenerate(t1, params)
		log.Println("BreakFast Token is ", token)
		err = db.Update(&params, bson.M{"rollno": params.RollNo, "time": params.Time}, bson.M{"$set": bson.M{"dinner": params.Value}})
	}
	if err != nil {
		log.Println(" err in update :", err)
		return err
	}
	*reply = token
	return nil

}
func (f *UserService) GetData(r *http.Request, params *dto.Student, reply *string) error {
	err := db.Find(&params, nil)
	if err != nil {
		log.Println(err)
	}
	log.Println(params)
	return nil
}
func Sheduler() {
	log.Println("cron called")
	var std []dto.Student
	var res dto.Response
	var token dto.Token
	time := time.Now()
	day := time.Format("2006-January-02")
	log.Println("today :", day)
	token.TokenNo = 0
	token.Date = day
	db.Insert(&token)
	count, err := db.Count(&std)
	if err != nil {
		log.Println(err)
	}
	log.Println(count)
	err1 := db.Find(&std, nil)
	if err1 != nil {
		log.Println(err1)
	}
	for i := 0; i < count; i++ {
		res.RollNo = std[i].RollNo
		res.Name = std[i].Name
		res.Time = day
		res.BreakFast = 0
		res.Lunch = 0
		res.Dinner = 0
		err := db.Insert(&res)
		if err != nil {
			log.Println(err)
		}
	}
	log.Println("table created")

}
func TokenGenerate(t1 int, params *dto.Response) (token int, err error) {
	log.Println("TokenGenerate called ")
	var Token dto.Token
	time := time.Now()
	day := time.Format("2006-January-02")
	db.Find(&Token, nil)
	T := Token.TokenNo
	log.Println(T)
	Token.TokenNo = T + 1
	if t1 >= 12 && t1 < 15 {
		log.Println("token generated for lunch")
		db.Update(&Token, bson.M{"date": day}, bson.M{"$set": bson.M{"tokenno": Token.TokenNo}})
		if err != nil {
			return 0, err
		}
		return Token.TokenNo, nil
	} else if t1 >= 20 && t1 < 22 {
		log.Println("token generated for dinner")

		db.Update(&Token, bson.M{"date": day}, bson.M{"$set": bson.M{"tokenno": Token.TokenNo}})
		if err != nil {
			return 0, err
		}
		return Token.TokenNo, nil
	} else if t1 >= 8 && t1 < 10 {
		log.Println("token generated for BreakFast")

		db.Update(&Token, bson.M{"date": day}, bson.M{"$set": bson.M{"tokenno": Token.TokenNo}})
		if err != nil {
			return 0, err
		}
		return Token.TokenNo, nil
	}

	return 0, nil
}
