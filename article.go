package main

import (
	"io/ioutil"
	"strings"

	"github.com/gomarkdown/markdown"
)

type Article struct {
	Title       string
	Date        string
	UrlName     string
	HtmlContent string
}

func getArticles() []Article {
	files, err := ioutil.ReadDir("./content")
	if err != nil {
		panic(err)
	}

	fileNames := []string{}
	articles := []Article{}

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
		articles = append(articles, article)
	}
	return articles
}
