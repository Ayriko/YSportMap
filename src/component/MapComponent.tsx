import React, {useEffect, useState} from 'react';
import "leaflet/dist/leaflet.css";
import {MapContainer, TileLayer} from 'react-leaflet'
import L from 'leaflet';
import ChangeView from "./ChangeView.tsx";

function MapComponent() : React.JSX.Element {
    const [location, setLocation] = useState<L.LatLng>(L.latLng([48.866669, 2.33333]));

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation(L.latLng([position.coords.latitude, position.coords.longitude]));
                },
                (error) => {
                    console.error(error);
                }
            );
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }, [location]);

    return (
        <MapContainer center={location} zoom={5} scrollWheelZoom={false} zoomControl={false}>
            <ChangeView center={location} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    );
}

export default MapComponent;