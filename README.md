# Movie CRUD App

Ett frontend projekt gjort för att skapa, läsa, uppdatera och ta bort filmer med ett REST API. Byggt med JavaScript, HTML och CSS.

##  Live-demo

[https://lively-seahorse-6ff73a.netlify.app/]


## Funktioner

Visa alla filmer (GET)
Lägg till en ny film (POST)
Uppdatera en film (PUT)
Ta bort en film (DELETE)

## Tekniker
Vanilla JavaScript
HTML & CSS
Fetch API
REST API(https://restfulapi-1.onrender.com/api/movies)
Netlify 

## Kom igång
Klona i terminalen 
git clone https://github.com/<användarnamn>/<repository-namn>.git
Öppna i Vs.

## Innehåll modellen från REST APIet (mongoose)

title: { type: String, required: true },
created: { type: Date, required: true },
genre: { type: String, required: true },
director: { type: String, required: true },
