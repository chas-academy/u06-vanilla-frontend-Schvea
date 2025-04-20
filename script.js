const apiUrl = "https://restfulapi-1.onrender.com/api/movies"; 

class MovieApp {
    constructor(apiUrl, listElementId) {
        this.apiUrl = apiUrl;
        this.moviesList = document.getElementById(listElementId);
        this.editMovieWId = null;
    }

    async getAllMovies() {
        try {
            const response = await fetch(this.apiUrl);
            const data = await response.json();
            if (Array.isArray(data)) {
                this.renderMovies(data);
            } else {
                console.error("Är ej array:", data);
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
        }
    }
    renderMovies(movies) {
        this.moviesList.innerHTML = '';
    
        movies.forEach(movie => {
            const movieElement = document.createElement('div');
            movieElement.classList.add('movie');
    
            movieElement.innerHTML = `
                <div class="movie-content">
                    <span class="movie-title">${movie.title}</span>
                    <button onclick="app.deleteMovie('${movie._id}')">Ta bort</button>
                    <button onclick="app.prefillForm('${movie._id}', '${movie.title}', '${movie.created}', '${movie.genre}', '${movie.director}')">Uppdatera</button>
                </div>
            `;
    
            this.moviesList.appendChild(movieElement);
        });
    }
    
    async addMovie(title, created, genre, director) {
        try {
            const newMovie = {
                title,
                created,
                genre,
                director
            };
   
            const response = await fetch(this.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newMovie)
            });
   
            if (response.ok) {
                this.getAllMovies();
            } else {
                const errorData = await response.json();
                alert("Kunde inte lägga till filmen");
            }
        } catch (error) {
            console.error("Fel vid tillägg", error);
        }
    }
    async updateMovie(id, MoviePut) {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(MoviePut)
            });
    
            if (response.ok) {
                this.getAllMovies();
            } else {
                alert("Kunde inte uppdatera filmen");
            }
        } catch (error) {
            console.error("Fel vid uppdatering", error);
        }
    }
    prefillForm(id, title, created, genre, director) {
        document.getElementById('title').value = title || '';
        document.getElementById('created').value = created || '';  
        document.getElementById('genre').value = genre || ''; 
        document.getElementById('director').value = director || '';  

        this.editMovieWId = id;

        document.getElementById('submit-btn').textContent = "Uppdatera film";
    }
    async deleteMovie(id) {
        try {
            const response = await fetch(`${this.apiUrl}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                this.getAllMovies();
            } else {
                alert("Kunde inte ta bort filmen");
            }
        } catch (error) {
            console.error("Fel vid borttagning", error);
        }
    }
}
    
const app = new MovieApp(apiUrl, "movies-list");
app.getAllMovies();

document.getElementById('movie-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const title = document.getElementById('title').value.trim();
    const created = document.getElementById('created').value;
    const genre = document.getElementById('genre').value.trim();
    const director = document.getElementById('director').value.trim();

    if (title && created && genre && director) {
        if (app.editMovieWId) {
            const movieData = { title, created, genre, director };
            app.updateMovie(app.editMovieWId, movieData);
            app.editMovieWId = null;
            document.getElementById('submit-btn').textContent = "Lägg till film";
        } else {
            app.addMovie(title, created, genre, director);
        }

        e.target.reset(); 
    } else {
        alert("Fyll i alla fält");
    }
});