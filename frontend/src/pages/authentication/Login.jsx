import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import "../../styles/AuthStyles.css"; // Importa los estilos para una mejor UI
import GoogleButton from "../../components/GoogleButton";

const Login = () => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirige al Home o página principal
    } catch (err) {
    setError("Error al iniciar sesión. Verifica tus credenciales.",err);
    }
};

return (
    <div className="auth-container">
    <h2>Iniciar sesión</h2>
    <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
        <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Ingrese su correo"
        />
        </div>
        <div className="form-group">
        <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Ingrese su contraseña"
        />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn-submit">Iniciar sesión</button>
    <p>
        ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
    </p>
    <GoogleButton />
    </form>
    
    </div>
);
};

export default Login;
