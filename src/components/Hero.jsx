import React from "react";
import "../styles/Hero.css";
import robot from "../assets/robot_meme.png";

function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <h1>Hola, soy <span>David Sevan</span></h1>
        <p>Desarrollador Frontend apasionado por crear interfaces modernas y funcionales.</p>
      </div>
      <img src={robot} alt="Robot animado" className="hero-image" />
    </section>
  );
}

export default Hero;
