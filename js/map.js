// window.addEventListener('load', (event) => {
//     console.log('map triggered');
//     createMap();
    
//   });
var map = L.map('map', {
    center: [1.3521, 103.8198],
    zoom: 12
});

function createMap(){
    

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoibXVoZGFyaWZyYXdpIiwiYSI6ImNrd293azJ3MDA2enIyb3BtODE1cWgzZXYifQ.QOBe4u_Sh40mGIx4C8wYPw'
}).addTo(map);

}



