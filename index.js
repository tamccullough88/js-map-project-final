// Create map



console.log("Thank you for a good js class! It was fun working with you both.")





// icon
var userIcon = L.icon({
    iconUrl: 'asstes/accurate-icon.svg',
    iconSize: [38, 38],
    iconAnchor: [20.37, 0],
    popupAnchor: [0, 0]
});


// add map to screen
const myMap = {
    coordinates: [],
    businessType: [],
    map: {},
    markers: {},

    createMap() {
        this.map = L.map('map', {
            center: this.coordinates,
            zoom: 11,
        });
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 18,
            attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        }).addTo(this.map);

        const marker = L.marker(this.coordinates, { icon: userIcon })
        marker
            .addTo(this.map)
            .bindPopup('<p1><b>You are here</b><br></p1>')
            .openPopup()
    },
    addMarkers() {
        for (var i = 0; i < this.businessType.length; i++) {
            this.markers = L.marker([
                this.businessType[i].lat,
                this.businessType[i].long,
            ])
                .bindPopup(`<p1>${this.businessType[i].name}</p1>`)
                .addTo(this.map)
        }
    },



}

//get users coords
async function getCoords() {
    const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    return [pos.coords.latitude, pos.coords.longitude];
}


//Tried to add parameters with append() to the api url, but returned with more errors.
//foursquare input
// function searchSelector(url){
// let oldUrl = new URL('https://api.foursquare.com/v3/places/search?ll=35.6581376%2C-78.7349504&limit=5');

// let params = new URLSearchParams(["query", businessSelector]);

// params.append("query", businessSelector)

// console.log(oldUrl)
// }


async function getFoursquare(_business) {
    const options = {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: 'fsq3tHUcTAKGDvMUNmm8xJEYP/CHlejHeRENrnX6rxR1DRo='
        }
    }
    // let fs_api_url = searchSelector()
    let limit = [5]
    let lat = myMap.coordinates[0]
    let lon = myMap.coordinates[1]
    let response = await fetch(`https://api.foursquare.com/v3/places/search?query=${_business}&ll=${lat}%2C${lon}&limit=${limit}`, options)
    let data = await response.text()
    let parsedData = JSON.parse(data)
    let businesses = parsedData.results
    return businesses
}



function placeBusiness(data) {
    let businesses = data.map((element) => {
        let location = {
            name: element.name,
            lat: element.geocodes.main.latitude,
            long: element.geocodes.main.longitude
        };
        return location
    })
    return businesses

}




async function main() {
    const coords = await getCoords()
    myMap.coordinates = coords
    myMap.createMap()

}

main()

//console log is returning blank, can't run code without this function, can't remove parameters from this function and still work.
console.log(myMap.coordinates)

let selector = document.getElementById('businessSelector')

document.getElementById('submit').addEventListener('click', async (event) => {
    event.preventDefault()
    let business = document.getElementById('businessSelector').value
    let data = await getFoursquare(business)
    myMap.businessType = placeBusiness(data)
    myMap.addMarkers()

})

