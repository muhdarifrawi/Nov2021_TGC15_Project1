const baseURL = "https://api.data.gov.sg/v1";
const weather2h = baseURL + "/environment/2-hour-weather-forecast?";
const weather24h = baseURL + "/environment/24-hour-weather-forecast?";
const weather4day= baseURL + "/environment/4-day-weather-forecast?";

let weather2hResponse;
let weather24hResponse;
let weather4DayResponse;

let today = new Date();
let todayDate = today.getFullYear()+'-'+('0' + (today.getMonth()+1)).slice(-2)+'-'+('0' + today.getDate()).slice(-2);

async function dataSet() {
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

    //   console.log(response);

      weather2hResponse = response[0]["data"];
      weather24hResponse = response[1]["data"];
      weather4DayResponse = response[2]["data"];
      display4dayForecast()

    //   display24hForecastData();
    } catch (error) {
      console.error(error);
      document.getElementById("content").innerHTML = `
      <div class="alert alert-danger" role="alert">
        Error fetching data.
      </div>`;
    }
  }




dataSet();

function display2hForecastData(){
    let forecasts = weather2hResponse["items"][1]["forecasts"];

    document.getElementById("content").innerHTML = `<h1>${forecasts.length} results found</h1>`;
    console.log(forecasts);
    for(i=0;i<forecasts.length;i++){
        let locationNames = forecasts[i]["area"]

        let location = weather2hResponse["area_metadata"];
        const locationResult = location.find( ({ name }) => name === locationNames );
        console.log(locationResult["name"]);
        console.log(locationResult["label_location"]["longitude"],locationResult["label_location"]["latitude"]);
    
        let locationInfo = weather2hResponse["items"][1]["forecasts"];
        const locationInfoResult = locationInfo.find( ({area}) => area === locationNames);
        console.log(locationInfoResult);
    }

  
}

function display24hForecastData(){
    let forecasts24h = weather24hResponse["items"];

    

    // document.getElementById("content").innerHTML = `<h1>${forecasts.length} results found</h1>`;
    console.log(forecasts24h.length);
    for(i=0;i<forecasts24h.length;i++){
        // console.log(forecasts["items"][i]);

        // general data
        let general = forecasts24h[0]["general"];
        

        let generalForecast = general["forecast"];
        let generalRelativeHumidityLow = general["relative_humidity"]["low"];
        let generalRelativeHumidityHigh = general["relative_humidity"]["high"];
        let generalTemperatureLow = general["temperature"]["low"];
        let generalTemperatureHigh = general["temperature"]["high"];
        let generalWindSpeedLow = general["wind"]["speed"]["low"];
        let generalWindSpeedHigh = general["wind"]["speed"]["high"];
        // ISSUE: wind direction outputs as VARIABLE
        let generalWindDirection = general["wind"]["direction"];
        console.log(generalWindDirection);
        
        console.log(
            generalForecast,
            generalRelativeHumidityHigh,
            generalRelativeHumidityLow,
            generalTemperatureHigh,
            generalTemperatureLow,
            generalWindSpeedHigh,
            generalWindSpeedLow
        );
        
        // periods data
        for(j=0;j<forecasts24h[i]["periods"].length;j++){
            let timeStart = forecasts24h[i]["periods"][j]["time"]["start"];
            timeStart = new Date(timeStart).toLocaleTimeString('en',
                { timeStyle: 'short', hour12: true, timeZone: 'UTC' });

            let timeEnd = forecasts24h[i]["periods"][j]["time"]["end"];
            timeEnd = new Date(timeEnd).toLocaleTimeString('en',
                { timeStyle: 'short', hour12: true, timeZone: 'UTC' });
            let regions= forecasts24h[i]["periods"][j]["regions"];
            for (key in regions) {
                console.log(`${key}: ${regions[key]}`);
              }
            console.log(timeStart, timeEnd);
        }


    }

  
}

function display4dayForecast(){
    // let forecast4day = weather4DayResponse;
    let forecast4day = weather4DayResponse["items"][0]["forecasts"];

    console.log(forecast4day);

    // for(i=0;i<forecast4day.length;i++){
    //     console.log(forecast4day[i])
    // }

    let overlay = document.createElement("div");
    overlay.className = "map-overlay"
    let weatherCards = document.createElement("div");
    weatherCards.className = "row d-flex justify-content-evenly";

    for(i=0;i<forecast4day.length;i++){
        weatherCards.innerHTML += `
            <div class="card" style="width: 18rem;">
                <img src="images/icons_png/fair_night.png" class="card-img-top p-3 weather-img" alt="...">
                <div class="card-body">
                <h5 class="card-title">${forecast4day[i]["date"]}</h5>
                <p class="card-text">${forecast4day[i]["forecast"]}</p>
                <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            </div>
        `;
    }
    
    document.getElementById("content").appendChild(overlay);  
    overlay.appendChild(weatherCards);
}



