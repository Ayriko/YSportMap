const url = import.meta.env.VITE_API_URL;
import { Filter } from '../types/filter.ts';

const getEquipmentsFiltered = async (filters: Filter) => {
    try {
        const query = new URLSearchParams(filters).toString();
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

export default {
    getEquipmentsFiltered
};