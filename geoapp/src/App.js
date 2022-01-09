import React, {useEffect, useLayoutEffect, useState} from 'react'
import Autocomplete from 'react-google-autocomplete';
import axiosClient from './config/axios';

import './App.css';
import data from './geofence.json';

const App = () => {

  const [getMap, setMap] = useState(null);
  const [getPolygon, setPolygon] = useState(null);
  const [getMarkers, setMarkers] = useState([]);

  useLayoutEffect(() => {
    getAllTrackingPoints()
    initMap();
  }, [])
  /**
   * Initialize map and draw polygon with given coordinates data.
   */
  const initMap = () => {
    var polygonCoords = data.geometry.coordinates[0].map(coord => {
      return {lat: coord[0], lng: coord[1]};
    });
    const _map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: polygonCoords[0].lat, lng: polygonCoords[0].lng},
      zoom: 5
    });
    setMap(_map);
    const _polygon = new window.google.maps.Polygon({
      paths: polygonCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.5,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.1,
    });
    _polygon.setMap(_map);
    setPolygon(_polygon);
    new window.google.maps.Marker({
      position: {lat: polygonCoords[0].lat, lng: polygonCoords[0].lng},
      _map,
      animation: window.google.maps.Animation.BOUNCE
    });
  }

  /**
   * Set Markers with coordinates recorded
   */
  const renderMarkersOnMap = () => {
    console.log(getMarkers);
    if (getMarkers.length > 1) {
      for(const i = 0; i <= getMarkers.length; i++) {
        new window.google.maps.Marker({
          position: {lat: getMarkers[i].lat, lng: getMarkers[i].lng},
          getMap,
          animation: window.google.maps.Animation.BOUNCE
        });
      }
    }
  }
  
  const onPlaceSelected = (place) => {
    const newCoords = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    }
    debugger;
    setMarkers([...getMarkers, {lat: newCoords.lat, lng: newCoords.lng}]);
    renderMarkersOnMap()
    //debugger;
    const contains = window.google.maps.geometry.poly.containsLocation(
      new window.google.maps.LatLng(newCoords.lat, newCoords.lng),
      getPolygon
      );
      
    postTrakingPoint({...place, geofence: contains ? true : false})
    alert(
      contains 
      ? `[${newCoords.lat}, ${newCoords.lng}]: IN`
      : `[${newCoords.lat}, ${newCoords.lng}]: OUT`
    )
  };

  const getAllTrackingPoints = async () => {
    try {
      const resp = await axiosClient.get('/tracking/')
      const data = resp.data;
      if (data && data.length > 1) {
        setMarkers(
          data.map(item => {
            return {lat: item.latitude, lng: item.longitude}
          })
        );
        renderMarkersOnMap()
      }
    } catch(err) {
      console.error('Something went wrong!')
      console.error(err);
    }
  }

  const postTrakingPoint = async (data) => {
    try {

      const resp = await axiosClient.post('/tracking/', {
        address: data.formatted_address,
        latitude: data.geometry.location.lat(),
        longitud: data.geometry.location.lng(),
        geofence: data.geofence
      });
      console.log(resp);
    } catch (err) {
      console.error('Something went wrong!')
      console.error(err);
    }
  }


  return (
    <div className="App">
      {/* className={classes.autocomplete} */}
        <div className="App-header">
          {/* apiKey={process.env.REACT_APP_GMAP_API_KEY} */}
        <Autocomplete
          onPlaceSelected={onPlaceSelected}
          options={{
            types: ["geocode", "establishment"],
          }}
          libraries={["geometry", "places"]}

        />
        </div>
      <div id="map" style={{width:'100%', height:'100vh'}}></div>
    </div>
  );
}

//         componentRestrictions={{ country: "us" }}
export default App;
