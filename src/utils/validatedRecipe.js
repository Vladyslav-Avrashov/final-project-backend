import createHttpError from 'http-errors';

export const validatedRecipe = ({ time, calories }) => {
  // time
  const timeNum = Number(time);
  if (isNaN(timeNum) || timeNum < 1 || timeNum > 360) {
    throw createHttpError(400, 'time must be a number between 1 and 360');
  }

  // calories
  let caloriesNum = Number(calories);
  if (isNaN(caloriesNum) || caloriesNum < 1 || caloriesNum > 10000) {
    throw createHttpError(400, 'calories must be a number between 1 and 10000');
  }

  return {
    time: timeNum,
    calories: caloriesNum,
  };
};
