/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../store/AppContext";

const UserImageSetting = () => {
  const { store, actions } = useContext(Context);
  const userId = store.user.id;
  const [newImage, setNewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const API = "http://localhost:5000/uploads/";
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const getImage = async () => {
    await actions.getUserData(userId);
  };

  const editImage = async () => {
    try {
      if (newImage) {
        await actions.uploadPhoto(userId, newImage);
        await actions.getUserData(userId);
        setPreviewImage(null); // Reset preview after successful upload
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

  const displayedImage = previewImage
    ? previewImage
    : store.userData && store.userData.photo_url
    ? store.userData.photo_url.startsWith("http")
      ? store.userData.photo_url
      : API + store.userData.photo_url
    : "https://i.blogs.es/089869/superman-legacy-2025/840_560.jpeg";

  return (
    <div style={{ position: "relative", zIndex: "2" }}>
      <div>
        <img src={displayedImage} alt="User" width="150" className="user-img" />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      </div>
      <div onClick={() => fileInputRef.current.click()} className="upload-icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="icon icon-tabler icon-tabler-camera-rotate"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="#ffffff"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
          <path d="M11.245 15.904a3 3 0 0 0 3.755 -2.904m-2.25 -2.905a3 3 0 0 0 -3.75 2.905" />
          <path d="M14 13h2v2" />
          <path d="M10 13h-2v-2" />
        </svg>
      </div>
      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <button onClick={editImage} className="btn-save">
          Save Image
        </button>
      </div>
    </div>
  );
};

export default UserImageSetting;
