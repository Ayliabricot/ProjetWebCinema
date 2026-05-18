async function loadData(tendancesChoix){
    /*let boutonActif;
    let boutonInactif;

    let boutonAujourdhui=document.querySelector("#aujourdhui");
    let boutonSemaine=document.querySelector("#semaine");

    boutonAujourdhui.addEventListener ('click',()=>{
            console.log(generation);
            loadData("aujourdhui");
    });
    boutonSemaine.addEventListener ('click',()=>{
            console.log(generation);
            loadData("semaine");
    });

    if (tendancesChoix=="aujourdhui"){
        boutonActif=boutonAujourdhui;
        boutonInactif=boutonSemaine;
    }
    if (tendancesChoix=="semaine"){
        boutonActif=boutonSemaine;
        boutonInactif=boutonAujourdhui;
    }
    boutonActif.style.backgroundColor = "#032541";
    boutonActif.style.borderColor = "white";
    boutonActif.style.color = "white";

    boutonInactif.style.backgroundColor = "white";
    boutonInactif.style.borderColor = "#032541";
    boutonInactif.style.color = "#032541";*/

    let ok="Ok";
    let main=document.querySelector("main");

    const API_KEY = "4ec6eac902806dbb1cbe874e60ac5cf2";
    const data = await fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=fr-FR`)
        .then(response => response.json())
        .catch(error => ok="Erreur : " + error);
        
    console.log("Les données ont bien été récupérées");
   
    afficherFilms(data.results);
}

function afficherFilms(films) {
    const section = document.querySelector("#listeFilms");
    const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
    
    const conteneur = document.createElement("div");
    conteneur.id = "listeFilms";
 
    films.slice(0,4).forEach(film => {
        const carte = document.createElement("div");
        carte.classList.add("carteFilm");
 
        const note = Math.round(film.vote_average * 10); // sur 100 pour le cercle
 
        carte.innerHTML = `
            <div class="affiche">
                <img src="${film.poster_path ? IMG_BASE_URL + film.poster_path : 'https://via.placeholder.com/200x300?text=Pas+d\'image'}" alt="${film.title}"/>
                <div class="note">
                    <span>${note}%</span>
                </div>
            </div>
            <div class="infoFilm">
                <h3>${film.title}</h3>
                <p>${new Date(film.release_date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            </div>
        `;
 
        conteneur.appendChild(carte);
    });
 
    section.appendChild(conteneur);
}
 

let tendancesChoix="Aujourd'hui";

loadData("aujourdhui");