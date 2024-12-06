export type Recipe = {
  title: string;
  ingredients: Map<string, { quantity: number; units: string; name: string }>;
};
