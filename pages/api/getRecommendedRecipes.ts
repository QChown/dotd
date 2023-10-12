import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db';

const getRecommendedRecipes = async (req: NextApiRequest, res: NextApiResponse) => {
  const ingredients = req.query.ingredients;

  if (!ingredients) {
    return res.status(400).json({ message: 'No ingredients provided' });
  }

  if (req.method === 'GET') {
    const query = `
      SELECT r.*, COUNT(*) as matching_ingredients
      FROM Recipes r
      JOIN Recipe_Ingredients ri ON r.recipe_id = ri.recipe_id
      WHERE ri.ingredient_id IN (?)
      GROUP BY r.recipe_id
      ORDER BY matching_ingredients DESC
    `;

    db.query(query, [Array.isArray(ingredients) ? ingredients : ingredients.split(',')], (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'An error occurred', error: err });
      }
      return res.status(200).json(results);
    });
  } else {
    res.status(405).end(); // Method not allowed
  }
};

export default getRecommendedRecipes;
