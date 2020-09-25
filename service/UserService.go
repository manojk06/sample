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
	pass := []byte(student.Password)
	student.Password = ""
	Password, err := bcrypt.GenerateFromPassword(pass, bcrypt.DefaultCost)
	if err != nil {
		log.Println("bycrpt error :", err)
		return err
	}
	student.Hash = Password
	err = db.Insert(student)
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
	err := db.Find(&reply, nil)
	if err != nil {
		return err
	}
	return nil

}
func (f *UserService) GetStudent(r *http.Request, admin *dto.Student, reply *[]dto.Student) error {
	err := db.Find(&reply, nil)
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
func (f *UserService) FeedBack(r *http.Request, params *dto.Response, reply *string) error {
	t := time.Now()
	t1 := t.Hour()
	log.Println("time is:", t1)
	var err error
	if t1 >= 12 && t1 <= 18 {
		err = db.Update(&params, bson.M{"time": params.Time}, bson.M{"$set": bson.M{"BreakFast": params.BreakFast}})
	} else if t1 >= 18 && t1 <= 23 {
		err = db.Update(&params, bson.M{"time": params.Time}, bson.M{"$set": bson.M{"Lunch": params.Lunch}})
	} else if t1 >= 8 && t1 <= 12 {
		err = db.Update(&params, bson.M{"time": params.Time}, bson.M{"$set": bson.M{"Dinner": params.Dinner}})
	}
	if err != nil {
		log.Println("err to update:", err)
	}

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
	time := time.Now()
	day := time.Format("2006-January-02")
	log.Println("today :", day)
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
