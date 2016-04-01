function initMap() {

  //initialise map
 	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 8,
   		center: {lat: 50.82253, lng: -0.13716}
 	});

	var marker1 = new google.maps.Marker;
	var marker2 = new google.maps.Marker;

	var geocoder1 = new google.maps.Geocoder();
  var geocoder2 = new google.maps.Geocoder();

  // var bounds = new google.maps.LatLngBounds();

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
    geocodeAddress(geocoder2, map, address2, latlong2, marker2, function(position){
      console.log("callback called " + position); 
      bounds.extend(position);
      geocodeAddress(geocoder1, map, address1, latlong1, marker1, function(position){
        console.log("callback called " + position); 
        bounds.extend(position);
        console.log(bounds);
        map.fitBounds(bounds);
      });
    });
  }