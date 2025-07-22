import { sortList } from '../constants/index.js';
import { Recipe } from '../db/models/Recipe.js';
import { calcaPaginationData } from '../utils/calcPaginationData.js';

export const getRecipes = async ({
  page = 1,
  perPage = 10,
  sortBy,
  sortOrder = sortList[0],
  filters = {},
}) => {
  const skip = (page - 1) * perPage;
  const query = Recipe.find();

  if (filters.userId) {
    query.where('owner').equals(filters.userId);
  }
  if (filters.type) {
    query.where('type').equals(filters.type);
  }
  const totalItems = await Recipe.countDocuments(query.getFilter());

  const items = await query
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder });

  const paginationData = calcaPaginationData({ page, perPage, totalItems });

  return {
    items,
    page,
    perPage,
    totalItems,
    ...paginationData,
  };
};

export const createNewRecipe = async (payload) => await Recipe.create(payload);

export const getRecipeById = async (id) => {
  return await Recipe.findById(id);
};