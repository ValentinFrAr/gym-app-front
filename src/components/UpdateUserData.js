import React, { useContext, useState } from "react";
import { Context } from "../store/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateUserData = () => {
  const { actions } = useContext(Context);
  const { userData } = useLocation().state;
  const [phone, setPhone] = useState(userData.phone || "");
  const [email, setEmail] = useState(userData.email || "");
  const [address, setAddress] = useState(userData.address || "");
  const [password, setPassword] = useState(userData.password || "");
  const [isAdmin, setIsAdmin] = useState(userData.is_admin);
  const [photo, setPhoto] = useState(null); // Nouvel état pour la photo
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("photo", photo);

      await actions.updateUserData(
        email,
        phone,
        address,
        isAdmin,
        password,
        userData.user_id,
        formData,
        userData.firstname,
        userData.lastname
      );
      navigate("/users");
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="container">
      <div className="heading">Update User Data</div>
      <form
        className="form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div>
          <label htmlFor="photo">Profile Photo:</label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
          />
        </div>
        <div>
          <label htmlFor="firstname">First Name:</label>
          <input
            id="firstname"
            autoComplete="off"
            className="input"
            type="text"
            placeholder="John"
            defaultValue={userData.firstname}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input
            id="lastname"
            autoComplete="off"
            className="input"
            type="text"
            placeholder="Doe"
            defaultValue={userData.lastname}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            id="phone"
            autoComplete="off"
            className="input"
            type="text"
            placeholder="+1123456789"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            autoComplete="off"
            className="input"
            type="email"
            placeholder="Email@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="address">Address:</label>
          <input
            id="address"
            autoComplete="off"
            className="input"
            type="text"
            placeholder="123 main street"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">New Password:</label>
          <input
            id="password"
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </div>
        <div>
          <label htmlFor="adminStatus">Admin Status:</label>
          <select
            id="adminStatus"
            className="input"
            value={isAdmin ? "inactive" : "active"} // Sélection de la valeur en fonction de l'état isAdmin
            onChange={(e) => setIsAdmin(e.target.value === "inactive")} // Mise à jour de l'état isAdmin
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <div>
          <input value="Update" type="submit" className="login-button" />
          <input
            value="Cancel"
            className="login-button"
            type="button"
            onClick={() => navigate("/users")}
          />
        </div>
      </form>
    </div>
  );
};

export default UpdateUserData;
