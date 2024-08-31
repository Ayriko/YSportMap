import './App.css';
import { RouterProvider } from 'react-router-dom';
import React from 'react';
import router from './config/Router.tsx';
import {RecoilRoot} from "recoil";

function App(): React.JSX.Element {
    return (
        <RecoilRoot>
            <RouterProvider router={router} />
        </RecoilRoot>
    );
}

export default App;