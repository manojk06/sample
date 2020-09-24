/*
	The mongo package is a very simple wrapper around the github.com/globalsign/mgo/bson
	package. It's purpose is to allow you to do CRUD operations with very
	little code. It's not exhaustive and not meant to do everything for you.
*/
package db

import (
	"errors"
	"reflect"

	log "github.com/sirupsen/logrus"

	"github.com/globalsign/mgo"
	"github.com/globalsign/mgo/bson"
)

var Db = new(DB)

type DB struct {
	URL        string
	mgoSession *mgo.Session
	Database   string
}

var (
	NoPtr = errors.New("You must pass in a pointer")
)

// Set the mongo servers and the database
func Connect(servers, database string) error {
	var err error

	Db.Database = database

	Db.mgoSession, err = mgo.Dial(servers)
	return err
}

// Insert one or more structs. Must pass in a pointer to a struct. The struct must
// contain an Id field of type bson.ObjectId with a tag of `bson:"_id"`.
func Insert(records ...interface{}) error {
	for _, rec := range records {
		if !isPtr(rec) {
			return NoPtr
		}

		s, err := GetSession()
		if err != nil {
			return err
		}
		defer s.Close()

		coll := GetColl(s, typeName(rec))
		err = coll.Insert(rec)
		if err != nil {
			return err
		}
	}

	return nil
}

func Update(i interface{}, q bson.M, u bson.M) error {
	var err error
	if !isPtr(i) {
		return NoPtr
	}

	s, err := GetSession()
	if err != nil {
		return err
	}
	defer s.Close()

	coll := GetColl(s, typeName(i))

	if isSlice(reflect.TypeOf(i)) {
		var updateInfo *mgo.ChangeInfo
		if updateInfo, err = coll.UpdateAll(q, u); err != nil {
			log.Printf("Error on update many %v \n", err)
			return err
		}
		log.Info("Update Info %v \n", updateInfo)
	} else {
		if err = coll.Update(q, u); err != nil {
			log.Error("Error on update %v \n", err)
			return err
		}
	}
	return err
}

// Find one or more records. If a single struct is passed in we'll return one record.
// If a slice is passed in all records will be returned. Must pass in a pointer to a
// struct or slice of structs. Use sortFields to sort the results. See
// http://www.mongodb.org/display/DOCS/Sorting+and+Natural+Order for more info.
func Find(i interface{}, q bson.M, sortFields ...string) error {
	if !isPtr(i) {
		return NoPtr
	}

	s, err := GetSession()
	if err != nil {
		return err
	}
	defer s.Close()

	coll := GetColl(s, typeName(i))

	query := coll.Find(q).Sort(sortFields...)

	if isSlice(reflect.TypeOf(i)) {
		err = query.All(i)
	} else {
		err = query.One(i)
	}
	return err
}

func Aggregation(collection string, bindObject interface{}, q []bson.M) error {
	if !isPtr(bindObject) {
		return NoPtr
	}

	s, err := GetSession()
	if err != nil {
		return err
	}
	defer s.Close()

	coll := GetColl(s, collection)

	query := coll.Pipe(q)
	log.Printf("Query: %+v\n", query)
	if isSlice(reflect.TypeOf(bindObject)) {
		err = query.All(bindObject)
		log.Printf("List: %+v\n", bindObject)
	} else {
		err = query.One(bindObject)
		log.Printf("One: %+v\n", bindObject)
	}
	return err
}

func FindAll(red interface{}) error {
	if !isPtr(red) {
		return NoPtr
	}

	session, _ := GetSession()
	defer session.Close()

	coll := GetColl(session, typeName(red))

	err := coll.Find(nil).Sort("-$natural").All(red)
	if err != nil {
		return err
	}

	return nil
}

