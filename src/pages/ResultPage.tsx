import React from 'react';
import Header from "../component/Header.tsx";
import Footer from "../component/Footer.tsx";
import SideResult from "../component/SideResult.tsx";

function ResultPage() : React.JSX.Element {
    return (
        <div className="relative min-h-screen">
            <Header/>
            <SideResult />
            <Footer/>
        </div>
    );
}

export default ResultPage;