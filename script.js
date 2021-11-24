const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7202befe784827d02007f535fd882621&page=1';
const img_path = 'https://image.tmdb.org/t/p/w1280';
const search_url = 'https://api.themoviedb.org/3/search/movie?api_key=7202befe784827d02007f535fd882621&query="';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

getmovies(API_URL);

async function getmovies(url){
    const res = await fetch(url); //return a promise
    const data = await res.json();

    showMovies(data.results);
    console.log(data.results);
}
function showMovies(movies){
    main.innerHTML = ''
    movies.forEach((movie) => {
        const {title, poster_path, vote_average, overview} = movie;
        const movieElem = document.createElement('div');
        movieElem.classList.add('movie');
        movieElem.innerHTML = 
        `
            <img src="${img_path + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getVote(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        `
        main.appendChild(movieElem);
    })
}
function getVote(vote) {
    if(vote >= 8){
        return 'good';
    } else if(vote >= 5){
        return 'average';
    } else {
        return 'poor';
    }
}
form.addEventListener('submit', (e) =>{
    e.preventDefault();

    const search_term = search.value;
    if(search_term && search_term !== ''){
        getmovies(search_url + search_term);
        search.value = '';
    } else {
        window.location.reload();
    }
})