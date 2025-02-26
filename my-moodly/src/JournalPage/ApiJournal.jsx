import axios from 'axios';

const API_URL = "http://localhost:8080/journals";

export const getAllJournals = () => axios.get(API_URL);
export const getByIdJournal = (id) => axios.get(`${API_URL}/${id}`);
export const addJournal = async (journal) => {
    return await axios.post(API_URL, journal)
};
export const deleteJournal = (id) => axios.delete(`${API_URL}/${id}`);
export const updateJournal = (id, journal) => axios.put(`${API_URL}/${id}`, journal);