package env

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
)

func CheckEnv() string {
	err := godotenv.Load()
	if err != nil {
		fmt.Println("❗Error loading .env file but will try from the environment variable")
	}
	return "success"
}

func EnvPort() string {
	CheckEnv()
	port := os.Getenv("PORT")
	if port == "" {
		fmt.Println("🥹 PORT is not set")
	}
	return port
}

func GetEnvKey(key string) string {
	CheckEnv()
	value := os.Getenv(key)
	if value == "" {
		fmt.Println(key + " is not set")
	}
	return value
}
