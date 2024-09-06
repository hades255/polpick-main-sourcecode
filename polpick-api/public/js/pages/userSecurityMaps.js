$(function () {
    'use strict';
  

    // User location
    // --------------------------------------------------------------------
    function onLocationFound() {
      let allDevices = $('#allDevices').val();
  
      if (allDevices && allDevices.length) {
        allDevices = JSON.parse(allDevices);
        if (allDevices.length) {
            for (let device of allDevices) {
                if (device.lat && device.long) {
                  let j = {lat: device.lat, lng: device.long};
                  L.marker(j)
                  .addTo(userLocation)
                  .bindPopup(device.device)
                  .openPopup();
                  L.circle(j, '20').addTo(userLocation);
                }
            }
        }
        
      }
  
    }
    if ($('#user-location').length) {
      var userLocation = L.map('user-location').setView([42.35, -71.08], 20);
      onLocationFound()
      L.tileLayer('https://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        maxZoom: 16
      }).addTo(userLocation);
    }
});