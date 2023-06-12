import axios from 'axios';
import { authHeader } from '../auth/auth.service';

const BASE_URL = 'http://localhost:8080/api/menus'

export const getMenus = async() => {
    try{
        const response = await axios.get(BASE_URL, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getMenu = async(id: string) => {
    try{
        const response = await axios.get(`${BASE_URL}/${id}`, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const createMenu = async(title: string) => {
    try{
        const response = await axios.post(`${BASE_URL}`, {title}, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const editMenu = async(id: string, title: string) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${id}`, {title}, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteMenu = async(id: string) => {
    try{
        const response = await axios.delete(`${BASE_URL}/${id}`, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
