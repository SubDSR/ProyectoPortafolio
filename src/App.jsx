import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Certificates from "./components/Certificates"; // <-- 1. Importa el nuevo componente

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Projects />
      <Certificates /> {/* <-- 2. Añádelo aquí */}
    </>
  );
}

export default App;