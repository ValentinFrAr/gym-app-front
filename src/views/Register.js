import React, { useContext, useState } from "react";
import { Context } from "../store/AppContext";
import { useNavigate } from "react-router";

const Register = () => {
  const { actions } = useContext(Context);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phone, setPhone] = useState("");
  const [sex, setSex] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requuest = await actions.register(
        firstname,
        lastname,
        phone,
        sex,
        email,
        address,
        birthday,
        password
      );
      if (requuest) {
        clearInputs();
        navigate("/login");
        console.log(requuest);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const clearInputs = () => {
    setFirstname("");
    setLastname("");
    setPhone("");
    setSex("");
    setEmail("");
    setAddress("");
    setBirthday("");
    setPassword("");
  };

  return (
    <div className="container">
      <div className="heading">Sign Up</div>
      <form className="form" onSubmit={handleSubmit}>
        <input
          autoComplete="off"
          className="input"
          type="text"
          placeholder="John"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          required
        />
        <input
          autoComplete="off"
          className="input"
          type="text"
          placeholder="Doe"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
        />
        <input
          autoComplete="off"
          className="input"
          type="text"
          placeholder="+1123456789"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          autoComplete="off"
          className="input"
          type="text"
          placeholder="Male or Female"
          value={sex}
          onChange={(e) => setSex(e.target.value)}
          required
        />
        <input
          autoComplete="off"
          className="input"
          type="email"
          placeholder="Email@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          autoComplete="off"
          className="input"
          type="text"
          placeholder="123 main street"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <input
          autoComplete="off"
          className="input"
          type="text"
          placeholder="1900/12/12"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Your Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
        />
        <div className="span-forgot-signup">
          <span className="forgot-password">
            <a href="#!">Do you already have an account? Sign In</a>
          </span>
        </div>
        <input value="Sign In" type="submit" className="login-button" />
      </form>
      <div className="social-account-container">
        <span className="title">Or Sign in with</span>
        <div className="social-accounts">
          <button className="social-button google">
            <svg
              viewBox="0 0 488 512"
              height="1em"
              xmlns="http://www.w3.org/2000/svg"
              className="svg"
            >
              <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path>
            </svg>
          </button>
        </div>
      </div>
      <span className="agreement">
        <a href="#!">Learn user licence agreement</a>
      </span>
    </div>
  );
};

export default Register;
