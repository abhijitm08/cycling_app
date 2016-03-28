function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 2,
          center: {lat: 50.82253, lng: -0.13716}
        });

        var bounds = new google.maps.LatLngBounds();
        var geocoder1 = new google.maps.Geocoder();
        var geocoder2 = new google.maps.Geocoder();
        var address1 = document.getElementById('address1').value;
        var address2 = document.getElementById('address2').value;
        var latlong1 = document.getElementById('latlong1');
        var latlong2 = document.getElementById('latlong2');

        document.getElementById('submit').addEventListener('click', function() {
          geocodeAddress(geocoder2, map, address2, latlong2, function(addrs2) { bounds.extend(addrs2);});
          geocodeAddress(geocoder1, map, address1, latlong1, function(addrs1) { bounds.extend(addrs1);});
          //geocodeAddress(geocoder1, map, address1, latlong1, function(latlng1) { bounds.extend(); alert(addr1); console.log(addr1);});
          //geocodeAddress(geocoder2, map, address2, latlong2, function(latlng2) { alert(addr2); console.log(addr2);});
          map.fitBounds(bounds);
        });
 }

      //function geocodeAddress(Geocoder1, Geocoder2, resultsMap, callback) {
      function geocodeAddress(Geocoder, resultsMap, address, latlong, callback) {

	//var loc1lat;
	//var loc1lng;
	//var loc2lat;
	//var loc2lng;

        //var address = document.getElementById('address').value;
        Geocoder.geocode({'address': address}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {

            var marker = new google.maps.Marker();
            marker.setMap(resultsMap);
            marker.setPosition(results[0].geometry.location);

            //latlong.value = results[0].geometry.location;
            //bounds.extend(marker.getPosition());

	    //callback(marker.getPosition());
          }
          else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
          
          //var latlong1 = document.getElementById('latlong1');
          latlong.value = results[0].geometry.location;
	  callback(results[0].geometry.location);
          //loc1lat = results1[0].geometry.location.lat();
	  //loc1lng = results1[0].geometry.location.lng();
        });	

        //var address2 = document.getElementById('address2').value;
        //Geocoder2.geocode({'address': address2}, function(results2, status) {
        //  if (status === google.maps.GeocoderStatus.OK) {
        //    var marker2 = new google.maps.Marker();
        //    marker2.setMap(resultsMap);
        //    marker2.setPosition(results2[0].geometry.location);
	//    callback(results1[0].geometry.location);
        //  }
        //  else {
        //    alert('Geocode was not successful for the following reason: ' + status);
        //  }
        //    var latlong2 = document.getElementById('latlong2');
	//    latlong2.value = results2[0].geometry.location;
        //    //loc2lat = results2[0].geometry.location.lat();
        //    //loc2lng = results2[0].geometry.location.lng();
        //});

	//console.log(results2[0].geometry.location.lat());
	//console.log(results2[0].geometry.location.lng());
	//console.log(results1[0].geometry.location.lat());
	//console.log(results1[0].geometry.location.lng());

        //bounds.extend(marker1.getPosition());
	//bounds.extend(marker2.getPosition());
        //resultsMap.fitBounds(bounds);

	//resultsMap.fitBounds(new google.maps.LatLngBounds(
	//			  //bottom left: Boston
	//			  new google.maps.LatLng(42.3600825, -71.05888010000001),
	//			  //top right: Munich
	//			  new google.maps.LatLng(48.1351253, 11.581980599999952)
	//			));

	/*console.log(loc1lat);
	console.log(loc1lng);
	console.log(loc2lat);
	console.log(loc2lng);
        var test1 = new google.maps.LatLng(loc1lat, loc1lng);
        var test2 = new google.maps.LatLng(loc2lat, loc2lng);
	//test1 = marker1.getPosition();
	//test2 = marker2.getPosition();
	console.log(test1.lat());
	console.log(test1.lng());
	console.log(test2.lat());
	console.log(test2.lng());*/

	//resultsMap.fitBounds(new google.maps.LatLngBounds(
	//			  //bottom left: Boston
	//			  marker2.getPosition(),
	//			  //top right: Munich
	//			  marker1.getPosition()
	//			));

        //var listener = google.maps.event.addListener(resultsMap, 'idle', function(bounds){
        //	resultsMap.fitBounds(bounds);
        //	google.maps.event.removeListener(listener);
        //});

	//(optional) restore the zoom level after the map is done scaling
	//var listener = google.maps.event.addListener(resultsMap, "idle", function () {
	//	    map.setZoom(2);
	//	    google.maps.event.removeListener(listener);

	//});
      }
