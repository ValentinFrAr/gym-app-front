/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/AppContext";
import { useLocation, useNavigate } from "react-router";

const EditRecipeData = () => {
  const { store, actions } = useContext(Context);
  const { recipeData } = useLocation().state;
  const navigate = useNavigate();

  const [name, setName] = useState(recipeData.recipe_name || "");
  const [objective, setObjective] = useState(recipeData.recipe_objective || "");
  const [ingredients, setIngredients] = useState(recipeData.ingredients || "");
  const [steps, setSteps] = useState(recipeData.recipe_description || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actions.editRecipe(
        name,
        steps,
        ingredients,
        objective,
        recipeData.id
      );
      navigate("/recipes");
    } catch (error) {
      console.error("Error updating recipe data:", error);
    }
  };

  const handleIngredientChange = (index, value) => {
    // Copia el array de ingredientes separados por comas
    const updatedIngredients = [...ingredients.split(",")];
    // Reemplaza el elemento en el índice especificado por el nuevo valor
    updatedIngredients[index] = value;
    // Actualiza el estado de los ingredientes uniendo el array en una cadena con comas
    setIngredients(updatedIngredients.join(","));
  };

  const handleStepChange = (index, value) => {
    // Copia el array de pasos separados por comas
    const updatedSteps = [...steps.split(",")];
    // Reemplaza el elemento en el índice especificado por el nuevo valor
    updatedSteps[index] = value;
    // Actualiza el estado de los pasos uniendo el array en una cadena con comas
    setSteps(updatedSteps.join(","));
  };

  const handleIngredientRemove = (index) => {
    const updatedIngredients = [...ingredients.split(",")];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients.join(","));
  };

  const handleStepRemove = (index) => {
    const updatedSteps = [...steps.split(",")];
    updatedSteps.splice(index, 1);
    setSteps(updatedSteps.join(","));
  };

  const handleAddIngredient = () => {
    setIngredients((prevIngredients) => prevIngredients + ",");
  };

  const handleAddStep = () => {
    setSteps((prevSteps) => prevSteps + ",");
  };

  const filteredRecipeByUserId = store.recipes.filter((recipe) => {
    if (store.user.is_admin) {
      return true;
    }
    return recipe.user_id === store.user.id;
  });

  return (
    <>
      {filteredRecipeByUserId && filteredRecipeByUserId.length > 0 ? (
        <div className="card-recipe">
          <div key={recipeData.id}>
            <form onSubmit={handleSubmit}>
              <h3>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </h3>
              <label htmlFor="objective">
                Objective:
                <select
                  id="objective"
                  value={objective}
                  onChange={(e) => setObjective(e.target.value)}
                  required
                >
                  <option value="">Select Objective</option>
                  <option value="mass gain">Mass Gain</option>
                  <option value="cutting">Cutting</option>
                  <option value="strength">Strength</option>
                  <option value="Physical maintenance">
                    Physical Maintenance
                  </option>
                </select>
              </label>
              <h4>Ingredients:</h4>
              <ul>
                {ingredients.split(",").map((ingredient, index) => (
                  <li key={index}>
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(event) =>
                        handleIngredientChange(index, event.target.value)
                      }
                    />
                    <button
                      type="button"
                      onClick={() => handleIngredientRemove(index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
                <button type="button" onClick={handleAddIngredient}>
                  Add
                </button>
              </ul>
              <h4>Steps:</h4>
              <ol>
                {steps.split(",").map((step, index) => (
                  <li key={index}>
                    <input
                      type="text"
                      value={step}
                      onChange={(event) =>
                        handleStepChange(index, event.target.value)
                      }
                    />
                    <button
                      type="button"
                      onClick={() => handleStepRemove(index)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
                <button type="button" onClick={handleAddStep}>
                  Add
                </button>
              </ol>
              <input type="submit" value="Edit" />
            </form>
          </div>
        </div>
      ) : (
        <h1>
          ACCESS DENIED, YOUR COMPUTER WILL BE EXPLOSE IN 5... 4... 3... 2...
          1... BOOM
        </h1>
      )}
    </>
  );
};

export default EditRecipeData;
