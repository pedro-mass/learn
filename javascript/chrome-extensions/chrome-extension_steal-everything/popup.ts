// Capturing Geolocation
navigator.geolocation.getCurrentPosition(
  position => {
    // Capture position
  },
  e => {},
  {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  }
)
