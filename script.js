const apiUrl = "https://restfulapi-1.onrender.com/api/movies"; 

class MovieApp {
    constructor(apiUrl, listElementId) {
        this.apiUrl = apiUrl;
        this.moviesList = document.getElementById(listElementId);
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
            <button onclick="app.deleteMovie('${movie._id}')">Radera</button>
        `;
            this.moviesList.appendChild(movieElement);
        });
    }

}
const app = new MovieApp(apiUrl, "movies-list");
app.getAllMovies();