export type Recipe = {
  _id: string;
  title: string;
  ingredients: Map<string, GroceryItem>;
};

export type MealPlan = {
  recipes: Recipe[];
  groceryList: GroceryList;
};

export type GroceryItem = {
  name: string;
  quantity: number;
  units: string;
  checked: boolean;
};

export type GroceryList = {
  [key: string]: GroceryItem;
};
