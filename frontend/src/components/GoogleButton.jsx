import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { saveUserToDatabase } from "../api/userService";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa"; // Ícono de Google
import "../styles/AuthStyles.css"; // Importa los estilos para una mejor UI

const GoogleButton = () => {
    const provider = new GoogleAuthProvider();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
            await saveUserToDatabase({ uid:user.uid, email:user.email, createdAt:user.metadata.creationTime });
            
            console.log("Login exitoso.");
            navigate("/");
        } catch (error) {
            if (error.response) {
                // Error del backend
                if(error.response.data.em){
                    navigate("/");
                }
                console.log("Error en el backend:", error.response.data.message);
            } else if (error.request) {
                // Problema de red
                console.log("Problema de red:", error.request);
            } else {
                // Otro error
                console.log("Error:", error.message);
            }
        }
    };

    return (
        <button onClick={handleGoogleSignIn} className="google-button">
            <FaGoogle className="google-icon" />
            Iniciar sesión con Google
        </button>
    );
};

export default GoogleButton;