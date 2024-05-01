/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/AppContext";

const UserImage = () => {
  const { store, actions } = useContext(Context);
  const userId = store.user.id;
  const [newImage, setNewImage] = useState(null);
  const API = "http://localhost:5000/uploads/";

  const handleImageChange = (e) => {
    // Mettre à jour newImage avec le fichier sélectionné
    const file = e.target.files[0];
    setNewImage(file);
  };

  const getImage = async () => {
    await actions.getUserData(userId);
    if (store.user.id || store.userData) {
      await console.log(store.userData);
    }
  };

  useEffect(() => {
    if (userId) {
      getImage();
    }
  }, [userId]);

  const editImage = async () => {
    try {
      if (newImage) {
        await actions.uploadPhoto(userId, newImage);
        await actions.getUserData(userId);
      }
    } catch (error) {
      console.error("Error editing image:", error);
    }
  };

  return (
    <div>
      {store.userData && store.userData.photo_url ? (
        <div>
          <img
            src={
              store.userData.photo_url.startsWith("http")
                ? store.userData.photo_url
                : API + store.userData.photo_url
            }
            alt="User"
            width="150"
          />

          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button onClick={editImage}>Save Image</button>
        </div>
      ) : (
        <>
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button onClick={editImage}>Save Image</button>
        </>
      )}
    </div>
  );
};

export default UserImage;
