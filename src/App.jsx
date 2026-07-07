import { useState } from "react";
import Preloader from "./components/Preloader";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      <main>
        <section className="hero">
          <h1>Aura Collective</h1>
        </section>
      </main>
    </>
  );
}

export default App;