import { Schema, model } from 'mongoose';

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: false,
  },
  img: {
    type: String,
    required: false,
  },
});

export const Ingredient = model('Ingredient', ingredientSchema);
