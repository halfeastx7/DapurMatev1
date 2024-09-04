import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


function Introduction() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Retrieve token from localStorage
    const token = localStorage.getItem("token");

    if (token) {
      // Decode the token to get the user's name
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.name);
    }
  }, []);

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to Dapurmate, {userName}!</h1>
        <h2>Your Smart Kitchen Companion</h2>
        <p>
          Effortlessly manage your kitchen with our smart tools. Track your
          grocery inventory, generate shopping lists, find recipes, and
          compare prices—all in one place.
        </p>
        <div className="hero-buttons">
          <a href="#about" className="btn btn-primary">
            Learn More
          </a>
        </div>
      </div>
      <div className="hero-image-container">
        <img
          src="/grocery-img.jpg"
          alt="Hero"
          className="hero-image animate-fade-in"
        />
      </div>
    </section>
  );
}

export default Introduction;
