import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import About from "./components/About"; // <-- 1. Importa el nuevo componente
import Certificates from "./components/Certificates";
import Tecnologias from "./components/Tecnologias";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Projects />
      <About /> {/* <-- 2. Añade el componente aquí */}
      <Certificates />
      <Tecnologias />
    </>
  );
}

export default App;