const weatherHistory = "https://data.gov.sg/api/action/datastore_search?";

let yearMthValue = "2010-06";

let yearMth;
let mapDate;
let mapRainfall;
let mapTemperature;
let mapWindspeed;

async function historyDataSet() {
    try {
      const response = await axios.get(weatherHistory,
        {   
            params: { 
                resource_id: '1e478275-0746-483d-9783-2f40a3535910', // the resource id
                fields:"date,station,daily_rainfall_total, mean_temperature, mean_wind_speed"
            }
        })
        let historicalData = response.data.result.records;
        // console.log(historicalData);
        
        filterYearMth(historicalData,yearMthValue);   
        // displayHistoricalData(); 
        
    } catch (error) {
      console.error(error);
      document.getElementById("chart-content").innerHTML = `
        <div class="alert alert-danger" role="alert">
          Error fetching data.
        </div>`;
    }
  }

function filterYearMth(data,ymVal){
    yearMth = data.filter(function(i){
        if(i.date.slice(0,7)==ymVal){
            return i
        }
        // return i.date
    })
    console.log("look here", yearMth);
  mapDataset();
  
}   

dataSet();

function displayHistoricalData(){
  document.getElementById("chart-content").innerHTML = `<h1>${yearMth.length} results found</h1>`;
  for(i=0;i<yearMth.length;i++){
    document.getElementById("content").innerHTML += `
    <div class="card m-3" style="width: 30rem;">
      <div class="card-body">
        
        <h1>Date</h1>
        <p>${yearMth[i]["date"]}</p>
        <h1>total daily rainfall</h1>
        <p>${yearMth[i]["daily_rainfall_total"]} mm</p>
        <h1>average temperature</h1>
        <p>${yearMth[i]["mean_temperature"]} &deg;c</p>
        <h1>average wind speed</h1>
        <p>${yearMth[i]["mean_wind_speed"]} km/h</p>
      </div>
    </div>
    
    `;
  }

}

function mapDataset(){
  mapDate = yearMth.map(function(x){
    if(x["date"]){
      return x["date"].slice(-2)
    }
  });


  mapRainfall = yearMth.map(function(x){
    if(x["daily_rainfall_total"]){
      return x["daily_rainfall_total"]
    }
  })

  mapTemperature = yearMth.map(function(x){
    if(x["mean_temperature"]){
      return x["mean_temperature"]
    }
  });

  mapWindspeed = yearMth.map(function(x){
    if(x["mean_wind_speed"]){
      return x["mean_wind_speed"]
    }
  })

  console.log(mapDate, mapRainfall, mapTemperature, mapWindspeed);
  createChart();
}

function createChart(){
  var options = {
    chart: {
      type: 'line',
      height: "75%"
    },
    series: [{
      name: 'Mean Temp',
      data: mapTemperature
    },
      {
        name: "Mean Rainfall",
        data: mapRainfall
      }
    ],
    xaxis: {
      categories: mapDate
    }
  }
  
  var chart = new ApexCharts(document.querySelector("#chart"), options);
  
  chart.render();
}

