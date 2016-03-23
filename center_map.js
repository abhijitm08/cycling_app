function initMap() {
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

      function geocodeAddress(geocoder, geocoder2, resultsMap) {
        var bounds = new google.maps.LatLngBounds();
        var address = document.getElementById('address').value;
        geocoder.geocode({'address': address}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            // resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
            bounds.extend(marker.position);
          }
          else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
          var latlong = document.getElementById('latlong');
          var loc1 = results[0].geometry.location;
          latlong.value = loc1;
          // return loc1;
        });

        var address2 = document.getElementById('address2').value;
        geocoder2.geocode({'address': address2}, function(results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            var marker = new google.maps.Marker({
              map: resultsMap,
              position: results[0].geometry.location
            });
            bounds.extend(marker.position);
          }
          else {
            alert('Geocode was not successful for the following reason: ' + status);
          }
            var latlong2 = document.getElementById('latlong2');
            var loc2 = results[0].geometry.location;
            latlong2.value = loc2;
            // return loc2;
        });
        // bounds.extend(loc1);
        // bounds.extend(loc2);
        var listener = google.maps.event.addListener(resultsMap, 'idle', function(bounds){
          resultsMap.fitBounds(bounds);
          google.maps.event.removeListener(listener);
        });
      }