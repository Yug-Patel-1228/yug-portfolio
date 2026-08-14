import "./App.css";

import Navbar from "./components/layout/Navbar";

import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Work from "./components/sections/Work";
import Skills from "./components/sections/Skills";
import OffensiveSecurity from "./components/sections/OffensiveSecurity";
import Journey from "./components/sections/Journey";
import Contact from "./components/sections/Contact";

function App() {
  return (
    <main className="app">
      <Navbar />

      <Hero />

      <About />
      <Work />
      <Skills />
      <OffensiveSecurity />
      <Journey />
      <Contact />
    </main>
  );
}

export default App;