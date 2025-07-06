import React, {useState} from "react";
import "../css/signup.css";
import {FaRegArrowAltCircleLeft} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://e-commerce-project-r7hg.onrender.com/api/register",
        {
          name,
          email,
          password,
        }
      );
      alert(response.data.message);
      // Redirect to the Cellar page
      navigate("/login");
    } catch (error) {
      alert(error.response.data.message || "Registration failed");
    }
  };

  return (
    <div className="signup">
      <form onSubmit={handleSignup} className="form">
        <Link to="/">
          <p className="back">
            <span>
              <FaRegArrowAltCircleLeft />
            </span>
            Back to Cellar
          </p>
        </Link>
        <br />
        <h1>Welcome, please register with your details below</h1>
        <br />
        <label htmlFor="name">
          Name:
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Jhon Donohe"
            aria-required="true"
            aria-describedby="name-help"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
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

        <br />
        <button type="submit" className="register-button">
          Create Account
        </button>
      </form>
    </div>
  );
}

export default Signup;
