
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

const MultipleDataPointMap = () => {
    const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the GeoJSON data
    fetch('/Data.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading map...</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div> <MapContainer center={[38.9072, -77.0369]} zoom={10} style={{ height: '91vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {data.features.map((feature, index) => {
        if (feature.geometry.type === 'Point') {
          const [longitude, latitude] = feature.geometry.coordinates;
          return (
            <Marker key={index} position={[latitude, longitude]} icon={customIcon}>
              <Popup>
                <strong>{feature.properties.name}</strong><br />
                Type: {feature.properties.type}
              </Popup>
            </Marker>
          );
        }
        return null;
      })}
    </MapContainer></div>
  )
}

export default MultipleDataPointMap