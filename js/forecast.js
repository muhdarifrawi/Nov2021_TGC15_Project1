const baseURL = "https://api.data.gov.sg/v1";
const weather2h = baseURL + "/environment/2-hour-weather-forecast?";
const weather24h = baseURL + "/environment/24-hour-weather-forecast?";
const weather4day= baseURL + "/environment/4-day-weather-forecast?";

let weather2hResponse;
let weather24hResponse;
let weather4DayResponse;

let today = new Date();
let todayDate = today.getFullYear()+'-'+('0' + (today.getMonth()+1)).slice(-2)+'-'+('0' + today.getDate()).slice(-2);

async function forecastDataSet() {
    try {
      const response = await axios.all([
        axios.get(weather2h,
        {   
            params: { 
                date:todayDate
            }
        }),
        axios.get(weather24h,
        {   
            params: { 
                date:todayDate
            }
        }),
        axios.get(weather4day,
        {   
            params: { 
                date:todayDate
            }
        })

      ])

      weather2hResponse = response[0]["data"];
      weather24hResponse = response[1]["data"];
      weather4DayResponse = response[2]["data"];

    if(window.location.href.indexOf("index")>-1){
        display4dayForecast();
    }
    else if (window.location.href.indexOf("2h-forecast")>-1){
        display2hForecastData();
    }
    else if(window.location.href.indexOf("24h-forecast")>-1){
        display24hForecastData();
    }
    else{
        console.log("could not find link");
        display4dayForecast();
    }

    } catch (error) {
      console.error(error);
      document.getElementById("content").innerHTML = `
      <div class="alert alert-danger m-4" role="alert">
        Error fetching data.
      </div>`;
    }
  }

function display2hForecastData(){
    document.getElementsByClassName("navbar-brand")[0].innerText = "Weather Tracking | 2-Hourly Forecast";
    let forecasts = weather2hResponse["items"][1]["forecasts"];

    for(i=0;i<forecasts.length;i++){
        let locationNames = forecasts[i]["area"]

        let location = weather2hResponse["area_metadata"];
        const locationResult = location.find( ({ name }) => name === locationNames );
    
        let locationInfo = weather2hResponse["items"][1]["forecasts"];
        const locationInfoResult = locationInfo.find( ({area}) => area === locationNames);

        var weatherIcons = L.icon({
            iconUrl: "/images/icons_png/" + imagePicker(locationInfoResult["forecast"]) + ".png",
            iconSize: [30,20],
            iconAnchor: [22, 94],
            popupAnchor: [-3, -76],
            shadowUrl: "/images/icons_shadow_png/" + imagePicker(locationInfoResult["forecast"]) + ".png",
            shadowSize: [35, 25],
            shadowAnchor: [22, 94]
        });

        var popUpInfo = `
        <div class="container">
                <h5 class="pb-0 mb-1 fw-bold">${locationInfoResult["area"]}</h5>
                <p class="my-0 fs-5">${locationInfoResult["forecast"]}</p>
                <a href="/html/historical.html" class="link-primary">Historical Data...</a>
        </div>
        `

        L.marker([locationResult["label_location"]["latitude"],locationResult["label_location"]["longitude"]],{icon:weatherIcons})
        .bindPopup(popUpInfo)
        .addTo(map);
    }

  
}

function display24hForecastData(){
    document.getElementsByClassName("navbar-brand")[0].innerText = "Weather Tracking | 24-Hourly Forecast";
    let overlayContainer = document.createElement("div");
    overlayContainer.id = "overlay-container"
    overlayContainer.className="container-fluid d-flex align-items-center justify-content-evenly flex-column";
    document.getElementById("content").appendChild(overlayContainer);
    
    let overlay = document.createElement("div");
    overlay.id = "map-overlay"
    overlay.className = "row d-flex flex-row-reverse justify-content-evenly"
    document.getElementById("overlay-container").appendChild(overlay);

    let navigator = document.createElement("div");
    navigator.id = "weather-navigator"
    navigator.className = "d-flex align-items-center justify-content-evenly flex-column";
    navigator.innerHTML = `
        <div class="card bg-weathercard bg-opacity-75" style="width: 25vw;">
            <div class="card-body">
                <h5 class="card-title" id="weather-time"></h5>
                <ul class="pagination justify-content-center">
                    <li class="page-item disabled mx-2">
                        <a class="page-link" id="prevPg" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                    </li>
                    
                    <li class="page-item mx-2">
                        <a class="page-link" id="nextPg" href="#">Next</a>
                    </li>
                </ul>
            </div>
        </div>
    `;
    document.getElementById("overlay-container").appendChild(navigator);

    get24hForecast();
    document.getElementById("prevPg").addEventListener("click", prevPage);
    document.getElementById("nextPg").addEventListener("click", nextPage);

}

