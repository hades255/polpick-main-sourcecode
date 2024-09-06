$(function () {
    'use strict';
  

    // User location
    // --------------------------------------------------------------------
    function onLocationFound(e) {
      var radius = e.accuracy;
      // console.log(e);
      let currentDevice = $('#current_device_name').val();
      let allDevices = $('#allDevices').val();
  
      
  
      if (allDevices && allDevices.length) {
        allDevices = JSON.parse(allDevices);
        for (let device of allDevices) {
          if (device.lat && device.long) {
            let j = {lat: device.lat, lng: device.long};
            L.marker(j)
            .addTo(userLocation)
            // .bindPopup('You are somewhere around Lat: ' + lat + ' Long: ' + long)
            .bindPopup(device.device)
            .openPopup();
            L.circle(j, '20').addTo(userLocation);
            // L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            //   attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
            //   maxZoom: 18
            // }).addTo(userLocation);
          }
        }
      }
  
      L.marker(e.latlng)
        .addTo(userLocation)
        // .bindPopup('You are somewhere around Lat: ' + e.latitude + ' Long: ' + e.longitude + ' with ' + radius + ' meters radius from this point')
        .bindPopup('<b>Current Device</b><br>' + currentDevice)
        .openPopup();
      L.circle(e.latlng, radius).addTo(userLocation);
    }
    if ($('#user-location').length) {
      var userLocation = L.map('user-location').setView([42.35, -71.08], 10);
      userLocation.locate({
        setView: true,
        maxZoom: 16
      });
  
      userLocation.on('locationfound', onLocationFound);
      L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 18
      }).addTo(userLocation);
    }
});