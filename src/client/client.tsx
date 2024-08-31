const url = import.meta.env.VITE_API_URL;
import { Filter } from '../types/filter.ts';

const getEquipmentsFiltered = async (filters: Filter, page: number) => {
    const limit = 10;
    const offset = (page - 1) * limit;
    try {
        const query = new URLSearchParams({
            ...filters,
            limit: limit.toString(),
            offset: offset.toString()
        }).toString();
        const response = await fetch(`${url}/equipments?${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

const getEquipmentByNumero = async (equip_numero: string) => {
    try {
        const response = await fetch(`${url}/equipments/${equip_numero}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Error fetching equipment details');
        }
        return response.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};

export default {
    getEquipmentsFiltered,
    getEquipmentByNumero
};