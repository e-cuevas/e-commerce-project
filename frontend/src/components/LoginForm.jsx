import React, {useState} from "react";
import "../css/loginForm.css";
import axios from "axios";
import {useNavigate, Link} from "react-router-dom";
import {FcGoogle} from "react-icons/fc";
import {SiFacebook} from "react-icons/si";
import {FaRegArrowAltCircleLeft} from "react-icons/fa";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      const {token} = response.data;
      localStorage.setItem("token", token); // Save token in local storage

      alert(response.data.message);
      // Redirect to the Cellar page
      navigate("/");
    } catch (error) {
      alert(error.response.data.message || "Login failed.");
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin} className="form">
        <Link to="/">
          <p className="back">
            <span>
              <FaRegArrowAltCircleLeft />
            </span>
            Back to Cellar
          </p>
        </Link>
        <h1>Continue with</h1>
        <br />
        <span className="icon">
          <FcGoogle />
          <SiFacebook />
        </span>
        <hr />
        <h1>or login with your details below</h1>
        <br />
        <label htmlFor="email">
          Email:
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your email address"
            aria-required="true"
            aria-describedby="email-help"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />

        <label htmlFor="password">
          Password:
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <Link to="/register" className="create-acc">
          Create Account
        </Link>
        <h2>Forgot Password?</h2>
        <br />
        <button type="submit" className="login-button">
          Log in
        </button>
      </form>
    </div>
  );
}
export default LoginForm;
