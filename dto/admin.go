package dto

import (
	"github.com/globalsign/mgo/bson"
)

type Admin struct {
	Id       bson.ObjectId `json:"id"bson:"_id"`
	Username string        `json:"username"bson:"username"`
	Password string        `json:"password"bson:"password"`
	Hash     []byte        `json:"hash"bson:"hash"`
	Role     string        `json:"role"bson:"role"`
}
type Student struct {
	Id       bson.ObjectId `bson:"_id,omitempty"`
	Name     string        `json:"name,omitempty", bson:"name,omitempty"`
	RollNo   int           `json:"rollno,omitempty", bson:"rollno,omitempty"`
	Password string        `json:"password"bson:"password"`
	Hash     []byte        `json:"hash"bson:"hash"`
}
type Response struct {
	RollNo    int    `json:"rollno,omitempty", bson:"rollno,omitempty"`
	Name      string `json:"name,omitempty", bson:"name,omitempty"`
	Time      string `json:"time,omitempty", bson:"time,omitempty"`
	Value     int    `json:"value,omitempty", bson:"value,omitempty"`
	BreakFast int    `json:"breakfast,omitempty", bson:"breakfast,omitempty"`
	Lunch     int    `json:"lunch,omitempty", bson:"lunch,omitempty"`
	Dinner    int    `json:"dinner,omitempty", bson:"dinner,omitempty"`
}
type Token struct {
	TokenNo int `json:"token,omitempty",bson:"token,omitempty"`
}
