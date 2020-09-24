package config

import (
	"log"

	"github.com/spf13/viper"
)

func Config() {
	viper.SetConfigName("config")
	viper.AddConfigPath(".")
	err := viper.ReadInConfig()
	if err != nil {
		log.Fatalf("Read config error", err)
	}
}
