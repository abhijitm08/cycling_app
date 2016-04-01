// Load the Visualization API and the columnchart package.
google.load('visualization', '1', {packages: ['columnchart']});

function initMap() {

  //initialise map
 	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 8,
   		center: {lat: 50.82253, lng: -0.13716}
 	});

  var poly;

	var marker1 = new google.maps.Marker;
	var marker2 = new google.maps.Marker;

	var geocoder1 = new google.maps.Geocoder();
  var geocoder2 = new google.maps.Geocoder();

  var address1, address2;

	var latlong1 = document.getElementById('latlong1');
	var latlong2 = document.getElementById('latlong2');
	//Clear lat long box on load
	latlong1.value = "";
	latlong2.value = "";
 

 	document.getElementById('submit').addEventListener('click', function() {
    //Get input from user when bttn clicked
 		address1 = document.getElementById('address1').value;
		address2 = document.getElementById('address2').value;
    //Turn input into lat long, set markers
    var bounds = new google.maps.LatLngBounds();
    //poly.setMap(null);
    success(geocoder2, map, address2, latlong2, marker2, geocoder1, address1, latlong1, marker1, bounds);
    });
}

function geocodeAddress(Geocoder, resultsMap, address, latlong, marker, callback) {

    Geocoder.geocode({'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
       	marker.setMap(resultsMap);
        marker.setPosition(results[0].geometry.location);
        callback(marker.position);
      }
      else {
            alert('Geocode was not successful for the following reason: ' + status);
      }
      //put latlong on page
     	latlong.value = results[0].geometry.location;
	  })
}

function success(geocoder2, map, address2, latlong2, marker2, geocoder1, address1, latlong1, marker1, bounds){
    var path = [];
    // poly.setMap(null);
    var elevator = new google.maps.ElevationService;
    geocodeAddress(geocoder2, map, address2, latlong2, marker2, function(position){
      console.log("callback called " + position); 
      bounds.extend(position);
      path[0] = {lat: position.lat(), lng: position.lng()};
      geocodeAddress(geocoder1, map, address1, latlong1, marker1, function(position){
        console.log("callback called " + position); 
        bounds.extend(position);
        path[1] = {lat: position.lat(), lng: position.lng()};
        // Draw the path, using the Visualization API and the Elevation service.
        displayPathElevation(path, elevator, map);
        //fit map to markers
        map.fitBounds(bounds);
      });
    });
  }

function displayPathElevation(path, elevator, map) {
  // Display a polyline of the elevation path.
  poly = new google.maps.Polyline({
    path: path,
    strokeColor: '#0000CC',
    opacity: 0.4,
    map: map
  });

  // Create a PathElevationRequest object using this array.
  // Ask for 256 samples along that path.
  // Initiate the path request.
  elevator.getElevationAlongPath({
    'path': path,
    'samples': 256
  }, plotElevation);
}

// Takes an array of ElevationResult objects, draws the path on the map
// and plots the elevation profile on a Visualization API ColumnChart.
function plotElevation(elevations, status) {
  var chartDiv = document.getElementById('elevation_chart');
  if (status !== google.maps.ElevationStatus.OK) {
    // Show the error code inside the chartDiv.
    chartDiv.innerHTML = 'Cannot show elevation: request failed because ' +
        status;
    return;
  }
  // Create a new chart in the elevation_chart DIV.
  var chart = new google.visualization.ColumnChart(chartDiv);

  // Extract the data from which to populate the chart.
  // Because the samples are equidistant, the 'Sample'
  // column here does double duty as distance along the
  // X axis.
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Sample');
  data.addColumn('number', 'Elevation');
  for (var i = 0; i < elevations.length; i++) {
    data.addRow(['', elevations[i].elevation]);
  }

  // Draw the chart using the data within its DIV.
  chart.draw(data, {
    height: 150,
    legend: 'none',
    titleY: 'Elevation (m)'
  });
}