const baseURL = "https://api.data.gov.sg/v1";
const weather2h = baseURL + "/environment/2-hour-weather-forecast?";
const weather24h = baseURL + "/environment/24-hour-weather-forecast?";
const weather4day= baseURL + "/environment/4-day-weather-forecast?";

let weather2hResponse;
let weather4hResponse;
let weather24hResponse;

async function dataSet() {
    try {
      const response = await axios.all([
        axios.get(weather2h,
        {   
            params: { 
                date:"2021-10-21"
            }
        }),
        axios.get(weather24h,
        {   
            params: { 
                date:"2021-10-21"
            }
        }),
        axios.get(weather4day,
        {   
            params: { 
                date:"2021-10-21"
            }
        })

      ])

    //   console.log(response);

      weather2hResponse = response[0]["data"];
      weather4hResponse = response[1]["data"];
      weather24hResponse = response[2]["data"];
        
      display2hForecastData();
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




