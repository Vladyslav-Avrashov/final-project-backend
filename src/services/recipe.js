import { Recipe } from '../db/models/Recipe.js';

export const createNewRecipe = async (payload) => await Recipe.create(payload);
