// @ts-nocheck
import React, { useEffect, useState } from 'react';
import "leaflet/dist/leaflet.css";
import {MapContainer, TileLayer, Marker, useMap, Popup} from 'react-leaflet';
import L from 'leaflet';
import { Equipment } from "../types/equipment.ts";
import { useRecoilState } from "recoil";
import { positionState } from "../atoms/positionState.tsx";
import { useNavigate } from 'react-router-dom';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// The mapContainer from leaflet is a component that will display the map but is stuck to the initial position per default
// We need to use the following call to change the view of the map dynamically
function ChangeMapView({ position }: { position: L.LatLng }) {
    const map = useMap();
    useEffect(() => {
        map.setView(position);
    }, [position, map]);
    return null;
}

interface MapComponentProps {
    equipment: Equipment;
}

// Set the default icon for the markers otherwise the default icon is not displayed on vercel deployment
const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

function MapComponent({ equipment }: MapComponentProps): React.JSX.Element {
    const [positionAtom] = useRecoilState(positionState);
    const [location, setLocation] = useState<L.LatLng>(L.latLng(positionAtom[0], positionAtom[1]));
    const [markers, setMarkers] = useState<L.Marker[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        setLocation(L.latLng(positionAtom[0], positionAtom[1]));

        const newMarkers = equipment.results?.map((equip) => {
            if (equip.equip_x && equip.equip_y) {
                return (
                    <Marker
                        key={equip.equip_numero}
                        position={[equip.equip_y, equip.equip_x]}
                    >
                        <Popup>
                            <div>
                                <h2>{equip.inst_nom || "Nom d'équipement inconnu"}</h2>
                                <p>{equip.inst_adresse || "Adresse inconnue"}</p>
                                <button
                                    onClick={() => handleNavigate(equip.equip_numero)}
                                    className="btn btn-primary btn-xs"
                                >
                                    Voir plus de détails
                                </button>
                            </div>
                        </Popup>
                    </Marker>
                );
            }
            return null;
        }).filter((marker) => marker !== null);

        setMarkers(newMarkers as unknown as L.Marker[]);
    }, [equipment, positionAtom]);

    const handleNavigate = (equip_numero: string) => {
        navigate('/detail', { state: equip_numero });
    };

    return (
        <MapContainer center={location} zoom={13} scrollWheelZoom={true} zoomControl={true} className="w-full h-full">
            <ChangeMapView position={location} />
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {markers}
        </MapContainer>
    );
}

export default MapComponent;
