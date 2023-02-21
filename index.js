let planets = [];
const url = "https://majazocom.github.io/Data/solaris.json";

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
    <header class='planet-title'>
    <h1>${planet.name}</h1>
    <h2>${planet.latinName}</h2>
      </header>
      <div class="planet-info-wrapper">
      <section class="planet-info">
          <p>${planet.desc}</p>
      </section>
      
  <hr>
  
        <section class="planet-info-grid">
            <article>
                <h4>OMKRETS</h4>
                <p class="grid-info">${planet.circumference} km</p>
            </article>

            <article>
                <h4>KM FRÅN SOLEN</h4>
                <p class="grid-info">${planet.distance} km</p>
            </article>

            <article>
                <h4>MAX TEMPERATUR</h4>
                <p class="grid-info">${planet.temp.day}C</p>
            </article>

            <article>
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

</main>
      `;
      lightBox.appendChild(text);
    
}