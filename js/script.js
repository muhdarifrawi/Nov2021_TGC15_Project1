let navLink = document.getElementsByClassName("nav-link");

window.addEventListener('load', (event) => {
    console.log('script triggered');
    defaultActiveNav();
    dataSet();
    createMap();
    // fourDayForecast();
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

function dateTranslation(fullDate){
    let mthArray = ["January", "February", "March", "April","May","June","July","August","September","October","November","December"]
    let date = fullDate.slice(9,10)
    let month = mthArray[parseInt(fullDate.slice(5,7))-1]
    let year = fullDate.slice(0,4)
    let translated = date + " " + month + " " + year
    return(translated);
}

function imagePicker(info){
    let dayNight = "";

    if(info.toLowerCase().search("night") !=-1 ){
        dayNight = "night"
    }
    else{
        dayNight = "day";
    }
    
    if(info.toLowerCase().search("fair") !=-1 ){
        if(dayNight == "night"){
            return "fair_day";
        }
        else{
            return "fair_night";
        }
    }
    else if(info.toLowerCase().search("warm") !=-1 ){
        return "fair_day";
    }
    else if(info.toLowerCase().search("partly cloudy") !=-1 ){
        if(dayNight == "night"){
            return "partly_cloudy_day";
        }
        else{
            return "partly_cloudy_night";
        }
    }
    else if(info.toLowerCase().search("cloudy") !=-1 ){
        return "cloudy";
    }
    else if(info.toLowerCase().search("hazy") !=-1 ){
        return "hazy";
    }
    else if(info.toLowerCase().search("windy") !=-1 ){
        return "windy";
    }
    else if(info.toLowerCase().search("mist") !=-1 ){
        return "mist";
    }
    else if(info.toLowerCase().search("light rain") !=-1 ){
        return "light_rain";
    }
    else if(info.toLowerCase().search("moderate rain") !=-1 ){
        return "moderate_rain";
    }
    else if(info.toLowerCase().search("heavy rain") !=-1 ){
        return "heavy_rain";
    }
    else if(info.toLowerCase().search("passing showers") !=-1 ){
        return "passing_rain";
    }
    else if(info.toLowerCase().search("light showers") !=-1 ){
        return "light_rain";
    }
    else if(info.toLowerCase().search("showers") !=-1 ){
        return "light_rain";
    }
    else if(info.toLowerCase().search("heavy showers") !=-1 ){
        return "heavy_rain";
    }
    else if(info.toLowerCase().search("thundery showers") !=-1 ){
        return "thundery_showers";
    }
    else if(info.toLowerCase().search("heavy thundery showers") !=-1 ){
        return "heavy_thundery_showers";
    }
    else if(info.toLowerCase().search("heavy thundery showers with gusty winds") !=-1 ){
        return "heavy_thundery_showers_with_gusty_winds";
    }
    else{
        return "cloudy";
    }
}

map.on("click", function(e){ 
    console.log(e.latlng);
});

let Weather24hPages = "";
let currentPage = 1;

function prevPage(){
    currentPage -=1;
    console.log("Prev");
    cyclePageButton();
}

function nextPage(){
    console.log("Next");
    currentPage +=1;
    console.log(currentPage);
    cyclePageButton();
}
function cyclePageButton(t){
    // if page == 1
    if(currentPage==1){
        document.getElementById("prevPg").setAttribute("tabindex",-1)
        document.getElementById("prevPg").setAttribute("aria-disabled",true)
        document.getElementById("prevPg").closest("li").setAttribute("class","page-item disabled")
    }
    
    // if page is between one and max
    else if(currentPage>1 && currentPage < Weather24hPages){
        document.getElementById("prevPg").setAttribute("tabindex",1)
        document.getElementById("prevPg").setAttribute("aria-disabled",false)
        document.getElementById("prevPg").closest("li").setAttribute("class","page-item")
        document.getElementById("nextPg").setAttribute("tabindex",1)
        document.getElementById("nextPg").setAttribute("aria-disabled",false)
        document.getElementById("nextPg").closest("li").setAttribute("class","page-item")
    }
    // if page is max
    else if(currentPage == Weather24hPages){
        document.getElementById("nextPg").setAttribute("tabindex",-1)
        document.getElementById("nextPg").setAttribute("aria-disabled",true)
        document.getElementById("nextPg").closest("li").setAttribute("class","page-item disabled")
    }
    else {
        console.log("pagination error.");
    }

    
    
}

function cycleWeatherInfo(event){
    console.log(event.innerHTML);
}