/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/AppContext";
import ConfirmAlertDelete from "./ConfirmAlertDelete";
import { useNavigate } from "react-router";
import FavoriteIcon from "./FavoriteIcon";

const AllRecipes = () => {
  const { store, actions } = useContext(Context);
  const [recipes, setRecipes] = useState([]);
  let navigate = useNavigate();

  const getRecipes = async () => {
    try {
      const req = await actions.getAllRecipes();
      setRecipes(req);
    } catch (error) {
      console.error("Error Getting recipes", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await actions.deleteRecipe(id);
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== id)
      );
    } catch (error) {
      console.error("Error deleting recipe by id", error);
    }
  };

  const handleEdit = (recipe) => {
    navigate(`/edit-recipe/${recipe.id}`, { state: { recipeData: recipe } });
  };

  useEffect(() => {
    if (store.user.id) {
      getRecipes();
    }
  }, [store.user.id]);

  const filteredRecipeByUserId = recipes.filter((recipe) => {
    if (store.user.is_admin) {
      return true;
    }
    return recipe.user_id === store.user.id;
  });

  return (
    <div className="card-recipe">
      {filteredRecipeByUserId.length > 0 ? (
        filteredRecipeByUserId.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.recipe_name}</h3>
            <p>Objective: {recipe.recipe_objective}</p>
            <h4>Ingredients:</h4>
            <ul>
              {recipe.ingredients.split(",").map((ingredient, index) => (
                <li key={index}>{ingredient.trim()}</li>
              ))}
            </ul>
            <h4>Steps:</h4>
            <ol>
              {recipe.recipe_description.split(",").map((step, index) => (
                <li key={index}>{step.trim()}</li>
              ))}
            </ol>
            <div>
              <ConfirmAlertDelete
                onConfirm={() => handleDelete(recipe.id)}
                message={`Are you sure you want to delete ${recipe.recipe_name}?`}
              />
              {store.user.id === recipe.user_id && (
                <button onClick={() => handleEdit(recipe)}>&#9998;</button>
              )}
              <FavoriteIcon recipeId={recipe.id} userId={recipe.user_id} />
            </div>
          </div>
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
};

export default AllRecipes;
