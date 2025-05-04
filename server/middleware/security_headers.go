package middleware

import "github.com/gin-gonic/gin"

func SecurityHeaders() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("X-Content-Type-Options", "nosniff")
		c.Writer.Header().Set("X-Frame-Options", "DENY")
		c.Header("Content-Security-Policy", "default-src 'self'; img-src 'self' https://avatars.githubusercontent.com")
		c.Next()
	}
}
