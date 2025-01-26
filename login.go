package main

import (
	"database/sql"
	"html/template"
	"net/http"

	_ "github.com/lib/pq"
)

type User struct{
	// Id int
	Login string
	Password string
	IsAdmin bool
	Name string
	Email string
	PhoneNumber string
	ListOfTowers []string
}

var currentUser User

// func saveUsersDataHandle(w http.ResponseWriter, r *http.Request) {
// 	username := r.FormValue("username")
// 	password := r.FormValue("password")
// 	currentUser = User{}
// 	currentUser.Password = password
// 	currentUser.Login = username
// 	addUserToDatabase()	
// 	http.Redirect(w, r, "/placemark", 301)
// }

func loginHandle(w http.ResponseWriter, r *http.Request) {
	tmpl, _ := template.ParseFiles("templates/login.html")
	if r.Method == http.MethodPost {
        login := r.FormValue("login")
        password := r.FormValue("password")
		currentUser = User{}
		currentUser.Password = password
		currentUser.Login = login
		addUserToDatabase()	
        http.Redirect(w, r, "/main", http.StatusSeeOther)
        return
    } else {
		tmpl.Execute(w, nil)
	}
}

func addUserToDatabase() {
	connection_string := "user=postgres password=postgres host=localhost dbname=mpit sslmode=disable"
	db, _ := sql.Open("postgres", connection_string)
	defer db.Close()
	db.Exec("INSERT INTO users (login, password) VALUES ($1, $2)", currentUser.Login, currentUser.Password)
}