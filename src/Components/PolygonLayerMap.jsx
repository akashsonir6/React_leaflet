
import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { statesData } from '../spatialDataForPolygon';

const getColor = (density) => {
  return density > 100 ? '#800026' :
         density > 50  ? '#BD0026' :
         density > 20  ? '#E31A1C' :
         density > 10  ? '#FC4E2A' :
         density > 5   ? '#FD8D3C' :
                         '#FEB24C';
};

const style = (feature) => ({
  color: '#000',
  weight: 1,
  opacity: 1,
  fillOpacity: 0.7,
  fillColor: getColor(feature.properties.density)
});

const PolygonLayerMap = () => {
  const [selectedFeature, setSelectedFeature] = useState(null);

  const onPolygonClick = (feature) => {
    setSelectedFeature(feature.properties);
  };

  return (
    <div style={{ position: 'relative' }}>
      <MapContainer center={[37.8, -96]} zoom={4} style={{ height: '91vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <GeoJSON data={statesData} style={style} />
        {statesData.features.map((feature, index) => {
          if (feature.geometry.type === 'Polygon') {
            return (
              <Polygon
                key={index}
                positions={feature.geometry.coordinates[0].map(coord => [coord[1], coord[0]])}
                color="white"
                eventHandlers={{
                  click: () => onPolygonClick(feature),
                }}
              >
               
              </Polygon>
            );
          }
          return null;
        })}
      </MapContainer>

      {selectedFeature && (
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          padding: '10px',
          backgroundColor: '#f9f9f9',
          borderRadius: '5px',
          boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
          zIndex: 1000
        }}>
          <h3>{selectedFeature.name}</h3>
          <p> <strong>{selectedFeature.density} </strong>People per square mile</p>
        </div>
      )}
    </div>
  );
};

export default PolygonLayerMap;
