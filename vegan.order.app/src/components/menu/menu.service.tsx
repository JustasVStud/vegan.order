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
