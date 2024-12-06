export const getRecipes = async (title: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/recipes?title=${title}`,
    {
      credentials: "include",
    }
  );

  let result = await response.json();

  if (!result.success) {
    throw new Error(result.message);
  }

  return result.recipes;
};
