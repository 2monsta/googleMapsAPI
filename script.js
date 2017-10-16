// console.log(cities);
// initMap Is essentailly our document.ready
function initMap(){
	// console.log("map loaded");
	var myLatLng = {
		lat: 40.0000,
		lng: -98.0000
	}
	// creates an map and put it in the dom
	var map = new google.maps.Map(document.getElementById("map"), {
		zoom: 4,
		center: myLatLng
	});

	function createMakrer(city){
		// set up an object with this cities lat/lng
		var cityLL = {
			lat: city.lat,
			lng: city.lon
		}
		// we told it to put it on the map by providing the map property and we also stored it to marker variable
		var marker = new google.maps.Marker({
			position: cityLL,
			map: map,
			title: city.city
		});
		// add a click listener, it takes 3 args
			// 1.what
			// 2.event
			// 3. code to run
		// if you clicked the marker, run the code
		google.maps.event.addListener(marker, "click", ()=>{
			infoWindow.setContent(`<h2>${city.city}</h2><h4>City Population: ${city.yearEstimate}`);
			// open takes 2 args
				//1. map to open the inforWindow on
				//2. where to put the inforWinodow on the map
			infoWindow.open(map, marker);
		});
		markers.push(marker);
	}
	// builds the first row of the table
	function addCityToList(city){
		var newHtml = `<tr>`;
			newHtml += `<td class="city-name" index=${city.yearRank - 1}>${city.city}</td>`;
			newHtml += `<td class="city-state">${city.state}</td>`;
			newHtml += `<td class="city-directions" index=${city.yearRank - 1}><button class="btn btn-primary">Get Directions</button></td>`;
			newHtml += `<td class="city-zoom" index=${city.yearRank - 1}><button class="btn btn-success">Zoom to City</button></td>`;
			newHtml += `</tr>`;
		return newHtml;
	}

	function zoomToCity(lat, lon){
		// google maps api has a construtor to make latlong object
		var LL = new google.maps.LatLng(lat, lon);
		map = new google.maps.Map(document.getElementById("map"), {
			zoom: 15,
			center: LL
		});
		infoWindow = new google.maps.InfoWindow();
		// places is a add-on for gogle maps so we can search for stuff
		console.log(google.maps);
		var places = new google.maps.places.PlacesService(map);
		// // placese has a method called "nearbySearch" that we can pass and object
		// 1. location
		// 2. radius
		// 3. types
		places.nearbySearch({
			location: LL,
			radius: 500,
			type: ["stadium"]
		}, function(result, status){
			console.log(result);
		});
	}
	// function triggerClick(ind){
	// 	// trigger = simulate the given event (click, change, etc);
	// 	// arg 1: Whwat element
	// 	var index = $(ind).attr("index");
	// 	google.maps.event.trigger(markers[ind], "click");
	// }
	
	var markers = [];
	var infoWindow = new google.maps.InfoWindow({});

	var listHTML = "";
	// loop through cities array which is in cities.js
	cities.map((city)=>{
		createMakrer(city);
		// loop through all the cities and add the html for each row to a final long string
		listHTML += addCityToList(city);
	});
	$("#cities-table tbody").html(listHTML);

	$(".city-name").click(function(){
		console.log("cities clicked on");
		var index = $(this).attr("index");
		google.maps.event.trigger(markers[index], "click");
	})
	
	$(".city-zoom").click(function(){
		var index = $(this).attr("index");
		zoomToCity(cities[index].lat, cities[index].lon);
	});

	$(".city-directions").click(function(){
		var index = $(this).attr("index");
	});

	$("#filter-form").submit(function(e){
		e.preventDefault();
		// console.log("user submittion");
		var userSearch = $("#filter-input").val().toLowerCase();
		// wipe out all the markers
		markers.map((marker)=>{
			marker.setMap(null);
		})
		listHTML = "";
		cities.map((city)=>{
			var cityName = city.city.toLowerCase();
			if(cityName.indexOf(userSearch) != -1){
				// the city we are on, contains the search text the user entered
				createMakrer(city);
				listHTML += addCityToList(city);
			}
		});
		$("#cities-table tbody").html(listHTML);

	});
}