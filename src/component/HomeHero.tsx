import React from 'react';
import sport from '../assets/sport.jpg';

interface HomeHeroProps {
    homeSearchRef: React.RefObject<HTMLDivElement>;
}

const HomeHero: React.FC<HomeHeroProps> = ({ homeSearchRef }) => {
    // Scroll to the search section component
    const scrollToSearch = () => {
        homeSearchRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div
            className="hero min-h-[100vh] max-w-screen-2xl mx-auto my-10 rounded-lg"
            style={{
                backgroundImage: `url(${sport})`,
                backgroundSize: 'auto 60%',
                backgroundPosition: 'bottom',
                backgroundRepeat: 'no-repeat',
            }}>
            <div className="hero-content text-blue-500 flex flex-col items-start justify-start h-full">
                <div className="w-full mt-10">
                    <h1 className="mb-5 text-6xl font-bold">
                        Trouvez Clubs, Équipements et Terrains Près de Chez Vous !
                    </h1>
                    <p className="mb-5 font-bold">
                        Explorez une carte interactive regroupant tous les espaces sportifs autour de vous : clubs, installations privées, terrains en libre accès et lieux officiels.
                        Que vous cherchiez à pratiquer en solo ou en équipe, trouvez le spot idéal pour bouger, où que vous soyez !
                    </p>
                    <button className="btn btn-primary font-bold" onClick={scrollToSearch}>À Vous de Jouer !</button>
                </div>
            </div>
        </div>
    );
}

export default HomeHero;