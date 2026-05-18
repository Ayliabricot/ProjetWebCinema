async function loadData(){
    let ok="Ok";
    let main=document.querySelector("main");

    const API_KEY = "4ec6eac902806dbb1cbe874e60ac5cf2";
    const data = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=fr-FR&page=1`)
        .then(response => response.json())
        .catch(error => ok="Erreur : " + error);
        
    console.log("Les données ont bien été récupérées");
}

loadData();
