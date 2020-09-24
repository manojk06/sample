package main

// Importing fmt and time
import (
	"fmt"
	"time"
)

// Calling main
func main() {

	// Declaring t in UTC

	//timeformat:="15:04:05"
	time := time.Now()
	t := time.Hour()
	fmt.Println(t)

}
