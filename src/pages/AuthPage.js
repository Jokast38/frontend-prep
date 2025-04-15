import React, { useState } from "react";
import "../styles/AuthPage.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const AuthPage = () => {
  const [isRegister, setIsRegister] = useState(false); // État pour basculer entre Login et Register
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  }); // État pour stocker les données du formulaire

  const toggleForm = () => {
    setIsRegister(!isRegister); // Basculer entre Login et Register
  };

  // Gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Fonction pour gérer l'inscription
  const handleRegister = async () => {
    try {
      const response = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert("User registered successfully: " + data.username);
        setIsRegister(false); // Retourner au formulaire de connexion
      } else {
        const error = await response.json();
        alert("Error: " + error.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration.");
    }
  };

  // Fonction pour gérer la connexion
  const handleLogin = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/users/findByEmail?email=${formData.email}`
      );

      if (response.ok) {
        const data = await response.json();
        if (data.password === formData.password) {
          // Stocker le token JWT dans localStorage
          localStorage.setItem("token", data.token);
          alert("Login successful for user: " + data.username);
            // Rediriger vers la page d'accueil ou une autre page après la connexion réussie

            window.location.href = "/"; // Remplacez par la route de votre choix
        } else if (data.password !== formData.password) {
          alert("Incorrect password.");
        }
        if (data.role === "admin") {
          alert("Welcome Admin: " + data.username);
        } else if (data.role === "user") {
          alert("Welcome User: " + data.username);
        } else {
          alert("Invalid role.");
        }
        if (data.username === formData.username) {
          alert("Welcome: " + data.username);
        } else if (data.username !== formData.username) {
          alert("Invalid username.");
        } else {
          alert("Invalid password.");
        }
      } else {
        const error = await response.json();
        alert("Error: " + error.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="container">
      {!isRegister ? (
        <div className="login">
          <div className="container">
            <h1>Log in</h1>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <br />
            <input type="checkbox" />
            <span>Remember me</span>
            <a href="#">Forgot password?</a>
            <button onClick={handleLogin}>Log in</button>
            <hr />
            <p>Or Connect With</p>
            <hr />
            <ul>
              <li>
                <FacebookIcon fontSize="large" />
              </li>
              <li>
                <TwitterIcon fontSize="large" />
              </li>
              <li>
                <GitHubIcon fontSize="large" />
              </li>
              <li>
                <LinkedInIcon fontSize="large" />
              </li>
            </ul>
            <div className="clearfix"></div>
            <p>
              Don't have an account?{" "}
              <button className="toggle-button" onClick={toggleForm}>
                Register
              </button>
            </p>
          </div>
        </div>
      ) : (
        <div className="register">
          <div className="container">
            <h1>Register</h1>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
            <input
              type="text"
              name="role"
              placeholder="Role"
              value={formData.role}
              onChange={handleChange}
            />
            <br />
            <input type="checkbox" />
            <span>Remember me</span>
            <a href="#">Forgot password?</a>
            <button onClick={handleRegister}>Register</button>
            <hr />
            <p>Or Register With</p>
            <hr />
            <ul>
              <li>
                <FacebookIcon fontSize="large" />
              </li>
              <li>
                <TwitterIcon fontSize="large" />
              </li>
              <li>
                <GitHubIcon fontSize="large" />
              </li>
              <li>
                <LinkedInIcon fontSize="large" />
              </li>
            </ul>
            <div className="clearfix"></div>
            <p>
              Already have an account?{" "}
              <button className="toggle-button" onClick={toggleForm}>
                Log in
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthPage;