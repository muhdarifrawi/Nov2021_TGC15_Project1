let navLink = document.getElementsByClassName("nav-link");

window.addEventListener('load', (event) => {
    console.log('script triggered');
    defaultActiveNav();
    createMap();
    fourDayForecast();
  });

function defaultActiveNav(){
    document.getElementsByClassName("nav-link")[0].classList.add("active");
    
    for (let i = 0; i < navLink.length; i++) {
        navLink[i].addEventListener('click', toggleActiveNav);
    }
}

function toggleActiveNav(){
    for (let i = 0; i < navLink.length; i++) {
        navLink[i].classList.remove("active");
    }
    this.classList.add("active")
}

function fourDayForecast(){
    let overlay = document.createElement("div");
    overlay.className = "map-overlay"
    let weatherCards = document.createElement("div");
    weatherCards.className = "row d-flex justify-content-evenly";

    for(i=0;i<4;i++){
        weatherCards.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src="images/icons_png/fair_night.png" class="card-img-top p-3 weather-img" alt="...">
                <div class="card-body">
                <h5 class="card-title">Card title</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        `;
    }
    
    document.getElementById("content").appendChild(overlay);  
    overlay.appendChild(weatherCards);

}