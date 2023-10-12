import { NextApiRequest, NextApiResponse } from 'next';
import db from '../../lib/db';

const getRecipes = async (req: NextApiRequest, res: NextApiResponse<{ message?: string; error?: any }>) => {
  if (req.method === 'GET') {
    db.query('SELECT * FROM Recipes', (err, results) => {
      if (err) {
        return res.status(500).json({ message: 'An error occurred', error: err });
      }
      return res.status(200).json(results);
    });
  } else {
    res.status(405).end(); // Method not allowed
  }
};

export default getRecipes;
