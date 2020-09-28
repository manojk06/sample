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
	Name     string        `json:"Name,omitempty", bson:"Name,omitempty"`
	RollNo   int           `json:"rollNo,omitempty", bson:"rollNo,omitempty"`
	Password string        `json:"password"bson:"password"`
	Hash     []byte        `json:"hash"bson:"hash"`
}
type Response struct {
	RollNo    int    `json:"RollNo,omitempty", bson:"RollNo,omitempty"`
	Name      string `json:"Name,omitempty", bson:"Name,omitempty"`
	Time      string `json:"time,omitempty", bson:"time,omitempty"`
	Value     int    `json:"value,omitempty", bson:"value,omitempty"`
	BreakFast int    `json:"BreakFast,omitempty", bson:"BreakFast,omitempty"`
	Lunch     int    `json:"Lunch,omitempty", bson:"Lunch,omitempty"`
	Dinner    int    `json:"Dinner,omitempty", bson:"Dinner,omitempty"`
}
