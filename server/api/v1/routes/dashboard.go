package routes

import (
	"github.com/RishiKendai/Octoviz/api/v1/controllers/dashboard"

	"github.com/gin-gonic/gin"
)

func Dashboard(router *gin.Engine) {
	router.GET("/profile/:github_user", dashboard.ProfileAnalyze)
}
