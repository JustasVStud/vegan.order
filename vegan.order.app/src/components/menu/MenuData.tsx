export interface MenuData {
    id: number;
    title: string;
    meals: MealData[];
  }
  
  export interface MealData {
    id: number;
    title: string;
    description: string;
    quantity: number;
  }