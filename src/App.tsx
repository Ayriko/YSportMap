import { useState, useEffect } from 'react'
import './App.css'

function App() {
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch('https://backend-production-7d38.up.railway.app/api/v1/equipments')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error:', error))
    }, [])

    return (
        <>
            <h1 className="text-5xl text-cyan-400">
                Testing server initialisation and api fetching
            </h1>
            // Tailwind CSS / daisyUi button //
            <br></br>
            <button className="btn btn-primary">Button</button>
            <div>
                <h2>Fetched Data:</h2>
                {data ? (
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </>
    )
}

export default App