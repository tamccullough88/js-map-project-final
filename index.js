// Create map

const myMap = L.map('map', {
    center: [48.86872, 2.342130],
    zoom: 12,

});

// add map to screen
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: '15',
}).addTo(myMap);

// icon

var redPin = L.icon({
    iconUrl: 'asstes/accurate-icon.svg',
    iconSize: [38, 38],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76]
});