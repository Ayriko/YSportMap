import React, { useEffect, useState } from 'react';
import client from '../client/client.tsx';
import { Equipment } from '../type/equipment.ts';

const HomePage: React.FC = () => {
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
            <h1 className="text-5xl text-cyan-400">Testing server initialisation and api fetching</h1>
            <button className="btn btn-primary">Button</button>
            <div>
                <h2>Fetched Data:</h2>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
            </div>
        </div>
    );
};

export default HomePage;