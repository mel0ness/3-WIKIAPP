// API ENDPOINT : `https://fr.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`
// https://fr.wikipedia.org/wiki/?curid={id}

const Form = document.getElementById("form");
const Search = document.getElementById("search");
const ResultSpace = document.getElementById("resultsSpace")
const Loader = document.querySelector(".loader")

Form.addEventListener('submit', (e) => {
e.preventDefault();
ResultSpace.innerHTML = "";

Loader.style.display = "flex";
checkInputValue(Search.value);


})

async function GetResults(value) {
    try {
const response = await fetch(`https://fr.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${value}`);
const Results = await response.json();
CheckResults(Results);
    }
    catch (error) {
const Results = error;
displayError(Results);
    }
    }

const PutToArray = (results) => {

    results.forEach((e) => {
        const Result = document.createElement("div")
        Result.innerHTML = `<div class='result'>
        <a href='https://fr.wikipedia.org/wiki/?curid=${e.pageid}" class='siteName'>${e.title}</a>
        <div class='adress'>https://fr.wikipedia.org/wiki/?curid=${e.pageid}</div>
        <div class="description">${e.snippet}</div></div>`;

    ResultSpace.appendChild(Result)
    Loader.style.display = "none";
    });
}

const checkInputValue = (e) => {
    if(!e) {
        Loader.style.display = "none";
        const noResult = document.createElement("div");
        noResult.innerHTML = "<div class=error>Oups! Vous n'avez pas lancé de recherche!</div>";
        ResultSpace.appendChild(noResult);
    }
    else {
        GetResults(Search.value);
    }
}

const displayError = (e) => {
    Loader.style.display = "none";
    const error = document.createElement("div");
    error.innerHTML = `<div class=error>Oups! Une erreur s'est produite, veuillez réessayer : ${e} </div>`;
        ResultSpace.appendChild(error);
}

const CheckResults = (e) => {
    if(e.query.search.length === 0) {
        Loader.style.display = "none";
        const error = document.createElement("div");
        error.innerHTML = `<div class=error>Oups! Il n'y a pas de resultats pour cette recherche. Peut-être devriez vous essayer : ${e.query.searchinfo.suggestion}`;
            ResultSpace.appendChild(error);
    }
    else {
        PutToArray(e.query.search)
    }
}