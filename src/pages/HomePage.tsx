import React, { useRef } from 'react';
import Header from "../component/Header.tsx";
import Footer from "../component/Footer.tsx";
import HomeHero from "../component/HomeHero.tsx";
import HomeSearch from "../component/HomeSearch.tsx";

const HomePage: React.FC = () => {
    const homeSearchRef = useRef<HTMLDivElement>(null);

    return (
        <div className="relative min-h-screen">
            <Header />
            <HomeHero homeSearchRef={homeSearchRef} />
            <div ref={homeSearchRef}>
                <HomeSearch />
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;