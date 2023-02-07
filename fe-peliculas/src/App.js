import React, { useState, useEffect } from "react";

import AppRouter from "./routes/AppRouter";
import Navb from "./components/Navbar";
import ContextMovie from "./Context/MovieContext";

function App() {
  const [tok, setTok] = useState([]);

  useEffect(() => {
    setTok(JSON.parse(localStorage.getItem("jwt-security-page")));
  }, []);

  return (
    <ContextMovie>
      <Navb />
      <AppRouter tok={tok}/>
    </ContextMovie>
  );
}

export default App;
