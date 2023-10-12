import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db';

const getRecipeById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === 'GET') {
    db.query('SELECT * FROM Recipes WHERE recipe_id = ?', [id], (err, recipeResults) => {
      if (err) {
        return res.status(500).json({ message: 'An error occurred', error: err });
      }

      db.query('SELECT i.* FROM Ingredients i JOIN Recipe_Ingredients ri ON i.ingredient_id = ri.ingredient_id WHERE ri.recipe_id = ?', [id], (err, ingredientResults) => {
        if (err) {
          return res.status(500).json({ message: 'An error occurred', error: err });
        }

        return res.status(200).json({ recipe: recipeResults[0], ingredients: ingredientResults });
      });
    });
  } else {
    res.status(405).end(); // Method not allowed
  }
};

export default getRecipeById;
