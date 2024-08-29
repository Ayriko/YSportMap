import './App.css';
import { RouterProvider } from 'react-router-dom';
import React from 'react';
import router from './config/Router.tsx';

function App(): React.JSX.Element {
    return (
        <RouterProvider router={router} />
    );
}

export default App;