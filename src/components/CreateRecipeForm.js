/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Context } from "../store/AppContext";

const CreateRecipeForm = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [objective, setObjective] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        name === "" ||
        objective === "" ||
        description === "" ||
        ingredients === ""
      ) {
        return alert("You must fill in all the fields to create the recipe.");
      }
      const req = await actions.createRecipe(
        name,
        description,
        ingredients,
        objective
      );
      console.log(req);
      clearInputs();
    } catch (error) {
      console.error("Error, try in a few minutes", error);
    }
  };

  const clearInputs = () => {
    setName("");
    setDescription("");
    setIngredients("");
    setObjective("");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="objective">
            Objective:
            <select
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
        </div>
        <div>
          <label htmlFor="ingredients">
            Ingredients:
            <textarea
              type="text"
              value={ingredients}
              placeholder="1kg of chicken, 1kg of rice, 20g of chili, 500g pepperoni...."
              onChange={(e) => setIngredients(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label htmlFor="description">
            Description:
            <textarea
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="cut the ingredients, put them in the bowl, add the chili, eat...."
              required
            />
          </label>
        </div>
        <div>
          <input type="submit" value="Create" />
          <input type="button" value="Cancel" onClick={clearInputs} />
        </div>
      </form>
    </div>
  );
};

export default CreateRecipeForm;
