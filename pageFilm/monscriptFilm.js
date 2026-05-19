const film = JSON.parse(localStorage.getItem('filmSelectionne'));
const API_KEY = "4ec6eac902806dbb1cbe874e60ac5cf2";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/original";
const IMG_POSTER = "https://image.tmdb.org/t/p/w500";

const estSerie = film.name && !film.title;
const titre = estSerie ? film.name : film.title;
const date = estSerie ? film.first_air_date : film.release_date;
const type = estSerie ? "tv" : "movie";

async function afficherFilm() {
    const details = await fetch(`https://api.themoviedb.org/3/${type}/${film.id}?api_key=${API_KEY}&language=fr-FR`)
        .then(r => r.json());

    const note = Math.round(film.vote_average * 10);
    const genres = details.genres.map(g => g.name).join(', ');
    const duree = estSerie 
        ? `${details.episode_run_time[0]}min / épisode` 
        : `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m`;
    const dateFormatee = new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' });

    const section = document.querySelector("#informations");
    section.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("${IMG_BASE_URL + film.backdrop_path}")`;

    section.innerHTML = `
        <div id="contenuFilm">
            <img id="affiche" src="${IMG_POSTER + film.poster_path}" alt="${titre}"/>
            <div id="infos">
                <div id="conteneurInfosPrincipales">
                    <span id="noteFilm">${note}%</span>
                    <div id="conteneurInfosMajeures">
                        <h1>${titre} (${new Date(date).getFullYear()})</h1>
                        <p id="sousTitre">${dateFormatee} - ${genres} - ${duree}</p>
                    </div>
                </div>
                <h3>Synopsis</h3>
                <p>${film.overview}</p>
            </div>
        </div>
    `;
}

afficherFilm();