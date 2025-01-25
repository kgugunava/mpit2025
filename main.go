package main

import (
	"net/http"
	"html/template"
)

func placemarkHandle(w http.ResponseWriter, r *http.Request) {
	tmpl, _ := template.ParseFiles("templates/placemark.html")
	tmpl.ExecuteTemplate(w, "placemark", nil)
}

func main() {
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	http.HandleFunc("/login", loginHandle)
	http.HandleFunc("/placemark", placemarkHandle)
	http.ListenAndServe(":8050", nil)
}