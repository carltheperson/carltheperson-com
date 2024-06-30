package main

import (
	"bytes"
	"fmt"
	"os"
	"path/filepath"
	"text/template"
	"time"

	"github.com/yuin/goldmark"
	meta "github.com/yuin/goldmark-meta"
	"github.com/yuin/goldmark/parser"
)

const buildDir = "build"
const dateLayout = "2006-01-02"

func ensureDir(fileName string) {
	dirName := filepath.Dir(fileName)
	if _, serr := os.Stat(dirName); serr != nil {
		merr := os.MkdirAll(dirName, os.ModePerm)
		if merr != nil {
			panic(merr)
		}
	}
}

func createBuildFileUsingTemplate(t *template.Template, filename string, data interface{}) error {
	fullPath := filepath.Join(buildDir, filename)
	ensureDir(fullPath)

	f, err := os.OpenFile(fullPath, os.O_RDWR|os.O_CREATE|os.O_TRUNC, os.ModePerm)
	if err != nil {
		return err
	}
	defer f.Close()

	err = t.Execute(f, data)
	if err != nil {
		return err
	}

	return nil
}

func getMetadataField(source string, fieldName string) string {
	markdown := goldmark.New(
		goldmark.WithExtensions(
			meta.Meta,
		),
	)

	var buf bytes.Buffer
	context := parser.NewContext()
	if err := markdown.Convert([]byte(source), &buf, parser.WithContext(context)); err != nil {
		panic(err)
	}
	metaData := meta.Get(context)
	if metaData[fieldName] == nil {
		return ""
	}
	return fmt.Sprintf("%v", metaData[fieldName])
}

func getUnixTimeFromDateString(date string) int64 {
	t, err := time.Parse(dateLayout, date)
	if err != nil {
		panic(err)
	}

	return t.Unix()
}
