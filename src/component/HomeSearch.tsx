import React, { useState } from 'react';
import { Filter } from '../types/filter.ts';
import map from '../assets/map.jpg';
import client from "../client/client.tsx";
import {useNavigate} from "react-router-dom";

function HomeSearch(): React.JSX.Element {
    const navigate = useNavigate();

    const initialFilters: Filter = {
        global_search: '',
        inst_acc_handi_bool: '',
        inst_trans_bool: '',
        equip_type_name: '',
        equip_acc_libre: '',
        equip_saison: '',
        equip_douche: '',
        equip_sanit: '',
        equip_nature: '',
        equip_gest_type: '',
        dep_nom: '',
        reg_nom: '',
    };
    const [filters, setFilters] = useState<Filter>(initialFilters);

    const [checkedAccHandi, setCheckedAccHandi] = useState(false);
    const [checkedTrans, setCheckedTrans] = useState(false);
    const [checkedAccLibre, setCheckedAccLibre] = useState(false);
    const [checkedSaison, setCheckedSaison] = useState(false);
    const [checkedSanit, setCheckedSanit] = useState(false);
    const [checkedDouche, setCheckedDouche] = useState(false);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleSearchClick = async () => {
        try {
            const result = await client.getEquipmentsFiltered(filters, 1);
            if (result) {
                navigate('/result', {state: [result, filters]});
            } else {
                console.error('No data returned from the API.');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleResetClick = () => {
        setFilters(initialFilters);
        setCheckedAccHandi(false);
        setCheckedTrans(false);
        setCheckedAccLibre(false);
        setCheckedSaison(false);
        setCheckedSanit(false);
        setCheckedDouche(false);
    };

    return (
        <div className="hero bg-base-200 min-h-[90vh] max-w-screen-2xl mx-auto my-2 rounded-lg">
            <div className="hero bg-base-200 min-h-screen">
                <div className="hero-content flex-col lg:flex-row-reverse text-blue-500">
                    <img
                        src={map}
                        className="max-w-sm rounded-lg" />
                    <div>
                        <h1 className="mb-5 text-3xl font-bold">
                            Affinez Votre Recherche et Trouvez Votre Prochain Terrain de Jeu
                        </h1>
                        <label className="input input-bordered flex items-center gap-2">
                            <div className="tooltip tooltip-left grow"
                                 data-tip="Il n'est pas obligatoire d'écrire ici, seulement sélectionner des filtres ci-dessous fonctionne également.">
                                <input
                                    type="text"
                                    className="max-w-full w-full mx-2"
                                    placeholder="Entrer le nom d'une commune, le nom de l'installation, l'activité..."
                                    name="global_search"
                                    autoComplete={"off"}
                                    value={filters.global_search}
                                    onChange={handleFilterChange}
                                />
                            </div>
                            <input
                                type="button"
                                value="Chercher"
                                className="btn btn-outline btn-primary btn-sm"
                                onClick={handleSearchClick}
                            />
                        </label>

                        <div className="collapse collapse-plus">
                            <input type="radio" name="my-accordion-3" defaultChecked/>
                            <div className="collapse-title text-xl font-medium">Localisations</div>
                            <div className="collapse-content flex flex-col justify-center items-center">
                                <label className="block mt-2">
                                    <span className="label-text">Département :</span>
                                    <input
                                        type="text"
                                        name="dep_nom"
                                        className="input input-bordered w-full max-w-xs"
                                        value={filters.dep_nom}
                                        onChange={handleFilterChange}
                                        placeholder="Nom du département"
                                    />
                                </label>

                                <label className="block mt-2">
                                    <span className="label-text">Région :</span>
                                    <input
                                        type="text"
                                        name="reg_nom"
                                        className="input input-bordered w-full max-w-xs"
                                        value={filters.reg_nom}
                                        onChange={handleFilterChange}
                                        placeholder="Nom de la région"
                                    />
                                </label>

                                <label className="block mt-2">
                                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                                    <span className="label-text">Nature de l'équipement :</span>
                                    <select
                                        name="equip_nature"
                                        className="select select-bordered w-full max-w-xs"
                                        value={filters.equip_nature}
                                        onChange={handleFilterChange}
                                    >
                                        <option value="">Sélectionner une nature</option>
                                        <option value="intérieur">Intérieur</option>
                                        <option value="découvert">Découvert</option>
                                        <option value="extérieur">Extérieur couvert</option>
                                        <option value="naturel">Site naturel</option>
                                        <option value="aménagé">Site naturel aménagé</option>
                                    </select>
                                </label>
                            </div>
                        </div>

                        <div className="collapse collapse-plus">
                            <input type="radio" name="my-accordion-3"/>
                            <div className="collapse-title text-xl font-medium">Accessibilité</div>
                            <div className="collapse-content">
                                <label className="cursor-pointer label">
                                    <span className="label-text">Accessibilité handicap :</span>
                                    <input
                                        type="checkbox"
                                        name="inst_acc_handi_bool"
                                        className="checkbox checkbox-primary"
                                        checked={checkedAccHandi}
                                        onChange={(e) => {
                                            setCheckedAccHandi(e.target.checked);
                                            setFilters(prevFilters => ({
                                                ...prevFilters,
                                                inst_acc_handi_bool: e.target.checked.toString(),
                                            }));
                                        }}
                                    />
                                </label>

                                <label className="cursor-pointer label">
                                    <span className="label-text">Accessibilité transport :</span>
                                    <input
                                        type="checkbox"
                                        name="inst_trans_bool"
                                        className="checkbox checkbox-primary"
                                        checked={checkedTrans}
                                        onChange={(e) => {
                                            setCheckedTrans(e.target.checked);
                                            setFilters(prevFilters => ({
                                                ...prevFilters,
                                                inst_trans_bool: e.target.checked.toString(),
                                            }));
                                        }}
                                    />
                                </label>

                                <label className="cursor-pointer label">
                                    <span className="label-text">Équipement en accès libre :</span>
                                    <input
                                        type="checkbox"
                                        name="equip_acc_libre"
                                        className="checkbox checkbox-primary"
                                        checked={checkedAccLibre}
                                        onChange={(e) => {
                                            setCheckedAccLibre(e.target.checked);
                                            setFilters(prevFilters => ({
                                                ...prevFilters,
                                                equip_acc_libre: e.target.checked.toString(),
                                            }));
                                        }}
                                    />
                                </label>

                                <label className="cursor-pointer label">
                                    <span className="label-text">Ouverture saisonnière :</span>
                                    <input
                                        type="checkbox"
                                        name="equip_saison"
                                        className="checkbox checkbox-primary"
                                        checked={checkedSaison}
                                        onChange={(e) => {
                                            setCheckedSaison(e.target.checked);
                                            setFilters(prevFilters => ({
                                                ...prevFilters,
                                                equip_saison: e.target.checked.toString(),
                                            }));
                                        }}
                                    />
                                </label>

                            </div>
                        </div>

                        <div className="collapse collapse-plus">
                            <input type="radio" name="my-accordion-3"/>
                            <div className="collapse-title text-xl font-medium">Équipements</div>
                            <div className="collapse-content">
                                <label className="block mt-2">
                                    {/* eslint-disable-next-line react/no-unescaped-entities */}
                                    <span className="label-text">Type d'équipement sportif :</span>
                                    <select
                                        name="equip_type_name"
                                        className="select select-bordered w-full max-w-xs"
                                        value={filters.equip_type_name}
                                        onChange={handleFilterChange}
                                    >
                                        <option value="">Sélectionner un type</option>
                                        <option value="foot">Football</option>
                                        <option value="basket">Basketball</option>
                                        <option value="rugby">Rugby</option>
                                        <option value="tennis">Tennis</option>
                                        <option value="pétanque">Pétanque</option>
                                        <option value="dojo">Dojo</option>
                                    </select>
                                </label>

                                <label className="block mt-2">
                                    <span className="label-text">Gestionnaire du lieu :</span>
                                    <select
                                        name="equip_gest_type"
                                        className="select select-bordered w-full max-w-xs"
                                        value={filters.equip_gest_type}
                                        onChange={handleFilterChange}
                                    >
                                        <option value="">Sélectionner un type</option>
                                        <option value="commune">Commune</option>
                                        <option value="asso">Association(s)</option>
                                        <option value="etat">Etat</option>
                                        <option value="privé">Privé</option>
                                    </select>
                                </label>

                                <label className="cursor-pointer label">
                                    <span className="label-text">Présence de sanitaires :</span>
                                    <input
                                        type="checkbox"
                                        name="equip_sanit"
                                        className="checkbox checkbox-primary"
                                        checked={checkedSanit}
                                        onChange={(e) => {
                                            setCheckedSanit(e.target.checked);
                                            setFilters(prevFilters => ({
                                                ...prevFilters,
                                                equip_sanit: e.target.checked.toString(),
                                            }));
                                        }}
                                    />
                                </label>

                                <label className="cursor-pointer label">
                                    <span className="label-text">Présence de douches :</span>
                                    <input
                                        type="checkbox"
                                        name="equip_douche"
                                        className="checkbox checkbox-primary"
                                        checked={checkedDouche}
                                        onChange={(e) => {
                                            setCheckedDouche(e.target.checked);
                                            setFilters(prevFilters => ({
                                                ...prevFilters,
                                                equip_douche: e.target.checked.toString(),
                                            }));
                                        }}
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <button
                            className="btn btn-outline btn-secondary"
                            onClick={handleResetClick}
                        >
                            Réinitialiser
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeSearch;
