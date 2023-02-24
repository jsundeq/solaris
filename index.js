// skapa en array
let planetsArray = [];

// skapa en variabel med namnet "url" baserat på adressen till APIet
const url = "https://majazocom.github.io/Data/solaris.json";

// skapa en variabel med namnet "searchInput" som pekar till DOMen och inputelementet med id "search-input"
const searchInput = document.getElementById("search-input");

// skapa en variabel med namnet "searchResultEl" som pekar till DOMen och <section>-elementet med id "search-result"
const searchResultEl = document.getElementById("search-result");

// skapa en variabel med namnet "planetContainerEl" som pekar till DOMen och <section>-elementet med class-namnet "planet-container".
// Detta är platsen där information om planeterna skall renderas.
const planetContainerEl = document.querySelector(".planet-container");

// skapa en variabel med namnet "prevPlanetBtn" som pekar till DOMen och <button>-elementet med class-namnet "pagination-btn--prev".
// Detta är "Tidigare-knappen" som skall paginera bakåt i listan av planeter.
const prevPlanetBtn = document.querySelector(".pagination-btn--prev");

// skapa en variabel med namnet "nextPlanetBtn" som pekar till DOMen och <button>-elementet med class-namnet "pagination-btn--next".
// Detta är "Nästa-knappen" som skall paginera framåt i listan av planeter.
const nextPlanetBtn = document.querySelector(".pagination-btn--next");

// skapa en funktion med namnet "getSolarSystem()" som hämtar APIet med all planetinformation
async function getSolarSystem() {
    try {
        let resp = await fetch(url); 
        let data = await resp.json();
        console.log(data);
        planetsArray = data;
    }
// om det inte går att hämta APIet så kommer felmeddelandet "error"
    catch (error) {
        console.log(error);
    }
    };
// kör funktionen "getSolarSystem()
getSolarSystem();

// skapa en funktion för att rendera vald planet i <section>-elementet som har class-namnet "planet-container"
function renderPlanet(id) {
    const planet = planetsArray.find(planet => planet.id===id);
    planetContainerEl.innerHTML = "";
    const text = document.createElement("section");
    planetContainerEl.className = 'planet-container';
    planetContainerEl.appendChild(text);
    let moonString = "";
    planet.moons.forEach(moon => {
        moonString += moon+", "
    });
    planetContainerEl.innerHTML += `
<div class="planet-header-wrapper">

    <figure class="planet-header-img-container">

        <h1 class="h1-planet-title">
            ${planet.name}
        </h1>

        <img src="img/${planet.name.toLowerCase()}.png" class="planet-header-img-container-img" alt="${planet.name}"/>
        <h2 class="h2-planet-undertitle">
            ${planet.latinName}
        </h2>

    </figure>

    <section class="planet-header">

        <article class="container-pagination-btn--prev">
        <button class="pagination-btn--prev" onclick="renderPlanet(${id - 1})"><-- Tidigare</button>
        </article>

        <article class="container-pagination-btn--next">
        <button class="pagination-btn--next" onclick="renderPlanet(${id + 1})">Nästa --></button>
        </article>


    <section class="planet-info">
        <p class="p-planet-info">${planet.desc}</p>
        <br>
        <hr>
    </section>

        <hr>

    <section class="planet-info-grid">
        
        <article>
            <h4>TYP</h4>
        </article>

        <article>
            <h4>OMKRETS</h4>
        </article>

        <article>
            <h4>KM FRÅN SOLEN</h4>
        </article>

        <article>
            <h4>LÄNGD PÅ DYGN</h4>
        </article>

        <article>
            <p>${planet.type}</p>
        </article>

        <article>
            <p>${planet.circumference} km</p>
        </article>
        
        <article>
            <p>${planet.distance} km</p>
        </article>
        
        <article>
            <p>${planet.rotation} jorddygn</p>
        </article>

        <article>
            <h4>TEMPERATUR NATT</h4>
        </article>

        <article>
            <h4>TEMPERATUR DAG</h4>
        </article>

        <article>
            <h4>JORDDYGN RUNT SOLEN</h4>
        </article>

        <article>
        </article>

        <article>
            <p>${planet.temp.night} °C</p>
        </article>
        
        <article>
            <p>${planet.temp.day} °C</p>
        </article>
        
        <article>
            <p>${planet.orbitalPeriod} jorddygn</p>
        </article>

        <article>
        </article>

        </section>

    <section class="planet-moons">
        <article>
        <hr>
            <h4>MÅNAR</h4>
            <p>${moonString}</p>
        </article>

    </section>

</div>
      `;
      planetContainerEl.appendChild(text);
      if (planet.id === 0) {
        document.querySelector(".pagination-btn--prev").style.display="none";
      } else if (planet.id === planetsArray.length - 1) {
        document.querySelector(".pagination-btn--next").style.display="none"
      }
}

// skapa en funktion för att rendera sökresultatet i <section>-elementet med id "search-result"
function renderSearchResult(planetsArray) {
    searchResultEl.innerHTML = "";
    planetsArray.forEach(planet => {
        let searchHits = document.createElement("article");
        searchHits.className = 'search-result';
        searchHits.innerHTML = `<p onclick="renderPlanet(${planet.id});clearSearchResult()" class="search-result-text">${planet.name}</p>`;
        searchHits.addEventListener("click", function() {
        });
        searchResultEl.appendChild(searchHits);
        });
    };

// skapa en funktion för att rensa sökresultatet i <section>-elementet med id "search-result"
function clearSearchResult() {
    searchResultEl.innerHTML = "";
    searchInput.value = '';
    };

// skapa en eventlyssnare som lyssnar efter vad användaren skriver i sökfältet
searchInput.addEventListener('keyup', function() {
        let input = searchInput.value;
        let matches = [];
        planetsArray.forEach(planet => {
            if (planet.name.toLowerCase().includes(input.toLowerCase())) {
                matches.push(planet);
        }
    });
    if (matches.length > 0) {
        renderSearchResult(matches);
    } else {
            searchResultEl.innerHTML = `<p>Inga matchningar hittades, var god sök igen.</p>`
    }
});