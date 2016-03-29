function initMap() {
 	var map = new google.maps.Map(document.getElementById('map'), {
		zoom: 8,
   		center: {lat: 50.82253, lng: -0.13716}
 	});

	var marker1 = new google.maps.Marker;
	var marker2 = new google.maps.Marker;

	var bounds = new google.maps.LatLngBounds();

	var geocoder1 = new google.maps.Geocoder();
    var geocoder2 = new google.maps.Geocoder();

    var address1, address2;

	var latlong1 = document.getElementById('latlong1');
	var latlong2 = document.getElementById('latlong2');
	//Clear lat long box on load
	latlong1.value = "";
	latlong2.value = "";
 

 	document.getElementById('submit').addEventListener('click', function() {
 		address1 = document.getElementById('address1').value;
		address2 = document.getElementById('address2').value;
 		geocodeAddress(geocoder2, map, address2, latlong2, marker1, function(addrs2) { bounds.extend(addrs2);});
		geocodeAddress(geocoder1, map, address1, latlong1, marker2, function(addrs1) { bounds.extend(addrs1);});
		map.fitBounds(bounds);
	});
}

function geocodeAddress(Geocoder, resultsMap, address, latlong, marker, callback) {

    Geocoder.geocode({'address': address}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
       		marker.setMap(resultsMap);
           	marker.setPosition(results[0].geometry.location);
            //bounds.extend(marker.position);
        }
        else {
             alert('Geocode was not successful for the following reason: ' + status);
        }
     	latlong.value = results[0].geometry.location;
	  	callback(marker.position);
	});	
}