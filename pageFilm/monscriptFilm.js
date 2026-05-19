const film = JSON.parse(localStorage.getItem('filmSelectionne'));
const API_KEY = "4ec6eac902806dbb1cbe874e60ac5cf2";
const IMG_BASE_URL = "https://image.tmdb.org/t/p/original";
const IMG_POSTER = "https://image.tmdb.org/t/p/w500";

const estSerie = film.name && !film.title;
const titre = estSerie ? film.name : film.title;
const date = estSerie ? film.first_air_date : film.release_date;
const type = estSerie ? "tv" : "movie";

async function loadData(){
  
    let ok="Ok";
    let main=document.querySelector("main");

    const API_KEY = "4ec6eac902806dbb1cbe874e60ac5cf2";

    const details = await fetch(`https://api.themoviedb.org/3/${type}/${film.id}?api_key=${API_KEY}&language=fr-FR`)
        .then(response => response.json())
        .catch(error => ok="Erreur : " + error);

    const data = await fetch(`https://api.themoviedb.org/3/${type}/${film.id}/credits?api_key=${API_KEY}&language=fr-FR`)
        .then(response => response.json())
        .catch(error => ok="Erreur : " + error);
            
    console.log("Les données ont bien été récupérées");
   
    afficherFilm(details);
    afficherCasting(data.cast);

}

function afficherFilm(details) {
    
    const note = Math.round(film.vote_average * 10);
    const genres = details.genres.map(g => g.name).join(', ');
    const duree = estSerie 
        ? (details.episode_run_time && details.episode_run_time.length > 0 
            ? `${details.episode_run_time[0]}min / épisode` 
            : `${details.number_of_seasons} saison${details.number_of_seasons > 1 ? 's' : ''}`)
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

function afficherCasting(data) {
    
    const section = document.querySelector("#listeActeurs");
    section.innerHTML='';

    if (!data || data.length === 0) {
        section.innerHTML = '<p style="margin-left:8%; font-family:Roboto;">Aucun casting disponible.</p>';
        return;
    }

    const IMG_ACTEUR = "https://image.tmdb.org/t/p/original";
    
    const conteneur = document.createElement("div");
    conteneur.id = "listeActeurs";
 
    data.slice(0,8).forEach(acteur => {
        const carte = document.createElement("div");
        carte.classList.add("carteActeur");
 
        carte.innerHTML = `
            <div class="photo">
                <img src="${acteur.profile_path ? IMG_ACTEUR + acteur.profile_path : '../images/photoParDefaut.png'}" alt="${acteur.name}"/>
            </div>
            <div class="infoActeur">
                <h3>${acteur.name}</h3>
                <p>${acteur.character}</p>
            </div>
        `;
 
        conteneur.appendChild(carte);
    });
 
    section.appendChild(conteneur);
}

loadData();

//La partie qui suit est utile pour le responsive, cet élément n'est pas visible sur nos ordinateurs
const burger = document.querySelector("#burgerMenu");
const nav = document.querySelector("#conteneurHeader");
 
if (burger && nav) {
    burger.addEventListener("click", (e) => {
        e.stopPropagation();
        nav.classList.toggle("ouvert");
    });
 
    document.addEventListener("click", (e) => {
        if (!nav.contains(e.target) && e.target !== burger) {
            nav.classList.remove("ouvert");
        }
    });
 
    nav.querySelectorAll("a").forEach(lien => {
        lien.addEventListener("click", () => {
            nav.classList.remove("ouvert");
        });
    });
}