function get24hForecast(){
    let forecasts24h = weather24hResponse["items"];

    // general data
    let i = 0;
    
    // periods data

    Weather24hPages = forecasts24h[i]["periods"].length;
    let j = currentPage - 1;
    
    let fullTimeStart = forecasts24h[i]["periods"][j]["time"]["start"];

    let timeStart = new Date(fullTimeStart).toLocaleTimeString('en',
        { timeStyle: 'short', hour12: true, timeZone: 'UTC' });

    let dateStart = new Date(fullTimeStart).toLocaleDateString('en',
        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    let fullTimeEnd = forecasts24h[i]["periods"][j]["time"]["end"];
    let timeEnd = new Date(fullTimeEnd).toLocaleTimeString('en',
        { timeStyle: 'short', hour12: true, timeZone: 'UTC' });

    let dateEnd = new Date(fullTimeEnd).toLocaleDateString('en',
        { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    let regions= forecasts24h[i]["periods"][j]["regions"];

    let overlay = document.getElementById("map-overlay");
    if(overlay.innerHTML!=""){
        overlay.innerHTML = "";
    }
    for (key in regions) {

        overlay.innerHTML += `
            <div class="card bg-weathercard bg-opacity-75" style="width: 12rem;">
                <img src="/images/icons_png/${imagePicker(regions[key])}.png" class="card-img-top p-3 weather-img" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${key.toUpperCase()}</h5>
                    <p class="card-text" id="weather info">${regions[key]}</p>
                </div>
            </div>
        `;

        
    }

    let weatherTime = document.getElementById("weather-time");
    weatherTime.innerHTML = `
    <span class="fs-3 py-3">From:</span><br/>
    <p>${dateStart} ${timeStart}</p>
    <span class="fs-3 py-3">To:</span><br/>
    <p>${dateEnd} ${timeEnd}</p>
    `      
    
}

function display4dayForecast(){
    document.getElementsByClassName("navbar-brand")[0].innerText = "Weather Tracking | 4-Day Forecast";
    let forecast4day = weather4DayResponse["items"][0]["forecasts"];

    let overlayContainer = document.createElement("div");
    overlayContainer.id = "overlay-container"
    overlayContainer.className="container-fluid d-flex align-items-center justify-content-evenly flex-column";
    document.getElementById("content").appendChild(overlayContainer);

    let overlay = document.createElement("div");
    overlay.id = "map-overlay"
    let weatherCards = document.createElement("div");
    weatherCards.className = "row d-flex justify-content-evenly";

    for(i=0;i<forecast4day.length;i++){
        weatherCards.innerHTML += `
            <div class="card bg-weathercard bg-opacity-75" style="width: 18rem;">
                <div id="weather-img-container" class="d-flex align-items-center">
                <img src="images/icons_png/${imagePicker(forecast4day[i]["forecast"])}.png" class="card-img-top p-3 weather-img" alt="...">
                </div>
                <div class="card-body">
                <h5 class="card-title fs-3 fw-bold">${dateTranslation(forecast4day[i]["date"])}</h5>
                <p class="card-text">${forecast4day[i]["forecast"]}</p>
                <a href="/html/historical.html" class="link-primary">See Historical Data ...</a>
                </div>
            </div>
        `;
    }
    
    document.getElementById("overlay-container").appendChild(overlay);  
    overlay.appendChild(weatherCards);
}



