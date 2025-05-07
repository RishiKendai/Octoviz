package middleware

import (
	"fmt"

	"github.com/RishiKendai/Octoviz/pkg/config/response"

	"github.com/gin-gonic/gin"
)

func ErrorHandler(c *gin.Context) {
	defer func() {
		if err := recover(); err != nil {
			response.SendServerError(c, fmt.Errorf("%v", err), nil)
		}
	}()
	c.Next()
}
