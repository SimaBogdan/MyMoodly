import axios from 'axios';

const API_URL = "http://localhost:8080/trackers";

export const getAllTrackers = () => axios.get(API_URL);
export const getByIdTracker = (id) => axios.get(`${API_URL}/${id}`);
export const addTracker = async (tracker) => {
    return await axios.post(API_URL, tracker);
};
export const deleteTracker = (id) => axios.delete(`${API_URL}/${id}`);
export const updateTracker = async (id, tracker) =>
    axios.put(`${API_URL}/${id}`, tracker);