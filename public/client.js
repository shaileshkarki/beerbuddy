let pin = null;
let loc = null;
let map = null;
let searchManager = null;

<<<<<<< HEAD
const btnAddLocation = document.querySelector(".add-by-location");
const btnAddAddress = document.querySelector(".add-by-address");

=======

const btnAddLocation = document.querySelector('.add-by-location')
const btnAddAddress = document.querySelector('.add-by-address')
const dialogInputBox = document.querySelector('.input-dialog-box')
const inputBox = document.querySelector('searchBox')
>>>>>>> add pub by address using auto suggest
const handlePinClick = (e) => {
    // console.log(e.target)
    let path = `/beers/${e.target.metadata.id}`;
    location = path;
    // axios.get(path).then(res => {
    //     console.log(res)
    //     document.body.innerHTML = res.data
    // })
};

function reverseGeocode(loc) {
    //If search manager is not defined, load the search module.
    if (!searchManager) {
        //Create an instance of the search manager and call the reverseGeocode function again.
        Microsoft.Maps.loadModule("Microsoft.Maps.Search", function () {
            searchManager = new Microsoft.Maps.Search.SearchManager(map);
            reverseGeocode(loc);
        });
    } else {
        var searchRequest = {
            location: loc,
            callback: function (curLoc) {
                //Tell the user the name of the result.
                console.log(curLoc.address.addressLine)

                if (curLoc.address.addressLine === undefined ||
                    curLoc.address.postalCode === undefined ||
                    curLoc.address.locality === undefined
                ) {
                    document.querySelector("h3").textContent = "Unable to use current location, please enter in address."
                    handleAddAddress();
                } else {

                    let path = `/pubs/new?address=${curLoc.address.addressLine}&lat=${loc.latitude}&long=${loc.longitude}&postCode=${curLoc.address.postalCode}&suburb=${curLoc.address.locality}`
                    location = path;
                }
            },
            errorCallback: function (e) {
                //If there is an error, alert the user about it.
                document.querySelector("h3").textContent = "Unable to use current location, please enter in address."
                handleAddAddress();
            }
        };

        //Make the reverse geocode request.
        searchManager.reverseGeocode(searchRequest);
    }
}

function getMap() {
    map = new Microsoft.Maps.Map("#map", {
        center: new Microsoft.Maps.Location(-37.8136, 144.9631),
        zoom: 9,
    });

    Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', {
        callback: function () {
            var manager = new Microsoft.Maps.AutosuggestManager({
                placeSuggestions: false
            });
            manager.attachAutosuggest('.searchBox', '.searchBoxContainer', selectedSuggestion);
        },
        errorCallback: function (msg) {
            alert(msg);
        },
        credentials: 'Ap77Q31MJhCP2ZZX2OklF0nVKFIP2AhgxeChi6y2pEvjGmJhN5xM-h1J39gwaSAX'
    });


    var center = map.getCenter();

    const path = "/pubs";

    axios.get(path).then((res) => {
        // console.log(res.data)

        let pubs = res.data;

        pubs.forEach((pub) => {
            console.log(pub);
            var location = { latitude: pub.lat, longitude: pub.long };

            //Create custom Pushpin
            pin = new Microsoft.Maps.Pushpin(location, {
                title: pub.pubname,
                icon: pub.is_pub_ratedb ? "beer.png" : "pub-icon.png",
                anchor: new Microsoft.Maps.Point(12, 36),
            });

            pin.metadata = {
                id: pub.id,
            };

            Microsoft.Maps.Events.addHandler(pin, "click", handlePinClick);

            //Add the pushpin to the map
            map.entities.push(pin);
        });
    });
}

const handleAddLocation = (e) => {
    console.log("button location");
    navigator.geolocation.getCurrentPosition(function (position) {
        loc = new Microsoft.Maps.Location(
            position.coords.latitude,
            position.coords.longitude
        );

        // console.log('location: ',loc)
        // console.log('lat: ', position.coords.latitude)
        // console.log('long: ', position.coords.longitude)

        // map.center = new Microsoft.Maps.Location(position.coords.latitude, position.coords.longitude)

        // console.log('map center :', map.center)

        reverseGeocode(loc);
    });
};

function selectedSuggestion(curLoc) {
    console.log(curLoc);
    //Tell the user the name of the result.
    console.log(curLoc.address.addressLine)
    // return r.name
    // alert(r.name);
    let path = `/pubs/new?address=${curLoc.address.addressLine}&lat=${curLoc.location.latitude}&long=${curLoc.location.longitude}&postCode=${curLoc.address.postalCode}&suburb=${curLoc.address.locality}`
    // console.log(path)
    location = path;


}
const handleAddAddress = (e) => {
<<<<<<< HEAD
    console.log("button address");
};
=======
    console.log('button address')
    dialogInputBox.autofocus = true;
    dialogInputBox.classList.toggle('visible');
    btnAddAddress.classList.toggle('visible');
    btnAddLocation.classList.toggle('visible');



}
>>>>>>> add pub by address using auto suggest

btnAddLocation.addEventListener("click", handleAddLocation);
btnAddAddress.addEventListener("click", handleAddAddress);
