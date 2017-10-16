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
			newHtml += `<td class="city-name">${city.city}</td>`;
			newHtml += `<td class="city-state">${city.state}</td>`;
			newHtml += `<td class="city-directions"><button class="btn btn-primary">Get Directions</button></td>`;
			newHtml += `<td class="city-zoom"><button class="btn btn-success">Zoom to City</button></td>`;
			newHtml += `</tr>`;
		return newHtml;
	}
	
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
	// console.log(listHTML);

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