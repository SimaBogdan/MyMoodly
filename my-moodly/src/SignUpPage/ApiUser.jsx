import axios from 'axios';

const API_URL = "http://localhost:8080/users";

export const getAllUsers = () => axios.get(API_URL);
export const getByIdUser = (id) => axios.get(`${API_URL}/${id}`);
export const addUser = async (user) => {
    return await axios.post(API_URL, user)
};
export const deleteUser = (id) => axios.delete(`${API_URL}/${id}`);
export const updateUser = (id, user) => axios.put(`${API_URL}/${id}`, user);