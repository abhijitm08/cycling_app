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
 	  geocodeAddress(geocoder2, map, address2, latlong2, marker1);
		geocodeAddress(geocoder1, map, address1, latlong1, marker2);
  //   //Center map (only working on second click)
		centerMap(map, marker1, marker2);
    //getLatLong(geocoder1, map, address1, latlong1, marker1, geocoder2, address2, latlong2, marker2, callback);
	});
}

function geocodeAddress(Geocoder, resultsMap, address, latlong, marker) {

    Geocoder.geocode({'address': address}, function(results, status) {
      if (status === google.maps.GeocoderStatus.OK) {
       	marker.setMap(resultsMap);
        marker.setPosition(results[0].geometry.location);
      }
       else {
            alert('Geocode was not successful for the following reason: ' + status);
      }
      //put latlong on page
     	latlong.value = results[0].geometry.location;
	});	
  //callback(marker.position);
}

function centerMap (map, marker1, marker2) {
  //create new bounds
  var bounds = new google.maps.LatLngBounds();
  console.log(marker1.position);
  console.log(marker2.position);
  //extend bounds to marker positions
  bounds.extend(marker1.position);
  bounds.extend(marker2.position);
  //fit map to new bounds
  map.fitBounds(bounds);
  //callback(marker.position);
}

//function(addrs2) { bounds.extend(addrs2);
  //callback(marker.position);

//   //use two callback functions
//   function printList(callback) {
//   // do your printList work
//   console.log('printList is done');
//   callback();
// }

// function updateDB(callback) {
//   // do your updateDB work
//   console.log('updateDB is done');
//   callback()
// }

// function getDistanceWithLatLong(callback) {
//   // do your getDistanceWithLatLong work
//   console.log('getDistanceWithLatLong is done');
//   callback();
// }

// function runSearchInOrder(callback) {
//     getDistanceWithLatLong(function() {
//         updateDB(function() {
//             printList(callback);
//         });
//     });
// }

// runSearchInOrder(function(){console.log('finished')});

// getDistanceWithLatLong is done
// updateDB is done
// printList is done
// finished 

    // geocodeAddress(geocoder2, map, address2, latlong2, marker1);
    // geocodeAddress(geocoder1, map, address1, latlong1, marker2);
    // //Center map (only working on second click)
    // centerMap(map, marker1, marker2);

    /*function getLatLong (callback) {
      geocodeAddress(function(){
        geocodeAddress(function(){
          centerMap(map, marker1, marker2, callback);
        });
      });
    }*/
    //getLatLong();