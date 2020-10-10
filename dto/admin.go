package dto

import (
	"github.com/globalsign/mgo/bson"
)

type Admin struct {
	Id            bson.ObjectId `json:"id"bson:"_id"`
	Username      string        `json:"username"bson:"username"`
	Password      string        `json:"password"bson:"password"`
	Hash          []byte        `json:"hash"bson:"hash"`
	Role          string        `json:"role"bson:"role"`
	Name          string        `json:"name"bson:"name"`
	ContactNumber string        `json:"contactnumber"bson:"contactnumber"`
}
type Student struct {
	Id            bson.ObjectId `bson:"_id,omitempty"`
	Name          string        `json:"name,omitempty", bson:"name,omitempty"`
	RollNo        int           `json:"rollno,omitempty", bson:"rollno,omitempty"`
	ContactNumber string        `json:"contactnumber"bson:"contactnumber"`
	Dob           string        `json:"dob"bson:"dob"`
	JoiningDate   string        `json:"joiningdate"bson:"joiningdate"`
}
type Response struct {
	RollNo    int    `json:"Rollno,omitempty", bson:"rollno,omitempty"`
	Name      string `json:"Name,omitempty", bson:"name,omitempty"`
	Time      string `json:"Time,omitempty", bson:"time,omitempty"`
	Value     int    `json:"Value,omitempty", bson:"value,omitempty"`
	BreakFast int    `json:"Breakfast,omitempty", bson:"breakfast,omitempty"`
	Lunch     int    `json:"Lunch,omitempty", bson:"lunch,omitempty"`
	Dinner    int    `json:"Dinner,omitempty", bson:"dinner,omitempty"`
}
type Token struct {
	TokenNo int    `json:"token,omitempty",bson:"token,omitempty"`
	Date    string `json:"date,omitempty",bson:"date,omitempty"`
}

type ChangePassword struct {
	Username    string `json:"username"bson:"username"`
	OldPassword string `json:"oldpassword"bson:"oldpassword"`
	NewPassword string `json:"newpassword"bson:"newpassword"`
}
