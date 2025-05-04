package middleware

import (
	"bytes"
	"io"
	"net/http"

	"dev-profile/pkg/config/response"

	"github.com/gin-gonic/gin"
)

func SaveRequestBody(c *gin.Context) {
	if c.Request.Method == http.MethodPost || c.Request.Method == http.MethodPut || c.Request.Method == http.MethodPatch {
		bodyBytes, err := io.ReadAll(c.Request.Body)
		if err != nil {
			response.SendUnAuthorizedError(c, "Authentication Failed", nil)
			return
		}
		c.Set("requestBody", bodyBytes)
		c.Request.Body = io.NopCloser(bytes.NewBuffer(bodyBytes))
	}
	c.Next()
}

func RestoreRequestBody(c *gin.Context) {
	if c.Request.Method == http.MethodPost || c.Request.Method == http.MethodPut || c.Request.Method == http.MethodPatch {
		if bodyBytes, exists := c.Get("requestBody"); exists {
			c.Request.Body = io.NopCloser(bytes.NewBuffer(bodyBytes.([]byte)))
		}
	}
}
