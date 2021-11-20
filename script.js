const weather2h = "";
const weather24h = "";
const weather4day= "";
const weatherHistory = "https://data.gov.sg/api/action/datastore_search";

async function dataSet() {
    try {
      const response = await axios.get('https://data.gov.sg/api/action/datastore_search?',
        {   
            params: { 
                resource_id: '1e478275-0746-483d-9783-2f40a3535910', // the resource id
                fields:"date,station,daily_rainfall_total, mean_temperature, mean_wind_speed"
            }
        })
        let historicalData = response.data.result.records;
        // console.log(historicalData);
        return filterYearMth(historicalData);
    } catch (error) {
      console.error(error);
    }
  }

function filterYearMth(data){
    const  yearMth = data.filter(function(i){
        if(i.date.slice(0,7)=="2010-06"){
            return i
        }
        // return i.date
    })
    console.log("look here", yearMth);
    return yearMth
}   


