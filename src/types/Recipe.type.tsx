export type Recipe = {
  _id: string;
  title: string;
  ingredients: Map<string, GroceryItem>;
};

export type MealPlan = {
  recipes: Recipe[];
};

export type GroceryItem = {
  name: string;
  quantity: number;
  units: string;
};

export type GroceryList = {
  [key: string]: GroceryItem;
};
