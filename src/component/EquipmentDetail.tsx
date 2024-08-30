import React from 'react';
import { Equipment } from "../types/equipment.ts";

interface EquipmentDetailProps {
    data?: Equipment | undefined;
}

function EquipmentDetail({ data }: EquipmentDetailProps): React.JSX.Element {
    if (!data || !data.results || data.results.length === 0) {
        return <p className="text-center text-lg text-gray-600">Aucune donnée disponible pour cet équipement.</p>;
    }

    const equipment = data.results[0];

    // Helper function to check if a value is defined and not empty
    const hasValue = (value: any) => value !== undefined && value !== null && value !== '';

    // Accessibilité
    const hasHandicapAccessibility = hasValue(equipment.inst_acc_handi_bool) && equipment.inst_acc_handi_bool === "1";
    const hasTransportAccessibility = hasValue(equipment.inst_trans_bool) && equipment.inst_trans_bool === "1";
    const hasPMRAccess = ["equip_pmr_acc", "equip_pmr_aire", "equip_pmr_douche", "equip_pmr_sanit", "equip_pmr_trib", "equip_pmr_vest"].some(key => hasValue(equipment[key as keyof Equipment]) && equipment[key as keyof Equipment] === "1");
    const hasPSHSAccess = ["equip_pshs_aire", "equip_pshs_sanit", "equip_pshs_sign", "equip_pshs_trib", "equip_pshs_vest"].some(key => hasValue(equipment[key as keyof Equipment]) && equipment[key as keyof Equipment] === "1");

    // Caractéristiques physiques
    const hasPistes = hasValue(equipment.equip_piste_nb) && Number(equipment.equip_piste_nb) > 0;
    const hasTribunes = hasValue(equipment.equip_trib_nb) && Number(equipment.equip_trib_nb) > 0;
    const hasVestiaires = hasValue(equipment.equip_vest_sport) && Number(equipment.equip_vest_sport) > 0;
    const hasBassin = ["equip_bassin_long", "equip_bassin_larg", "equip_bassin_surf", "equip_bassin_min", "equip_bassin_max"].some(key => hasValue(equipment[key as keyof Equipment]));
    const hasSAE = ["equip_sae_couloir", "equip_sae_haut", "equip_sae_surf"].some(key => hasValue(equipment[key as keyof Equipment]));

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
                {/* Title */}
                <h1 className="text-4xl font-bold mb-6 text-center">{equipment.inst_nom}</h1>

                {/* Installation Information */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Informations sur l'Installation</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p><span className="font-semibold">Identifiant :</span> {equipment.equip_nom}</p>
                        <p><span className="font-semibold">Adresse :</span> {equipment.inst_adresse}</p>
                        <p><span className="font-semibold">Code Postal :</span> {equipment.inst_cp}</p>
                        <p><span className="font-semibold">Commune :</span> {equipment.inst_com_nom}</p>
                        <p><span className="font-semibold">Observations :</span> {hasValue(equipment.inst_obs) ? equipment.inst_obs : "Aucune"}</p>
                        <p><span className="font-semibold">Accessibilité Handicap :</span> {hasHandicapAccessibility ? "Oui" : "Non spécifiée"}</p>
                        {hasHandicapAccessibility && (
                            <p><span className="font-semibold">Type Accessibilité Handicap :</span> {hasValue(equipment.inst_acc_handi_type) ? equipment.inst_acc_handi_type : "Non spécifié"}</p>
                        )}
                        <p><span className="font-semibold">Accessibilité Transport :</span> {hasTransportAccessibility ? "Oui" : "Non spécifiée"}</p>
                    </div>
                </section>

                {/* Equipment Information */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Détails de l'Équipement</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <p><span className="font-semibold">Type d'Équipement :</span> {equipment.equip_type_name}</p>
                        <p><span className="font-semibold">Famille d'Équipement :</span> {equipment.equip_type_famille}</p>
                        {hasValue(equipment.equip_eclair) && (
                            <p><span className="font-semibold">Éclairage de l'Aire :</span> {equipment.equip_eclair === "1" ? "Oui" : "Non"}</p>
                        )}
                        <p><span className="font-semibold">Accès Libre :</span> {hasValue(equipment.equip_acc_libre) && equipment.equip_acc_libre === "1" ? "Oui" : "Non"}</p>
                        <p><span className="font-semibold">Aménagements Confort :</span> {hasValue(equipment.equip_conf_bool) && equipment.equip_conf_bool === "1" ? "Oui" : "Non"}</p>
                        {hasValue(equipment.equip_conf_bool) && equipment.equip_conf_bool === "1" && (
                            <p><span className="font-semibold">Type d'Aménagements :</span> {hasValue(equipment.equip_conf_type) ? equipment.equip_conf_type.join(', ') : "Non spécifié"}</p>
                        )}
                        <p><span className="font-semibold">Locaux Complémentaires :</span> {hasValue(equipment.equip_loc_bool) && equipment.equip_loc_bool === "1" ? "Oui" : "Non"}</p>
                        {hasValue(equipment.equip_loc_bool) && equipment.equip_loc_bool === "1" && (
                            <p><span className="font-semibold">Type de Locaux :</span> {hasValue(equipment.equip_loc_type) ? equipment.equip_loc_type.join(', ') : "Non spécifié"}</p>
                        )}
                        <p><span className="font-semibold">Ouverture Saisonnier :</span> {hasValue(equipment.equip_saison) ? equipment.equip_saison : "Non"}</p>
                        <p><span className="font-semibold">Date de Mise en Service :</span> {hasValue(equipment.equip_service_date) ? equipment.equip_service_date : "Non spécifiée"}</p>
                        <p><span className="font-semibold">Nom du Propriétaire :</span> {hasValue(equipment.equip_prop_nom) ? equipment.equip_prop_nom : "Non spécifié"}</p>
                        <p><span className="font-semibold">Observations :</span> {hasValue(equipment.equip_obs) ? equipment.equip_obs : "Aucune"}</p>
                    </div>
                </section>

                {/* Accessibility Information */}
                {(hasHandicapAccessibility || hasPMRAccess || hasPSHSAccess) ? (
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Accessibilité</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {hasPMRAccess && (
                                <>
                                    <p><span className="font-semibold">Mobilité Réduite (Accueil) :</span> {hasValue(equipment.equip_pmr_acc) && equipment.equip_pmr_acc === "1" ? "Oui" : "Non"}</p>
                                    <p><span className="font-semibold">Mobilité Réduite (Aire de Jeu) :</span> {hasValue(equipment.equip_pmr_aire) && equipment.equip_pmr_aire === "1" ? "Oui" : "Non"}</p>
                                    <p><span className="font-semibold">Mobilité Réduite (Douche) :</span> {hasValue(equipment.equip_pmr_douche) && equipment.equip_pmr_douche === "1" ? "Oui" : "Non"}</p>
                                    <p><span className="font-semibold">Mobilité Réduite (Sanitaires) :</span> {hasValue(equipment.equip_pmr_sanit) && equipment.equip_pmr_sanit === "1" ? "Oui" : "Non"}</p>
                                    <p><span className="font-semibold">Mobilité Réduite (Tribunes) :</span> {hasValue(equipment.equip_pmr_trib) && equipment.equip_pmr_trib === "1" ? "Oui" : "Non"}</p>
                                    <p><span className="font-semibold">Mobilité Réduite (Vestiaires) :</span> {hasValue(equipment.equip_pmr_vest) && equipment.equip_pmr_vest === "1" ? "Oui" : "Non"}</p>
                                </>
                            )}
                            {hasPSHSAccess && (
                                <>
                                    <p><span className="font-semibold">Handicap Sensoriel (Aire de Jeu) :</span> {hasValue(equipment.equip_pshs_aire) && equipment.equip_pshs_aire === "1" ? "Oui" : "Non"}</p>
                                    <p><span className="font-semibold">Handicap Sensoriel (Sanitaires) :</span> {hasValue(equipment.equip_pshs_sanit) && equipment.equip_pshs_sanit === "1" ? "Oui" : "Non"}</p>
                                    <p><span className="font-semibold">Handicap Sensoriel (Signalétique) :</span> {hasValue(equipment.equip_pshs_sign) && equipment.equip_pshs_sign === "1" ? "Oui" : "Non"}</p>
                                    <p><span className="font-semibold">Handicap Sensoriel (Tribunes) :</span> {hasValue(equipment.equip_pshs_trib) && equipment.equip_pshs_trib === "1" ? "Oui" : "Non"}</p>
                                    <p><span className="font-semibold">Handicap Sensoriel (Vestiaires) :</span> {hasValue(equipment.equip_pshs_vest) && equipment.equip_pshs_vest === "1" ? "Oui" : "Non"}</p>
                                </>
                            )}
                        </div>
                    </section>
                ) : (
                    <p className="text-center text-gray-600">Aucune information détaillée sur l'accessibilité disponible pour cet équipement.</p>
                )}

                {/* Physical Characteristics */}
                {(hasPistes || hasTribunes || hasVestiaires || hasBassin || hasSAE) && (
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Caractéristiques Physiques</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {hasPistes && <p><span className="font-semibold">Nombre de Pistes :</span> {equipment.equip_piste_nb}</p>}
                            {hasTribunes && <p><span className="font-semibold">Nombre de Places en Tribune :</span> {equipment.equip_trib_nb}</p>}
                            {hasVestiaires && <p><span className="font-semibold">Nombre de Vestiaires :</span> {equipment.equip_vest_sport}</p>}
                        </div>
                    </section>
                )}

                {/* Basin and SAE */}
                {hasBassin && (
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Informations sur le Bassin</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {hasValue(equipment.equip_bassin_long) && <p><span className="font-semibold">Longueur du Bassin :</span> {equipment.equip_bassin_long} m</p>}
                            {hasValue(equipment.equip_bassin_larg) && <p><span className="font-semibold">Largeur du Bassin :</span> {equipment.equip_bassin_larg} m</p>}
                            {hasValue(equipment.equip_bassin_surf) && <p><span className="font-semibold">Surface du Bassin :</span> {equipment.equip_bassin_surf} m²</p>}
                            {hasValue(equipment.equip_bassin_min) && <p><span className="font-semibold">Profondeur Minimale :</span> {equipment.equip_bassin_min} m</p>}
                            {hasValue(equipment.equip_bassin_max) && <p><span className="font-semibold">Profondeur Maximale :</span> {equipment.equip_bassin_max} m</p>}
                        </div>
                    </section>
                )}

                {hasSAE && (
                    <section className="mb-8">
                        <h2 className="text-2xl font-semibold mb-4">Informations sur la SAE</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {hasValue(equipment.equip_sae_couloir) && <p><span className="font-semibold">Nombre de Couloirs :</span> {equipment.equip_sae_couloir}</p>}
                            {hasValue(equipment.equip_sae_haut) && <p><span className="font-semibold">Hauteur Maximale :</span> {equipment.equip_sae_haut} m</p>}
                            {hasValue(equipment.equip_sae_surf) && <p><span className="font-semibold">Surface SAE :</span> {equipment.equip_sae_surf} m²</p>}
                        </div>
                    </section>
                )}

                {/* Additional Info */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4">Informations Supplémentaires</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {hasValue(equipment.equip_utilisateur) && <p><span className="font-semibold">Type d'Utilisateurs :</span> {equipment.equip_utilisateur}</p>}
                        <p><span className="font-semibold">Nature du Sol :</span> {hasValue(equipment.equip_sol) ? equipment.equip_sol : "Non spécifié"}</p>
                        <p><span className="font-semibold">Nature de l'Équipement :</span> {hasValue(equipment.equip_nature) ? equipment.equip_nature : "Non spécifié"}</p>
                        <p><span className="font-semibold">Département :</span> {hasValue(equipment.dep_nom) ? equipment.dep_nom : "Non spécifié"}</p>
                        <p><span className="font-semibold">Région :</span> {hasValue(equipment.reg_nom) ? equipment.reg_nom : "Non spécifié"}</p>
                    </div>
                </section>

                {/* External Link */}
                {hasValue(equipment.equip_url) && (
                    <div className="text-center">
                        <a href={equipment.equip_url} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">
                            Plus d'informations sur l'équipement
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EquipmentDetail;
