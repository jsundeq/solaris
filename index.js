let planets = [];
const url = "https://majazocom.github.io/Data/solaris.json";
const searchInput = document.querySelector("#search-input");

async function getSolarSystem() {
        let resp = await fetch(url); 
        let data = await resp.json();
        console.log(data);
        planets = data;
    };

getSolarSystem();

function renderPlanet(id) {
    const planet = planets.find(planet => planet.id===id);
    const lightBox = document.getElementById("light-box");
    lightBox.innerHTML = "";
    const text = document.createElement("lightBox");
    lightBox.appendChild(text);
    let moonString = ""
    planet.moons.forEach(moon => {
        moonString += moon+", "
    });
    lightBox.innerHTML += `
<section class="planet-header">
    <h1 class="h1-planet-title">${planet.name}</h1>
    <h2 class="h2-planet-undertitle">${planet.latinName}</h2>
</section>
<div class="planet-info-wrapper">
    <section class="planet-info">
        <p>${planet.desc}</p>
    </section>
        <hr>
    <section class="planet-info-grid">
        <article class="grid-4-in-info">
            <h4>OMKRETS</h4>
            <p class="grid-info">${planet.circumference} km</p>
        </article>
        <article class="grid-4-in-info"">
            <h4>KM FRÅN SOLEN</h4>
            <p class="grid-info">${planet.distance} km</p>
        </article>
        <article class="grid-4-in-info">
            <h4>MAX TEMPERATUR</h4>
            <p class="grid-info">${planet.temp.day}C</p>
        </article>
        <article class="grid-4-in-info">
            <h4>MIN TEMPERATUR</h4>
            <p class="grid-info">${planet.temp.night}C</p>
        </article>
    </section>
            <hr>
    <section class="planet-moons">
        <article>
            <h4>MÅNAR</h4>
            <p class="grid-info">${moonString}</p>
        </article>
    </section>
</div>
      `;
      lightBox.appendChild(text);
}

  function showTitle() {
    document.getElementById("navbar-(id)").element.style = "block";
  }

  function hideTitle() {
    document.getElementById("navbar-(id)").element.style = "none";
      }