// Recipe type
export interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
}

export interface Recipe {
  id: string;
  name: string;
  portionSize: string;
  ingredients: Ingredient[];
} 