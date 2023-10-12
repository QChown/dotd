import Link from 'next/link';
import React, { useEffect, useState } from 'react';

type Recipe = {
  recipe_id: number;
  name: string;
  instructions: string;
};

type Props = {
    ingredients: string[];
    currentRecipeId: number;
  };
  

const RecommendedRecipes: React.FC<Props> = ({ ingredients, currentRecipeId  }) => {
  const [recommendedRecipes, setRecommendedRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    if (ingredients.length > 0) {
      fetch(`/api/getRecommendedRecipes?ingredients=${ingredients.join(',')}`)
        .then((res) => res.json())
        .then((data: Recipe[]) => {
          // Filter out the current recipe
          const filteredData = data.filter((recipe) => recipe.recipe_id !== currentRecipeId);
          setRecommendedRecipes(filteredData);
        })
        .catch((error) => console.log('Error fetching data', error));
    }
  }, [ingredients, currentRecipeId]);

  return (
    <div>
      <h3>Recommended Recipes</h3>
      <ul>
        {recommendedRecipes.map((recipe) => (
          <li key={recipe.recipe_id}><Link href={`/recipes/${recipe.recipe_id}`}>{recipe.name}</Link></li>
        ))}
      </ul>
    </div>
  );
};

export default RecommendedRecipes;
