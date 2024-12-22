/* global google */
import React, { useState, useRef, useMemo } from 'react';
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsRenderer,
  Autocomplete,
} from '@react-google-maps/api';

const center = { lat: 48.8584, lng: 2.2945 };

const FindHospital = () => {
  const loaderOptions = useMemo(
    () => ({
      googleMapsApiKey: "AIzaSyDVNS9gjaUlsaW-Xcu4BI7JEuzfnr1gotM",
      libraries: ['places'],
    }),
    []
  );

  const { isLoaded } = useJsApiLoader(loaderOptions);

  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const originRef = useRef();
  const destinationRef = useRef();

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  async function calculateRoute() {
    if (!originRef.current.value || !destinationRef.current.value) return;
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    originRef.current.value = '';
    destinationRef.current.value = '';
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw' }}>
      <div style={{ flex: 1, position: 'relative' }}>
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: true,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        >
          <Marker position={center} />
          {directionsResponse && <DirectionsRenderer directions={directionsResponse} />}
        </GoogleMap>
      </div>
      <div style={{ padding: '1rem', backgroundColor: 'white', zIndex: 1 }}>
        <div style={{ marginBottom: '1rem' }}>
          <Autocomplete>
            <input type="text" placeholder="Origin" ref={originRef} style={{ width: '45%', marginRight: '5%' }} />
          </Autocomplete>
          <Autocomplete>
            <input type="text" placeholder="Destination" ref={destinationRef} style={{ width: '45%' }} />
          </Autocomplete>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <button onClick={calculateRoute} style={{ marginRight: '1rem', padding: '0.5rem 1rem' }}>
            Calculate Route
          </button>
          <button onClick={clearRoute} style={{ padding: '0.5rem 1rem' }}>
            Clear
          </button>
        </div>
        <div>
          <p>Distance: {distance}</p>
          <p>Duration: {duration}</p>
        </div>
      </div>
    </div>
  );
};

export default FindHospital;
