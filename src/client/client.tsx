const url = import.meta.env.VITE_API_URL;

const getEquipments = async () => {
    try {
        const response = await fetch(`${url}/equipments`, {
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
    getEquipments
};