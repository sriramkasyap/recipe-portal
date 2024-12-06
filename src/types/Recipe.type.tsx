export type Recipe = {
  title: string;
  ingredients: Map<string, { quantity: number; unit: string; name: string }>;
};
