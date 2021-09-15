package main

import (
	"fmt"
	"io/ioutil"
	"strings"
	"text/template"

	"github.com/gomarkdown/markdown"
)

func createHomePage() {
	t, err := template.ParseFiles("./templates/home.html", "./templates/base.html")
	if err != nil {
		panic(err)
	}

	err = createBuildFileUsingTemplate(t, "index.html", struct{}{})
	if err != nil {
		panic(err)
	}
}

type Article struct {
	Title       string
	Date        string
	UrlName     string
	HtmlContent string
}

func createArticlePages() {
	files, err := ioutil.ReadDir("./content")
	if err != nil {
		panic(err)
	}

	fileNames := []string{}

	for _, file := range files {
		if !file.IsDir() {
			fileNames = append(fileNames, file.Name())
		}
	}

	for _, fileName := range fileNames {
		b, err := ioutil.ReadFile("./content/" + fileName)
		if err != nil {
			panic(err)
		}
		source := string(b)
		sourceClipped := strings.Split(source, "---\n\n")[1]

		md := []byte(sourceClipped)
		output := markdown.ToHTML(md, nil, nil)

		article := Article{
			Title:       getMetadataField(source, "title"),
			Date:        getMetadataField(source, "date"),
			HtmlContent: string(output),
			UrlName:     strings.Split(fileName, ".")[0],
		}

		t, err := template.ParseFiles("./templates/article.html", "./templates/base.html")
		if err != nil {
			panic(err)
		}

		err = createBuildFileUsingTemplate(t, "posts/"+article.UrlName+"/index.html", article)
		if err != nil {
			panic(err)
		}
	}
}

func copyImages() {
	CopyDirectory("./content/images", "./build/images")
}

func main() {

	fmt.Println("Creating home page")
	createHomePage()

	fmt.Println("Creating article pages")
	createArticlePages()

	fmt.Println("Copying images")
	copyImages()
}
