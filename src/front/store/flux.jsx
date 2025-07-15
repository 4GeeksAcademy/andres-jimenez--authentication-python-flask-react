import axios from 'axios';

const BackendURL = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`, 
});

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            token: null,
        },
        actions: {
            signup: async (formData) => {
                try {
                    const response = await BackendURL.post("/user", formData);
                    return response;
                } catch (error) {
                    return error.response || error;
                }
            },

            login: async (formData) => {
                try {
                    const response = await BackendURL.post("/token", formData);
                    localStorage.setItem("token", response.data.token);
                    setStore({ token: response.data.token });
                    return response;
                } catch (error) {
                    return error.response || error;
                }
            },

            logout: () => {
                localStorage.removeItem("token");
                setStore({ token: null }); 
            },

            protected: async () => {
                try {
                    const response = await BackendURL.get("/protected", {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });
                    return response;
                } catch (error) {
                    return error.response || error;
                }
            },

            syncTokenFromLocalStore: () => {
                const token = localStorage.getItem("token");
                if (token) {
                    setStore({ token });
                }
            },
        },
    };
};

export default getState;
