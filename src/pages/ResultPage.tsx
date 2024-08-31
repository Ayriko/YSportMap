import React, { useState, useEffect } from 'react';
import Header from "../component/Header.tsx";
import Footer from "../component/Footer.tsx";
import SideResult from "../component/SideResult.tsx";
import { useLocation } from "react-router-dom";
import MapComponent from "../component/MapComponent.tsx";
import client from '../client/client.tsx';
import { Equipment } from '../types/equipment.ts';
import { Filter } from '../types/filter.ts';

function ResultPage(): React.JSX.Element {
    // Get the initial data and filters used from the location state passed from the previous page
    const location = useLocation();
    const initialData = location.state[0] as Equipment;
    const filtersUsed = location.state[1] as Filter;

    const [data, setData] = useState<Equipment>(initialData);
    const [page, setPage] = useState(1);

    // Fetch data from the API when the page change in the child component SideResult
    // filtersUsed is send to the API to get the next data using the same filters
    useEffect(() => {
        const fetchData = async () => {
            const result = await client.getEquipmentsFiltered(filtersUsed, page);
            if (result) {
                setData(result);
            } else {
                console.error('No data returned from the API.');
            }
        };
        fetchData();
    }, [page]);

    // Function to handle the page change in the child component SideResult
    // The new page is set in the state and the useEffect fetch the new data
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <div className="relative min-h-screen flex flex-col">
            <Header />
            <div className="flex flex-1">
                <SideResult
                    data={data}
                    onPageChange={handlePageChange}
                />
                <div className="flex-1 relative">
                    <MapComponent
                        equipment={data}
                    />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ResultPage;
