import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import RecommendedRecipes from '@/components/RecommendedRecipes';

type Recipe = {
  recipe_id: number;
  name: string;
  instructions: string;
};

type Ingredient = {
  ingredient_id: number;
  name: string;
};

type RecipeDetail = {
  recipe: Recipe;
  ingredients: Ingredient[];
};

const RecipeDetailPage: React.FC = () => {
  const [recipeDetail, setRecipeDetail] = useState<RecipeDetail | null>(null);
  const router = useRouter();
  const { id } = router.query;
  const ingredientIds = recipeDetail?.ingredients.map((ingredient) => ingredient.ingredient_id.toString()) || [];

  useEffect(() => {
    if (id) {
      fetch(`/api/getRecipeById?id=${id}`)
        .then((res) => res.json())
        .then((data: RecipeDetail) => setRecipeDetail(data))
        .catch((error) => console.log('Error fetching data', error));
    }
  }, [id]);

  return (
    <div>
      <h1>Recipe Detail Page</h1>
      {recipeDetail ? (
        <>
          <h2>{recipeDetail.recipe.name}</h2>
          <p>{recipeDetail.recipe.instructions}</p>
          <h3>Ingredients:</h3>
          <ul>
            {recipeDetail.ingredients.map((ingredient) => (
              <li key={ingredient.ingredient_id}>{ingredient.name}</li>
            ))}
          </ul>
          <RecommendedRecipes ingredients={ingredientIds} currentRecipeId={recipeDetail.recipe.recipe_id} />

        </>
      ) : (
        'Loading...'
      )}
    </div>
  );
};

export default RecipeDetailPage;
