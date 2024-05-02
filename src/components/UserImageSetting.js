/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/AppContext";

const UserImageSetting = () => {
  const { store, actions } = useContext(Context);
  const userId = store.user.id;
  const [newImage, setNewImage] = useState(null);
  const API = "http://localhost:5000/uploads/";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);
  };

  const getImage = async () => {
    await actions.getUserData(userId);
  };

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

  useEffect(() => {
    if (userId) {
      getImage();
    }
  }, [userId]);

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
            className="user-img"
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button onClick={editImage}>Save Image</button>
        </div>
      ) : (
        <div>
          <img
            src="https://i.blogs.es/089869/superman-legacy-2025/840_560.jpeg"
            alt="User"
            width="150"
            className="user-img"
          />
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button onClick={editImage}>Save Image</button>
        </div>
      )}
    </div>
  );
};

export default UserImageSetting;
