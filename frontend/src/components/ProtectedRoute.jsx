import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
const [user, loading] = useAuthState(auth);

if (loading) {
    return <p>Cargando...</p>; 
}
return user ? children : <Navigate to="/login" replace />;
};

// Validación de props
ProtectedRoute.propTypes = {
children: PropTypes.node.isRequired,
};
export default ProtectedRoute;
