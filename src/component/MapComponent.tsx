import React from 'react';
import "leaflet/dist/leaflet.css";
import {MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet'

function MapComponent() : React.JSX.Element {
    //limiter la taille max ici, juste afficher cluster et bloquer zoom / message conseil ?
    return (
        <MapContainer center={[51.505, -0.09]} zoom={7} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    );
}

export default MapComponent;