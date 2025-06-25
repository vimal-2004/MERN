const API_URL = 'http://localhost:5000/api';

export const createData = async (formData) => {
    const response = await fetch(`${API_URL}/data`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    });
    return response.json();
};

export const getData = async () => {
    const response = await fetch(`${API_URL}/data`);
    return response.json();
};
