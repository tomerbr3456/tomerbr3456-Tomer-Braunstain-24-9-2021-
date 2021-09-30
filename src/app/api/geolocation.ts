export function getCurrentPosition(): Promise<{ lat: number; lng: number }> {
    return new Promise(function (resolve, reject) {
      function successCallback(position: GeolocationPosition) {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      }
      function errorCallback(error: GeolocationPositionError) {
        console.error("Geo position error", error);
        reject(error);
      }
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    });
  }