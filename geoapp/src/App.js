 import React, {useEffect, useState} from 'react'
import Autocomplete from 'react-google-autocomplete';
import axiosClient from './config/axios';

import './App.css';
import data from './geofence.json';

const App = () => {

  const [getMap, setMap] = useState(null);
  const [getPolygon, setPolygon] = useState(null);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [getMarkers, setMarkers] = useState([]);

  useEffect(() => {
    getAllTrackingPoints();
  }, []);
  
  useEffect(() => {
    initMap();
  }, []);

  useEffect(() => {
    if (getMap !== null) {
      getPolygonCoordinates()
    }
  }, [getMap]);

  useEffect(() => {
    if (getMap !== null && getMarkers !== null) {
      renderMarkersOnMap()
    }
  }, [getMap, getMarkers]);


  useEffect(() => {
    if (selectedPlace !== null) {
      postTrakingPoint()
    }
  }, [selectedPlace]);

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
  }

  /**
   * Draw Markers in the map
   */
  const renderMarkersOnMap = () => {
    if (getMarkers.length > 0) {
      for(let i = 0; i < getMarkers.length; i++) {
        addMarker({
          lat: getMarkers[i].lat,
          lng: getMarkers[i].lng,
          geofence: getMarkers[i].geofence
        })
      }
    }
  }

  const addMarker = (marker) => {
    let newMarker = new window.google.maps.Marker({
      position: {lat: marker.lat, lng: marker.lng},
      label: marker.geofence ? 'IN' : 'OUT',
      map: getMap,
      animation: window.google.maps.Animation.BOUNCE,
    });
    newMarker.setMap(getMap);
  }

  const getPolygonCoordinates = async () => {
    try {
      const resp = await axiosClient.get('/polygon/')
      const data = resp.data;
      if (data && data.polygon) {
        var polygonCoords = data.polygon.geometry.coordinates[0].map(coord => {
          return {lat: coord[0], lng: coord[1]};
        });
        const polygon = new window.google.maps.Polygon({
          paths: polygonCoords,
          strokeColor: "#FF0000",
          strokeOpacity: 0.5,
          strokeWeight: 2,
          fillColor: "#FF0000",
          fillOpacity: 0.1,
        });
        polygon.setMap(getMap);
        setPolygon(polygon);
      }
    } catch(err) {
      console.error('Something went wrong!')
      console.error(err);
    }
  }

  const getAllTrackingPoints = async () => {
    try {
      const resp = await axiosClient.get('/tracking/')
      const data = resp.data;
      if (data && data.length > 1) {
        setMarkers(
          data.map(item => {
            return {
              lat: item.latitude,
              lng: item.longitude,
              geofence: item.geofence
            }
          })
        );
        renderMarkersOnMap();
      }
    } catch(err) {
      console.error('Something went wrong!')
      console.error(err);
    }
  }

  const postTrakingPoint = async () => {
    try {
      const place = selectedPlace;
      const latitude = place.geometry.location.lat();
      const longitude = place.geometry.location.lng();
      const isInPolygon = window.google.maps.geometry.poly.containsLocation(
        new window.google.maps.LatLng(latitude, longitude),
        getPolygon
      );

      await axiosClient.post('/tracking/', {
        address: place.formatted_address,
        latitude,
        longitude,
        geofence: isInPolygon
      });

      addMarker({
        lat: latitude,
        lng: longitude,
        geofence: isInPolygon
      })
  
    } catch (err) {
      console.error('Something went wrong!')
      console.error(err);
    }
  }

  const onPlaceSelected = (place) => {
    setSelectedPlace(place);
  };


  return (
    <div className="App">
      <div className="App-header">
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
