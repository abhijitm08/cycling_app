function initMap() 
{
	var map = new google.maps.Map(document.getElementById('map'), {
		  zoom: 8,
		  center: {lat: 50.82253, lng: -0.13716}
		});
	var geocoder = new google.maps.Geocoder();
	var geocoder2 = new google.maps.Geocoder();
	
	document.getElementById('submit').addEventListener('click', function() {
	  	geocodeAddress(geocoder, geocoder2, map);
	});
}

function geocodeAddress(geocoder, geocoder2, resultsMap) 
{
	var address = document.getElementById('address').value;
	geocoder.geocode({'address': address}, function(results, status) {
	  	if (status === google.maps.GeocoderStatus.OK) {
	  		resultsMap.setCenter(results[0].geometry.location);
	  		var marker = new google.maps.Marker({
	  			map: resultsMap,
	  		  	position: results[0].geometry.location
	  		});
	  	}
	  	else {
	    		alert('Geocode was not successful for the following reason: ' + status);
	  	}
	var latlong = document.getElementById('latlong');
	//latlong.value = results[0].geometry.location.lat();
	latlong.value = results[0].geometry.location;
  	});

	var address2 = document.getElementById('address2').value;
  	geocoder2.geocode({'address': address2}, function(results, status) {
  	  if (status === google.maps.GeocoderStatus.OK) {
  	    var marker = new google.maps.Marker({
  	      map: resultsMap,
  	      position: results[0].geometry.location
  	    });
  	  }
  	  else {
  	    alert('Geocode was not successful for the following reason: ' + status);
  	  }
  	    var latlong2 = document.getElementById('latlong2');
  	    latlong2.value = results[0].geometry.location;

  	});
}
