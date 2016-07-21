import shortid from 'shortid';

export const addRecipe = recipe => ({
  type: 'ADD_RECIPE',
  ...recipe,
});

