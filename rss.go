package main

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
	"time"
)

func createRssFeedFile() {
	articles := getArticlesSortedByDate()

	feed := fmt.Sprintf(`<?xml version="1.0" encoding="utf-8"?>
<rss version="2.0">
<channel>
<title>Carl The Person</title>
<link>https://carltheperson.com/</link>
<description>The feed for the carltheperson.com blog written by Carl Riis</description>
<lastBuildDate>%s</lastBuildDate>
<language>en-us</language>`, time.Now().Format(time.RFC1123Z))

	for _, article := range articles {
		feed += "\n<item>"
		feed += fmt.Sprintf("\n <title>%s</title>", strings.ReplaceAll(article.Title, "&", "and"))
		feed += fmt.Sprintf("\n <link>https://carltheperson.com/posts/%s</link>", article.UrlName)
		feed += fmt.Sprintf("\n <guid>https://carltheperson.com/posts/%s</guid>", article.UrlName)
		t, err := time.Parse(dateLayout, article.Date)
		if err != nil {
			panic(err)
		}
		feed += fmt.Sprintf("\n <pubDate>%s</pubDate>", t.Format(time.RFC1123Z))
		feed += "\n</item>"
	}

	feed += "\n</channel>\n</rss>"

	fullPath := filepath.Join(buildDir, "feeds.xml")
	ensureDir(fullPath)

	os.WriteFile(fullPath, []byte(feed), 0644)
}
