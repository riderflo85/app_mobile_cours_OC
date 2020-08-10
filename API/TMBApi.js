const API_TOKEN = '4df82c018948eaed4726544d76940c9e';


export function getMovieWithText(text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key=' + API_TOKEN + '&language=fr&query=' + text + '&page=' + page;

    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));

}

export function getImageFromApi(nameImage) {
    return 'https://image.tmdb.org/t/p/w300' + nameImage;
}

export function getMovieDetailFromApi(idMovie) {
    const url = `https://api.themoviedb.org/3/movie/${idMovie}?api_key=${API_TOKEN}&language=fr`;

    return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}