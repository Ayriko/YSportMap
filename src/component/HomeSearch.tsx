import React from 'react';
import Map from './MapComponent.tsx';

function HomeSearch(): React.JSX.Element {
    return (
        <div className="hero bg-base-200 min-h-[90vh] max-w-screen-2xl mx-auto my-2 rounded-lg">
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse text-blue-500">
                    <Map />
                    <div>
                        <h1 className="mb-5 text-3xl font-bold">
                            Affinez Votre Recherche et Trouvez Votre Prochain Terrain de Jeu
                        </h1>
                        <label className="input input-bordered flex items-center gap-2">
                            <input type="text" className="grow"
                                   placeholder="Entrer le nom d'une commune, le nom de l'installation, l'activité...  "/>
                            <input type="submit" value="Chercher" className="btn btn-outline btn-primary btn-sm"/>
                        </label>
                        <div className="collapse collapse-plus">
                            <input type="radio" name="my-accordion-3"/>
                            <div className="collapse-title text-xl font-medium">Activités</div>
                            <div className="collapse-content">
                                <p>hello</p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus">
                            <input type="radio" name="my-accordion-3" defaultChecked/>
                            <div className="collapse-title text-xl font-medium">Locations</div>
                            <div className="collapse-content">
                                <p>hello</p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus">
                            <input type="radio" name="my-accordion-3"/>
                            <div className="collapse-title text-xl font-medium">Accessibilité</div>
                            <div className="collapse-content">
                                <p>hello</p>
                            </div>
                        </div>
                        <div className="collapse collapse-plus">
                            <input type="radio" name="my-accordion-3"/>
                            <div className="collapse-title text-xl font-medium">Equipements</div>
                            <div className="collapse-content">
                                <p>hello</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default HomeSearch;