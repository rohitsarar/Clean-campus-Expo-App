
import { useNavigation } from "expo-router";
import { useAuthContext } from "./AuthContext";

const ProtectedRoute = ({ roleRequired, children }) => {
  const { user } = useAuthContext();
const navigator=useNavigation()
  // If the user is not authenticated, redirect to the login page
  if (!user) {
    return <navigator to="/login" replace />;
  }

  // If the user's role doesn't match the required role, redirect based on their role
  if (user.role !== roleRequired) {
    return <Navigate to={`/${authUser.role === "admin" ? "admin" : authUser.role === "peon" ? "peonhome" : "home"}`} replace />;
  }

  // If everything is okay, render the children (protected route content)
  return children;
};

export default ProtectedRoute;
