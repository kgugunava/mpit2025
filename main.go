package main

import (
	"net/http"
	"html/template"
)

func placemarkHandle(w http.ResponseWriter, r *http.Request) {
	tmpl, _ := template.ParseFiles("frontend/main.html")
	tmpl.ExecuteTemplate(w, "placemark", nil)
}

func main() {
	http.Handle("/frontend/styles/", http.StripPrefix("/frontend/styles/", http.FileServer(http.Dir("frontend/styles"))))
	http.HandleFunc("/login", loginHandle)
	http.HandleFunc("/main.html", placemarkHandle)
	http.ListenAndServe(":8050", nil)
}