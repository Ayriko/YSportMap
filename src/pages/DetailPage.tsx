import React, {useEffect, useState} from 'react';
import {Equipment} from "../types/equipment.ts";
import { useLocation } from "react-router-dom";
import client from "../client/client.tsx";
import Header from "../component/Header.tsx";
import Footer from "../component/Footer.tsx";
import EquipmentDetail from "../component/EquipmentDetail.tsx";

function DetailPage() : React.JSX.Element {
    const location = useLocation();
    const num_equip = location.state as string;
    const [data, setData] = useState<Equipment>();

    useEffect(() => {
        const fetchData = async () => {
            const result = await client.getEquipmentByNumero(num_equip);
            if (result) {
                setData(result);
            } else {
                console.error('No data returned from the API.');
            }
        };
        fetchData();
    }, []);

    return (
        <div className="min-h-screen">
            <Header />
            <EquipmentDetail data={data} />
            <Footer />
        </div>
    );
}

export default DetailPage;