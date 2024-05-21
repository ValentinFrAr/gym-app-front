/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/AppContext";

const FavoriteIcon = ({ recipeId }) => {
  const { store, actions } = useContext(Context);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const checkInitialFavorite = async () => {
      if (recipeId) {
        await actions.getFavoritedRecipes();

        if (store.favoritedRecipes.some((fav) => fav.recipe_id === recipeId)) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      }
    };
    checkInitialFavorite();
  }, [store.user.id]);

  const addFavorite = async () => {
    if (recipeId) {
      await actions.addFavoriteRecipe(store.user.id, recipeId);
    }
    setIsFavorite(true);
  };

  const removeFavorite = async () => {
    if (recipeId) {
      await actions.deleteFavoritedRecipe(recipeId);
    }
    setIsFavorite(false);
  };

  return (
    <div>
      {!isFavorite ? (
        <span onClick={addFavorite}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-heart"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#597e8d"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
          </svg>
        </span>
      ) : (
        <span onClick={removeFavorite}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-heart-filled"
            width="28"
            height="28"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="#ff2825"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path
              d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z"
              strokeWidth="0"
              fill="currentColor"
            />
          </svg>
        </span>
      )}
    </div>
  );
};

export default FavoriteIcon;
