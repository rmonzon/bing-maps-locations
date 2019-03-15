const bingMapsKey = 'AqWC3CDZCmuhIZGDAXG_SM_tEfrtk-OVXwDf4XCypJhu0A7RzIHgJpVgJhbIPpY5';
const offices = [
    { name: 'LinkedIn HQ', address: '1000 W Maude Ave, Sunnyvale, CA 94085' }, { name: 'LinkedIn SF', address: '222 2nd St, San Francisco, CA 94105' }
];
let map;

function getMap() {
    createPins();
    map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        credentials: bingMapsKey,
        center: new Microsoft.Maps.Location(37.39264, -122.0423), // currently hardcoded center
    });
}

function createPins() {
    offices.map(office => {
        getGeoCode(office.address);
    });
}

function getGeoCode(query) {
    var geocodeRequest = "https://dev.virtualearth.net/REST/v1/Locations?query=" + encodeURIComponent(query) + "&jsonp=geocodeCallback&key=" + bingMapsKey;
    callRestService(geocodeRequest, geocodeCallback);
}

function geocodeCallback(response) {
    if (response &&
        response.resourceSets &&
        response.resourceSets.length > 0 &&
        response.resourceSets[0].resources) {
        var results = response.resourceSets[0].resources;
        //Create an infobox at the center of the map but don't show it.
        infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
            visible: false
        });
        //Assign the infobox to a map instance.
        infobox.setMap(map);
        const pinSettings = {
            altitude: 0,
            altitudeReference: -1,
            latitude: results[0].point.coordinates[0],
            longitude: results[0].point.coordinates[1],
            iconStyle: 65
        };
        const pin = new Microsoft.Maps.Pushpin(pinSettings);
        pin.metadata = {
            title: offices[0].name,
            description: results[0].name,
        };
        Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);
        map.entities.push(pin);
    }
}

function callRestService(request) {
    var script = document.createElement("script");
    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", request);
    document.body.appendChild(script);
}

function pushpinClicked(e) {
    //Make sure the infobox has metadata to display.
    if (e.target.metadata) {
        //Set the infobox options with the metadata of the pushpin.
        infobox.setOptions({
            location: e.target.getLocation(),
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
        });
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    getMap();
});
