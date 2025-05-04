package dashboard

import (
	"bytes"
	"dev-profile/pkg/config/env"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

func MakeGraphqlRequest(url string, payload string) ([]byte, error) {
	token := env.GetEnvKey("TOKEN")

	type GraphQLRequest struct {
		Query string `json:"query"`
	}
	requestBody := GraphQLRequest{Query: payload}
	payloadBytes, err := json.Marshal(requestBody)
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(payloadBytes))
	if err != nil {
		return nil, err
	}

	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Accept", "application/vnd.github+json")
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	if resp.StatusCode != 200 {
		return nil, fmt.Errorf("GraphQL request failed with status %d: %s", resp.StatusCode, string(body))
	}

	return body, nil
}

func MakeRESTRequest(url string, payload interface{}) ([]byte, error) {
	var req *http.Request
	var err error
	token := env.GetEnvKey("TOKEN")

	if payload == nil {
		req, _ = http.NewRequest("GET", url, nil)
	} else {
		payloadBytes, ok := payload.([]byte)
		if !ok {
			return nil, fmt.Errorf("expected payload to be []byte, got %T", payload)
		}
		req, _ = http.NewRequest("GET", url, bytes.NewBuffer(payloadBytes))
	}

	req.Header.Set("Authorization", "Bearer "+token)
	req.Header.Set("Accept", "application/vnd.github+json")
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	return body, nil
}
