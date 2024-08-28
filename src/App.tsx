import { useState, useEffect } from 'react'
import './App.css'

function App() {
    const [data, setData] = useState(null)

    useEffect(() => {
        fetch('http://localhost:3000/')
            .then(response => response.json())
            .then(data => setData(data))
            .catch(error => console.error('Error:', error))
    }, [])

    return (
        <>
            <h1>Testing server initialisation and api fetching</h1>
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