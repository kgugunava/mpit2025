package main

import (
	"net/http"
)


func main() {
	http.HandleFunc("/login", loginHandle)
	http.ListenAndServe(":8050", nil)
}