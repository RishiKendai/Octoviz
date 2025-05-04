package response

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

// 200 with data
func SendJSON(c *gin.Context, data any, action *string) {
	c.JSON(http.StatusOK, bson.M{
		"status": "success",
		"data":   data,
		"action": action,
	})
}

// 200 with message
func SendStatusMessage(c *gin.Context, message string, action *string) {
	c.JSON(http.StatusOK, bson.M{
		"status":  "success",
		"message": message,
		"action":  action,
	})
}

// 201 with message
func SendCreated(c *gin.Context, message string, action *string) {
	c.JSON(http.StatusCreated, gin.H{
		"status":  "success",
		"message": message,
		"action":  action,
	})
}

// 202 with message
func SendAccepted(context *gin.Context, message string, action *string) {
	context.JSON(http.StatusAccepted, gin.H{
		"status":  "success",
		"message": message,
		"action":  action,
	})
}

/* ---------------- Error Functions ---------------- */

// 400 with error, message and abort
func SendBadRequestError(context *gin.Context, message string, action *string) {
	context.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
		"status": "error",
		"error":  message,
		"action": action,
	})
}

// 401 with error and abort
func SendUnAuthorizedError(c *gin.Context, message string, action *string) {
	c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
		"status": "error",
		"error":  message,
		"action": action,
	})
}

// 403 with error
func SendForbiddenError(c *gin.Context, message string, action *string) {
	c.AbortWithStatusJSON(http.StatusForbidden, gin.H{
		"status": "error",
		"error":  message,
		"action": action,
	})
}

// 404 with message
func SendNotFoundError(c *gin.Context, message string, action *string) {
	c.AbortWithStatusJSON(http.StatusNotFound, gin.H{
		"status": "error",
		"error":  message,
		"action": action,
	})
}

// 500 with error
func SendServerError(c *gin.Context, err error, action *string) {
	c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
		"status": "error",
		"error":  err.Error(),
		"action": action,
	})

	log.Printf("ErrorPath: %s Error:: %s", c.HandlerName(), err.Error())
}

/* ---------------- Common Functions ---------------- */

// status code
func SendStatus(c *gin.Context, code int) {
	c.AbortWithStatus(code)
}

// status code with error
func SendStatusWithError(c *gin.Context, code int, err error) {
	c.AbortWithError(code, err)
}
