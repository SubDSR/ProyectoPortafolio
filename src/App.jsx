import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates";
import Tecnologias from "./components/Tecnologias"; // <-- 1. Importa el nuevo componente

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Projects />
      <Certificates />
      <Tecnologias /> {/* <-- 2. Añade el componente al final */}
    </>
  );
}

export default App;