import React, {useEffect, useState} from 'react';
import {Equipment} from "../type/equipment.ts";
import client from "../client/client.tsx";

function DetailPage() : React.JSX.Element {
    const [data, setData] = useState<Equipment[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const result = await client.getEquipments();
                setData(result);
            } catch (err) {
                setError('Failed to fetch data: ' + err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <div>
            <h2>Fetched Data:</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </div>
    );
}

export default DetailPage;