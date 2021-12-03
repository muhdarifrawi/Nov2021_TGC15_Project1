let navLink = document.getElementsByClassName("nav-link");

window.addEventListener('load', (event) => {
    console.log('script triggered');
    defaultActiveNav();
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
        return "heavy_thindery_showers_with_gusty_winds";
    }
    else{
        return "cloudy";
    }
}