import axios from 'axios';

const API_URL = "http://localhost:8080/tasks";

export const getAllTasks = () => axios.get(API_URL);
export const getByIdTask = (id) => axios.get(`${API_URL}/${id}`);
export const addTask = async (task) => {
    return await axios.post(API_URL, task)
};
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
export const updateTask = (id, task) => axios.put(`${API_URL}/${id}`, task);