func FindAllDesceding(red interface{}, sortFields ...string) error {
	if !isPtr(red) {
		return NoPtr
	}

	session, _ := GetSession()
	defer session.Close()

	coll := GetColl(session, typeName(red))

	err := coll.Find(nil).Sort("-$natural").All(red)
	if err != nil {
		return err
	}

	return nil
}

func FindAllTransaction(red interface{}, sortFields ...string) error {
	if !isPtr(red) {
		return NoPtr
	}
	session, _ := GetSession()
	defer session.Close()
	coll := GetColl(session, typeName(red))
	err := coll.Find(nil).Sort(sortFields...).All(red)
	if err != nil {
		log.Error("Mongo FindAll Error : ", err)
		return err
	}
	return nil
}

func FindByMtiRRNTimeMsgType(red interface{}, mti string, rrn string, time string) error {
	if !isPtr(red) {
		return NoPtr
	}

	session, _ := GetSession()
	defer session.Close()

	coll := GetColl(session, typeName(red))

	err := coll.Find(bson.M{"mti": "0" + mti, "rrn": rrn, "time": time, "msgType": "Response"}).One(red)
	if err != nil {
		return err
	}

	return nil
}

func DeleteById(red interface{}, id string) error {
	if !isPtr(red) {
		return NoPtr
	}

	session, _ := GetSession()
	defer session.Close()

	coll := GetColl(session, typeName(red))

	err := coll.Remove(bson.M{"_id": bson.ObjectIdHex(id)})
	if err != nil {
		return err
	}

	return nil
}

func FindAllPagenation(red interface{}, q bson.M, page int, size int, sortFields ...string) (int, error) {
	if !isPtr(red) {
		return 0, NoPtr
	}

	session, _ := GetSession()
	defer session.Close()

	coll := GetColl(session, typeName(red))

	var skip int = 0
	if page > 1 {
		skip = size * (page - 1)
	}

	count, er := coll.Find(q).Count()
	if er != nil {
		return 0, er
	}
	log.Info("Transaction Query: ", q)
	err := coll.Find(q).Skip(skip).Limit(size).Sort(sortFields...).All(red)
	log.Println("red", red)
	if err != nil {
		return 0, err
	}
	return count, err
}

func FindByStatusPagenation(red interface{}, status string, page int, size int, sortFields ...string) (int, error) {
	if !isPtr(red) {
		return 0, NoPtr
	}

	session, _ := GetSession()
	defer session.Close()

	coll := GetColl(session, typeName(red))

	var skip int = 0
	if page > 1 {
		skip = size * (page - 1)
	}

	count, er := coll.Find(bson.M{"status": status}).Count()
	if er != nil {
		return 0, er
	}
	err := coll.Find(bson.M{"status": status}).Skip(skip).Limit(size).Sort(sortFields...).All(red)

	if err != nil {
		return 0, err
	}

	return count, err
}

// Find a single record by id. Must pass a pointer to a struct.
func FindById(i interface{}, id string) error {
	return Find(i, bson.M{"_id": bson.ObjectIdHex(id)})
}
func FindByEmail(i interface{}, email string) error {
	return Find(i, bson.M{"emailId": email})
}
func FindBySequence(i interface{}, sequence string) error {
	return Find(i, bson.M{"name": sequence})
}
func FindByRRN(i interface{}, sequence string) error {
	return Find(i, bson.M{"rrn": sequence})
}
func FindByNot(role string, admin string, l1 string, l2 string, red interface{}, sortFields ...string) error {
	if !isPtr(red) {
		return NoPtr
	}

	session, _ := GetSession()
	defer session.Close()

	coll := GetColl(session, typeName(red))

	// err := coll.Find(nil).Sort(sortFields...).All(red)
	err := coll.Find(bson.M{"$or": []bson.M{bson.M{role: admin}, bson.M{role: l1}, bson.M{role: l2}}}).Sort("-$natural").All(red)
	if err != nil {
		return err
	}

	return nil
}

