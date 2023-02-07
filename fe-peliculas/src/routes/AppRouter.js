import React, {useState, useEffect} from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";

function AppRouter({ tok }) {
  const [toke, setToke] = useState([]);
  
  useEffect(() => {
    setToke(JSON.parse(localStorage.getItem("jwt-security-page")));
  }, []);
  return (
    <div>
      <Router>
        <Routes>
          {(toke === [] || toke === null) ? (
            <Route path="/*" element={<PublicRoutes />} />
            ) : (
              <Route path="/*" element={<PrivateRoutes />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default AppRouter;
