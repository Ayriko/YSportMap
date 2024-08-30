import React from 'react';

function Footer(): React.JSX.Element {
    return (
        <footer className="footer bg-neutral text-neutral-content p-10">
            <div>
                <h6 className="footer-title">YSportMap</h6>
                <p>
                    Aymeric MOISKA
                </p>
                <p>
                    Projet compensatoire 2023-2024
                </p>
            </div>
            <div className="">
                <h6 className="footer-title">Réalisé avec</h6>
                <div className="grid grid-flow-col gap-4 underline">
                    <a href="https://equipements.sports.gouv.fr/explore/dataset/data-es/information/" target="_blank"
                       rel="noopener noreferrer">
                        Base de données des equipements sportifs en France par le Ministère des Sports
                    </a>
                </div>
                <div className="grid grid-flow-col gap-4">
                    <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
                        <img src="path/to/react-logo.png" alt="React" className="h-8 w-8"/>
                    </a>
                    <a href="https://leafletjs.com/" target="_blank" rel="noopener noreferrer">
                        <img src="path/to/leaflet-logo.png" alt="Leaflet" className="h-8 w-8"/>
                    </a>
                    <a href="https://tailwindcss.com/" target="_blank" rel="noopener noreferrer">
                        <img src="path/to/tailwind-logo.png" alt="Tailwind CSS" className="h-8 w-8"/>
                    </a>
                    <a href="https://daisyui.com/" target="_blank" rel="noopener noreferrer">
                        <img src="path/to/daisyui-logo.png" alt="daisyUI" className="h-8 w-8"/>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;