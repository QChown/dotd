import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Recipe = {
  recipe_id: number;
  name: string;
  instructions: string;
};

type Props = {};

const RecipePage: React.FC<Props> = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    fetch('/api/getRecipes')
      .then((res) => res.json())
      .then((data: Recipe[]) => setRecipes(data))
      .catch((error) => console.log('Error fetching data', error));
  }, []);

  return (
    <div>
      <h1>RecipePage</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.recipe_id}>
            <Link href={`/recipes/${recipe.recipe_id}`}><h2>{recipe.name}</h2></Link> 
            <p>{recipe.instructions}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipePage;
