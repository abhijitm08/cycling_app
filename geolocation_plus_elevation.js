// Load the Visualization API and the columnchart package.
google.load('visualization', '1', {packages: ['columnchart']});
// google.setOnLoadCallback(initMap);

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
          var lat1 = document.getElementById('lat1');
          lat1.value = results[0].geometry.location.lat();
          var long1 = document.getElementById('long1');
          long1.value = results[0].geometry.location.lng();
          return lat1, long1;
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
            //print out lat and long
            var lat2 = document.getElementById('lat2');
            lat2.value = results[0].geometry.location.lat();
            var long2 = document.getElementById('long2');
            long2.value = results[0].geometry.location.lng();
            return lat2, long2;
        });
        var path = [{lat: parseFloat(lat1.value), lng: parseFloat(long1.value)}, 
                    {lat: parseFloat(lat2.value), lng: parseFloat(long2.value)}];
        console.log(path);
        // Create an ElevationService.
        var elevator = new google.maps.ElevationService;

        // Draw the path, using the Visualization API and the Elevation service.
        displayPathElevation(path, elevator, resultsMap);
      }
      function displayPathElevation(path, elevator, map) {
        // Display a polyline of the elevation path.
        new google.maps.Polyline({
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
