import { Navigate } from "react-router-dom";

export const OpenRoutes = ({ children }) => {
  const getTokenFromLocalStorage = localStorage.getItem("token");
  return getTokenFromLocalStorage === null ? (
    children
  ) : (
    <Navigate to="/admin" replace={true} />
  );
};
