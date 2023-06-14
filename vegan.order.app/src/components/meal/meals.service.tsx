import axios from 'axios';
import { authHeader } from '../auth/auth.service';

const BASE_URL = 'http://localhost:8080/api/menus'

export const getMeals = async(menuId: string) => {
    try{
        const response = await axios.get(`${BASE_URL}/${menuId}/meals`, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getMeal = async(menuId: string, mealId: string) => {
    try{
        const response = await axios.get(`${BASE_URL}/${menuId}/meals/${mealId}`, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const createMeal = async(menuId:string, title: string, description: string, quantity: number) => {
    try{
        const response = await axios.post(`${BASE_URL}/${menuId}/meals`, {title, description, quantity}, {
            headers: authHeader()
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const updateMeal = async (menuId: string, mealId: string, title: string, description: string, quantity: number ) => {
    try {
        const response = await axios.patch(`${BASE_URL}/${menuId}/meals/${mealId}`,
        {title, description, quantity},
        {
            headers: authHeader()
        }
        )
        return response.data;
    } catch (error) {
        throw error;
    }
}
export const deleteMeal = async(menuId: number, mealId: number) =>{
    try {
        const response = await axios.delete(`${BASE_URL}/${menuId}/meals/${mealId}`,
        { headers: authHeader() }
        )
        return response.data;
    } catch (error) {
        throw error;
    }
}