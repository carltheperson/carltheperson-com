package main

import (
	"fmt"
	"sort"
	"text/template"
)

func createHomePage() {
	t, err := template.ParseFiles("./templates/home.html", "./templates/base.html")
	if err != nil {
		panic(err)
	}

	articles := getArticles()

	sort.Slice(articles, func(i, j int) bool {
		unixI := getUnixTimeFromDateString(articles[i].Date)
		unixJ := getUnixTimeFromDateString(articles[j].Date)

		return unixI > unixJ
	})

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

func copyImages() {
	CopyDirectory("./content/images", "./build/images")
}

func copyFavicon() {
	Copy("./templates/favicon.ico", "./build/favicon.ico")
}

func copyCodeFormatting() {
	Copy("./templates/code-formatting/prism.css", "./build/prism.css")
	Copy("./templates/code-formatting/prism.js", "./build/prism.js")
}

func copyFont() {
	Copy("./templates/fonts/SourceSerifPro-Regular.ttf", "./build/SourceSerifPro-Regular.ttf")
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
}