func UniqueIndex(i interface{}, indexKey []string) error {
	s, err := GetSession()
	if err != nil {
		log.Error("Creating Index failed : ", err)
		return err
	}
	defer s.Close()
	coll := GetColl(s, typeName(i))
	index := mgo.Index{Key: indexKey, Unique: true}
	indexErr := coll.EnsureIndex(index)
	if indexErr != nil {
		log.Error("Creating Index failed : ", indexErr)
	}
	return err
}

// Does a count on the collection for the struct that is passed in.
func Count(i interface{}) (int, error) {
	s, err := GetSession()
	if err != nil {
		return 0, err
	}
	defer s.Close()

	coll := GetColl(s, typeName(i))

	return coll.Count()
}

func UpdateById(q bson.ObjectId, i interface{}) error {
	s, err := GetSession()
	if err != nil {
		return err
	}
	defer s.Close()
	coll := GetColl(s, typeName(i))
	errs := coll.UpdateId(q, i)
	if errs != nil {
		log.Error(errs)
	}
	return errs
}

func Distinct(collection string, q bson.M, field string, sortFields ...string) (result []string, err error) {

	s, err := GetSession()
	if err != nil {
		return result, err
	}
	defer s.Close()

	coll := GetColl(s, collection)

	err = coll.Find(q).Sort(sortFields...).Distinct(field, &result)
	if err != nil {
		return result, err
	}
	return result, err
}

func FindAndUpdate(i interface{}, q map[string]interface{}, update mgo.Change) error {
	s, err := GetSession()
	if err != nil {
		return err
	}
	defer s.Close()

	coll := GetColl(s, typeName(i))
	_, errr := coll.Find(q).Apply(update, i)
	if errr != nil {
		log.Println("Mongo Update Error : ", errr)
	}
	return errr
}

func UpdateKey(i interface{}, q map[string]interface{}, u bson.M) error {
	s, err := GetSession()
	if err != nil {
		return err
	}
	defer s.Close()

	coll := GetColl(s, typeName(i))
	changeUpdate := bson.M{}
	changeUpdate["$set"] = u
	update := mgo.Change{
		Update:    changeUpdate,
		ReturnNew: true,
		Upsert:    false,
	}

	_, errr := coll.Find(q).Apply(update, i)
	if errr != nil {
		log.Println("Mongo Update Error : ", errr)
	}
	return errr
}

// Returns a Mongo session. You must call Session.Close() when you're done.
func GetSession() (*mgo.Session, error) {
	var err error

	if Db.mgoSession == nil {
		Db.mgoSession, err = mgo.Dial(Db.URL)
		if err != nil {
			return nil, err
		}
	}

	return Db.mgoSession.Copy(), nil
}

// We pass in the session because that is a clone of the original and the
// caller will need to close it when finished.
func GetColl(session *mgo.Session, coll string) *mgo.Collection {
	return session.DB(Db.Database).C(coll)
}

func isPtr(i interface{}) bool {
	return reflect.ValueOf(i).Kind() == reflect.Ptr
}

func typeName(i interface{}) string {
	t := reflect.TypeOf(i)

	if t.Kind() == reflect.Ptr {
		t = t.Elem()
		if t.Kind() == reflect.Ptr {
			t = t.Elem()
		}
	}

	if isSlice(t) {
		t = t.Elem()
		if t.Kind() == reflect.Ptr {
			t = t.Elem()
		}
	}
	return t.Name()
}

// returns true if the interface is a slice
func isSlice(t reflect.Type) bool {
	if t.Kind() == reflect.Ptr {
		t = t.Elem()
	}
	return t.Kind() == reflect.Slice
}

func hasStructField(i interface{}, field string) bool {
	t := reflect.TypeOf(i)
	if t.Kind() == reflect.Ptr {
		t = t.Elem()
	}

	if t.Kind() != reflect.Struct {
		return false
	}

	_, found := t.FieldByName(field)
	return found
}
