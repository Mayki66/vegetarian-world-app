// lib/types.ts

export interface Dish {
    country: string;
    dish: string;
    carbs: string[];
    recipe: string;
    continent: string;
    slug: string;
    ingredients?: string[];
    description?: string;
  }
  