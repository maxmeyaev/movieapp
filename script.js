const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7202befe784827d02007f535fd882621&page=1';
const img_path = 'https://image.tmdb.org/t/p/w1280';
const search_url = 'https://api.themoviedb.org/3/search/movie?api_key=7202befe784827d02007f535fd882621&query="';

const form = document.getElementById('form');
const search = document.getElementById('search');

getmovies(API_URL);
async function getmovies(url){
    const res = await fetch(url); //return a promise
    const data = await res.json();

    console.log(data.results);
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