// @ts-nocheck
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Equipment } from '../types/equipment.ts';
import { useSetRecoilState } from "recoil";
import { positionState } from "../atoms/positionState.tsx";

interface SideResultProps {
    data: Equipment;
    onPageChange: (newPage: number) => void;
}

function SideResult({ data, onPageChange }: SideResultProps): React.JSX.Element {
    const navigate = useNavigate();
    const setPositionAtom = useSetRecoilState(positionState);
    const [page, setPage] = useState(1);
    const totalPages = Math.ceil(data.total_count / 10);

    const handleNavigate = (equip_numero: string) => {
        navigate('/detail', { state: equip_numero });
    };

    // Change the atom in order to dynamically change the position on the map when the mouse hover a card
    const handleMouseEnter = (equip_x: number | null, equip_y: number | null) => {
        if (equip_x != null && equip_y != null && !isNaN(equip_x) && !isNaN(equip_y)) {
            setPositionAtom([equip_y, equip_x]);
        }
    };

    // Function to handle the page change in the child component SideResult and have the useEffect fetch the new data in the parent component
    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
            onPageChange(newPage);
        }
    };

    // logic to generate pagination and display only 5 pages at a time
    const generatePagination = () => {
        const pagination = [];

        for (let i = 1; i <= Math.min(2, totalPages); i++) {
            pagination.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`join-item btn ${i === page ? 'btn-primary' : ''}`}
                >
                    {i}
                </button>
            );
        }

        if (page > 3) {
            pagination.push(
                <button key="start-ellipsis" className="join-item btn btn-disabled">
                    ...
                </button>
            );
        }

        const startPage = Math.max(3, page - 1);
        const endPage = Math.min(totalPages - 2, page + 1);

        for (let i = startPage; i <= endPage; i++) {
            pagination.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`join-item btn ${i === page ? 'btn-primary' : ''}`}
                >
                    {i}
                </button>
            );
        }

        if (page < totalPages - 2) {
            pagination.push(
                <button key="end-ellipsis" className="join-item btn btn-disabled">
                    ...
                </button>
            );
        }

        for (let i = Math.max(totalPages - 1, 3); i <= totalPages; i++) {
            pagination.push(
                <button
                    key={i}
                    onClick={() => handlePageChange(i)}
                    className={`join-item btn ${i === page ? 'btn-primary' : ''}`}
                >
                    {i}
                </button>
            );
        }

        return pagination;
    };

    return (
        <div className={`w-80 h-screen bg-gray-100 p-4 mt-40`}>
            <div className="h-full overflow-y-auto">
                <div className="flex flex-col gap-4">
                    <h3 className="text-lg font-semibold">Résultats</h3>
                    <div className="join">
                        {generatePagination()}
                    </div>
                    {data.results?.map((equip, index) => (
                        <div
                            key={index}
                            className="card bg-white shadow-lg border border-gray-300 p-3 rounded-lg"
                            onMouseEnter={() => handleMouseEnter(equip.equip_x, equip.equip_y)}
                        >
                            <div className="card-body">
                                <h2 className="card-title text-lg font-semibold">{equip.inst_nom || "Nom d'équipement inconnu"}</h2>
                                <p className="text-sm text-gray-600">{equip.equip_type_name || "Type inconnu"}</p>
                                <p className="text-sm text-gray-500">{equip.inst_com_nom || "Commune inconnue"}</p>
                                <p className="text-sm text-gray-500">{equip.inst_adresse || "Adresse inconnue"}</p>
                                <p className="text-sm text-gray-500">{equip.inst_cp || "Code postal inconnu"}</p>
                                {equip.equip_aps_nom && equip.equip_aps_nom.length > 0 && (
                                    <div className="mt-2">
                                        <h3 className="text-sm font-semibold">Activités :</h3>
                                        <ul className="list-disc list-inside text-sm text-gray-600">
                                            {equip.equip_aps_nom.map((activity, idx) => (
                                                <li key={idx}>{activity}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <div className="mt-4">
                                    <button
                                        onClick={() => handleNavigate(equip.equip_numero)}
                                        className="btn btn-primary text-sm py-2 px-4 rounded-md"
                                    >
                                        Voir plus de détails
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <div className="join">
                        {generatePagination()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SideResult;
