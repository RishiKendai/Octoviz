package main

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"sort"
	"strings"

	"gopkg.in/yaml.v2"
)

type Lang struct {
	//color hex code, language url
	color, url string
}

func main() {
	m := GetGithubColors()
	writeToJson(m)
	writeToReadme(m)
	defer fmt.Println("ByeBye")
}

// use gobind to call this in other language(like java)
func GetGithubColors() map[string]Lang {
	m := readFile()
	langMap := make(map[string]Lang)
	fmt.Printf("Find %v languages in Github\n", len(m))
	for name, attrs := range m {
		//fmt.Printf("%s: %v \n", name, attrs)
		attrsMap, ok := attrs.(map[interface{}]interface{})
		color, okk := attrsMap["color"]
		stringColor := fmt.Sprintf("%s", color)
		//remove space from name
		newName := strings.Replace(name, " ", "-", -1)
		if okk && ok {
			langMap[newName] = Lang{stringColor, fmt.Sprintf("https://github.com/trending?l=%s", newName)}
		} else {
			langMap[newName] = Lang{"", fmt.Sprintf("https://github.com/trending?l=%s", newName)}
		}
	}
	return langMap
}

func sliceOfKeys(m map[string]Lang) []string {
	keys := make([]string, 0)
	for k := range m {
		keys = append(keys, k)
	}
	return keys
}

func downloadFile(filePath string, url string) (err error) {
	// Create the file
	out, err := os.Create(filePath)
	checkErr(err)
	defer out.Close()

	// Get the data
	resp, err := http.Get(url)
	checkErr(err)
	defer resp.Body.Close()

	// Writer the body to file
	_, err = io.Copy(out, resp.Body)
	checkErr(err)

	return nil
}

func readFile() map[string]interface{} {
	//check exist. if not, create the file
	if _, err := os.Stat("language.yml"); os.IsNotExist(err) {
		fmt.Println("start downloading...")
		downloadFile("language.yml", "https://raw.githubusercontent.com/github/linguist/master/lib/linguist/languages.yml")
	}

	m := make(map[string]any)
	ymlBytes, err := os.ReadFile("language.yml")
	checkErr(err)

	err = yaml.Unmarshal(ymlBytes, m)
	checkErr(err)
	return m
}

func checkErr(err error) (hasErr bool) {
	hasErr = err == nil
	if err != nil {
		fmt.Println(err)
	}
	return hasErr
}

func writeToJson(m map[string]Lang) {
	fmt.Println("Write into color.json...")
	colorMap := make(map[string]string)
	for name, lang := range m {
		colorMap[name] = lang.color
	}
	jsonBytes, err := json.Marshal(colorMap)
	checkErr(err)
	outPath := filepath.Join("..", "..", "src", "data", "colors.json")
	os.WriteFile(outPath, jsonBytes, 0644)
}

func writeToReadme(m map[string]Lang) {
	fmt.Println("Write into README.md...")
	var b []byte
	s := "# Colors of programming languages on GitHub\n\n"
	s += "> Thanks [golang](golang.org) and [ymal](https://github.com/go-yaml/yaml).\n\n"
	colorless := make(map[string]Lang)

	//get slice of keys in map
	keys := sliceOfKeys(m)
	//sort keys
	sort.Strings(keys)
	//write color pic to file
	for _, name := range keys {
		lang := m[name]
		if lang.color != "" {
			//replace space -> -;remove #
			b = []byte(fmt.Sprintf("[![](http://via.placeholder.com/148x148/%s/ffffff&text=%s)](%s)", lang.color[1:], name, lang.url))
			s += string(b)
		} else {
			colorless[name] = lang
		}
	}
	fmt.Printf("And %v languages are have no color\n", len(colorless))

	//write cloerless
	s += "\n\nA few(lot) other languages don't have their own color on GitHub :( \n\n"
	keys = sliceOfKeys(colorless)
	sort.Strings(keys)
	for _, name := range keys {
		lang := colorless[name]
		b = []byte(fmt.Sprintf("- [%s](%s)\n", name, lang.url))
		s += string(b)
	}
	/*
		for name, lang := range colorless {
			b = []byte(fmt.Sprintf("- [%s](%s)\n", name, lang.url))
			s += string(b)
		}*/

	s += "\n\nCurious about all this? Check `ABOUT.md`.\n"
	outByte := []byte(s)
	ioutil.WriteFile("README.md", outByte, 0644)
}
