import React, { useContext, useState } from "react";
import { Context } from "../store/AppContext";
import { useLocation, useNavigate } from "react-router";

const EditRecipeData = () => {
  const { actions } = useContext(Context);
  const { recipeData } = useLocation().state;
  let navigate = useNavigate();
  const [name, setName] = useState(recipeData.recipe_name || "");
  const [objective, setObjective] = useState(recipeData.recipe_objective || "");
  const [description, setDescription] = useState(
    recipeData.recipe_description || ""
  );
  const [ingredients, setIngredients] = useState(recipeData.ingredients || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await actions.editRecipe(
        name,
        description,
        ingredients,
        objective,
        recipeData.id
      );
      navigate("/recipes");
    } catch (error) {
      console.error("Error updating recipe data:", error);
      throw error;
    }
  };

  return (
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
              <option value="Physical maintenance">Physical Maintenance</option>
            </select>
          </label>
          <h4>Ingredients:</h4>
          <ul>
            {ingredients.split(",").map((ingredient, index) => (
              <li key={index}>
                <input
                  type="text"
                  value={ingredient.trim()}
                  onChange={(event) => {
                    const updatedIngredients = [...ingredients.split(",")];
                    updatedIngredients[index] = event.target.value;
                    setIngredients(updatedIngredients.join(","));
                  }}
                />
              </li>
            ))}
          </ul>
          <h4>Steps:</h4>
          <ol>
            {description.split(",").map((step, index) => (
              <li key={index}>
                <input
                  type="text"
                  value={step.trim()}
                  onChange={(event) => {
                    const updatedSteps = [...description.split(",")];
                    updatedSteps[index] = event.target.value;
                    setDescription(updatedSteps.join(","));
                  }}
                />
              </li>
            ))}
          </ol>
          <input type="submit" value="Edit" />
        </form>
      </div>
    </div>
  );
};

export default EditRecipeData;
