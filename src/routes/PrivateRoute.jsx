import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const PrivateRoute = ({ element, requiredRole }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    const auth = getAuth();

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setUserRole(storedRole); 
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; 
  }

  if (!isAuthenticated || userRole !== requiredRole) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default PrivateRoute;
