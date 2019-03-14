function getMap() {
    let map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        credentials: 'AqWC3CDZCmuhIZGDAXG_SM_tEfrtk-OVXwDf4XCypJhu0A7RzIHgJpVgJhbIPpY5',
        center: new Microsoft.Maps.Location(47.6149, -122.1941),
    });
    const center = map.getCenter();

    //Create an infobox at the center of the map but don't show it.
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });

    //Assign the infobox to a map instance.
    infobox.setMap(map);

    //Create custom Pushpin
    let pin = new Microsoft.Maps.Pushpin(center);

    //Store some metadata with the pushpin.
    pin.metadata = {
        title: 'LinkedIn HQ',
        description: '1000 W Maude Ave, Sunnyvale, CA 94085',
    };

    //Add a click event handler to the pushpin.
    Microsoft.Maps.Events.addHandler(pin, 'click', pushpinClicked);

    //Add pushpin to the map.
    map.entities.push(pin);
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