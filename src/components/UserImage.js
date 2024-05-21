/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { Context } from "../store/AppContext";

const UserImage = ({ open, setOpen, imgRef }) => {
  const { store, actions } = useContext(Context);
  const userId = store.user.id;
  const API = "http://localhost:5000/uploads/";

  const getImage = async () => {
    await actions.getUserData(userId);
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
            style={{ cursor: "pointer", borderRadius: "50%" }}
            onMouseEnter={() => setOpen(true)}
            ref={imgRef}
            src={
              store.userData.photo_url.startsWith("http")
                ? store.userData.photo_url
                : API + store.userData.photo_url
            }
            alt="User"
            width="70"
            height="70"
          />
        </div>
      ) : (
        <>
          <img
            style={{ cursor: "pointer", borderRadius: "50%" }}
            onMouseEnter={() => setOpen(true)}
            ref={imgRef}
            src="https://i.blogs.es/089869/superman-legacy-2025/840_560.jpeg"
            alt="User"
            width="70"
          />
        </>
      )}
    </div>
  );
};

export default UserImage;
