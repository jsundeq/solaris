let planets = [];
const url = "https://majazocom.github.io/Data/solaris.json";

async function getSolarSystem() {
        let resp = await fetch(url); 
        let data = await resp.json();
        console.log(data);
        planets = data;
    };

getSolarSystem();

// const searchBox = document.getElementById("planet")
//     console.log(searchBox);

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
    <header class='planet-title'>
        <h1>${planet.name}</h1>
        <h2>${planet.latinName}</h2>
    </header>
    
    <div class="planet-info-wrapper">
        <section class="planet-info">
            <p>${planet.desc}</p>
        </section>
        <section class="planet-info-grid">
            <article class="grid-info1">
                <h4>OMKRETS</h4>
                <p>${planet.circumference} km</p>
            </article>

            <article class="grid-info2">
                <h4>KM FRÅN SOLEN</h4>
                <p>${planet.distance} km</p>
            </article>

            <article class="grid-info3">
                <h4>MAX TEMPERATUR</h4>
                <p>${planet.temp.day}C</p>
            </article>

            <article class="grid-info4">
                <h4>MIN TEMPERATUR</h4>
                <p>${planet.temp.night}C</p>
            </article>
    
            <article class="grid-info5">
                <h4>MÅNAR</h4>
                <p">${moonString}</p>
            </article>
        </section>
    </div>
      `;
      lightBox.appendChild(text);
    
}