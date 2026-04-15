const API_BASE = "http://localhost:5000";

export const apiFetch = async (endpoint: string, options: any = {}) => {
    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });
    return response.json();
};