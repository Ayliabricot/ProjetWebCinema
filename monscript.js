async function loadData(choix,choixInverse){
    let boutonActif;
    let boutonInactif;
    let tendanceValeurUrl;

    switch (choix){
        case "aujourdhui":
            boutonActif=document.querySelector("#aujourdhui");
            boutonInactif=document.querySelector("#semaine");
            tendanceValeurUrl="trending/movie/day";
            break;
        case "semaine":
            boutonActif=document.querySelector("#semaine");
            boutonInactif=document.querySelector("#aujourdhui");
            tendanceValeurUrl="trending/movie/week";
            break;
        case "meilleures":
            boutonActif=document.querySelector("#meilleures");
            boutonInactif=document.querySelector("#populaires");
            tendanceValeurUrl="tv/top_rated";
            break;
        case "populaires":
            boutonActif=document.querySelector("#populaires");
            boutonInactif=document.querySelector("#meilleures");
            tendanceValeurUrl="tv/popular";
            break;
    }

    boutonActif.addEventListener ('click',()=>{
            console.log(choix);
            loadData(choix,choixInverse);
    });
    boutonInactif.addEventListener ('click',()=>{
            console.log(choixInverse);
            loadData(choixInverse,choix);
    });

    changerBoutons(boutonActif,boutonInactif);

    let ok="Ok";
    let main=document.querySelector("main");

    const API_KEY = "4ec6eac902806dbb1cbe874e60ac5cf2";
    const data = await fetch(`https://api.themoviedb.org/3/${tendanceValeurUrl}?api_key=${API_KEY}&language=fr-FR`)
        .then(response => response.json())
        .catch(error => ok="Erreur : " + error);
        
    console.log("Les données ont bien été récupérées");
   
    afficher(data.results,choix,choixInverse);
}

function changerBoutons(boutonActif, boutonInactif){
    console.log("ici");
    console.log(boutonActif.textContent);
    boutonActif.style.backgroundColor = "#032541";
    boutonActif.style.borderColor = "white";
    boutonActif.style.color = "white";

    boutonInactif.style.backgroundColor = "white";
    boutonInactif.style.borderColor = "#032541";
    boutonInactif.style.color = "#032541";
}

function afficher(films,choix,choixInverse) {
    let choixListe;
    let titre;
    let date;
    
    if (choix=="aujourdhui" || choixInverse=="aujourdhui"){
        choixListe="#listeFilms";
    }
    else if (choix=="meilleures" || choixInverse=="meilleures"){
        choixListe="#listeSeries";
    }
    const section = document.querySelector(choixListe);
    section.innerHTML='';
    const IMG_BASE_URL = "https://image.tmdb.org/t/p/w500";
    
    const conteneur = document.createElement("div");
    conteneur.id = choixListe.slice(1);
 
    films.slice(0,4).forEach(film => {
        if (choix=="aujourdhui" || choixInverse=="aujourdhui"){
            titre=film.title;
            date=film.release_date;
        }
        else if (choix=="meilleures" || choixInverse=="meilleures"){
            titre=film.name;
            date=film.first_air_date;
        }
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
                <h3>${titre}</h3>
                <p>${new Date(date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
            </div>
        `;
 
        conteneur.appendChild(carte);
    });
 
    section.appendChild(conteneur);
}
 

loadData("semaine","aujourdhui");
loadData("populaires","meilleures")