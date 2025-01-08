package main

import (
	"io/ioutil"
	"strings"

	"github.com/gomarkdown/markdown"
)

type CoverImageInfo struct {
	Url    string
	Width  string
	Height string
}

type Article struct {
	Title       string
	Date        string
	UrlName     string
	HtmlContent string
	CoverImage  CoverImageInfo
	IsUnlisted  bool
}

const (
	defaultCoverImageUrl    = "https://carlriis.com/images/big-favicon.png"
	defaultCoverImageWidth  = "512"
	defaultCoverImageHeight = "512"
)

func getCoverImageInfo(articleSource string) CoverImageInfo {
	info := CoverImageInfo{}
	imageUrl := getMetadataField(articleSource, "coverImageUrl")
	if imageUrl == "" {
		info.Url = defaultCoverImageUrl
	} else {
		info.Url = "https://carlriis.com" + imageUrl
	}
	imageWidth := getMetadataField(articleSource, "coverImageWidth")
	if imageWidth == "" {
		info.Width = defaultCoverImageWidth
	} else {
		info.Width = imageWidth
	}
	imageHeight := getMetadataField(articleSource, "coverImageHeight")
	if imageHeight == "" {
		info.Height = defaultCoverImageHeight
	} else {
		info.Height = imageHeight
	}
	return info
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
			IsUnlisted:  getMetadataField(source, "unlisted") == "true",
			HtmlContent: string(output),
			UrlName:     strings.Split(fileName, ".")[0],
			CoverImage:  getCoverImageInfo(source),
		}
		articles = append(articles, article)
	}
	return articles
}
