package main

import (
	"github.com/RishiKendai/Octoviz/api/v1/routes"
	"github.com/RishiKendai/Octoviz/middleware"
	"github.com/RishiKendai/Octoviz/pkg/config/env"

	"github.com/gin-gonic/gin"
)

func main() {
	port := env.EnvPort()

	router := gin.Default()

	// Middleware
	router.Use(middleware.CORSMiddleware())
	router.Use(middleware.SaveRequestBody)
	router.Use(middleware.ErrorHandler)
	router.Use(middleware.SecurityHeaders())

	routes.Dashboard(router)

	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"code":         200,
			"message":      "Hello Developer!",
			"random_joke":  "Welcome to Dev profile API. Here's a secret: this API runs on coffee and sheer developer ingenuity. ☕💡",
			"fun_fact":     "Welcome to Dev profile API. If you see this message, you're officially in the matrix. 🕶️🐇",
			"developed_by": "RishiKendai",
		})
	})

	router.Run(":" + port)
}
