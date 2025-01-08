package main

import (
	"fmt"
	"sort"
	"text/template"
)

func getArticlesSortedByDate() []Article {
	articles := getArticles()

	sort.Slice(articles, func(i, j int) bool {
		unixI := getUnixTimeFromDateString(articles[i].Date)
		unixJ := getUnixTimeFromDateString(articles[j].Date)

		return unixI > unixJ
	})

	return articles
}

func createHomePage() {
	t, err := template.ParseFiles("./templates/home.html", "./templates/base.html")
	if err != nil {
		panic(err)
	}

	articles := getArticlesSortedByDate()

	err = createBuildFileUsingTemplate(t, "index.html", articles)
	if err != nil {
		panic(err)
	}
}

func createArticlePages() {
	articles := getArticles()

	for _, article := range articles {
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

func copyStyles() {
	Copy("./templates/style.css", "./build/style.css")
}

func copyImages() {
	CopyDirectory("./content/images", "./build/images")
}

func copyFavicon() {
	Copy("./templates/favicon.ico", "./build/favicon.ico")
	Copy("./templates/favicon-32x32.png", "./build/favicon-32x32.png")
	Copy("./templates/favicon-16x16.png", "./build/favicon-16x16.png")
}

func copyCodeFormatting() {
	Copy("./templates/code-formatting/prism.css", "./build/prism.css")
	Copy("./templates/code-formatting/prism.js", "./build/prism.js")
}

func copyFont() {
	Copy("./templates/fonts/RobotoMono-VariableFont_wght.ttf", "./build/RobotoMono-VariableFont_wght.ttf")
}

func main() {
	fmt.Println("Creating home page")
	createHomePage()

	fmt.Println("Creating article pages")
	createArticlePages()

	fmt.Println("Copying images")
	copyFavicon()
	copyImages()

	fmt.Println("Copying code formatter")
	copyCodeFormatting()

	fmt.Println("Copying font")
	copyFont()

	fmt.Println("Copying stylesheet")
	copyStyles()

	fmt.Println("Creating RSS feed file")
	createRssFeedFile()
}
