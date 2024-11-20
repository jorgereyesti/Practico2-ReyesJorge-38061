import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { saveUserToDatabase } from "../../api/userService";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.css"; // Importa los estilos para una mejor UI

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        setError("Las contraseñas no coinciden.");
        return;
    }
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        //enviar datos
        console.log("usuario: ", user);
        await saveUserToDatabase({ uid:user.uid, email:user.email, createdAt:user.metadata.creationTime });
        setError(""); // Limpia el error al registrar correctamente el usuario
        alert("Usuario registrado y guardado en la base de datos.");
        navigate("/"); // Redirige a la página principal después del registro
    } catch (error) {
        //manejo de errores con firebase.
        if (error.code === 'auth/email-already-in-use') {
            setError('El correo ya está en uso.');
        } else if (error.code === 'auth/invalid-email') {
            setError('El formato del correo es inválido.');
        } else if (error.code === 'auth/weak-password') {
            setError('La contraseña es demasiado débil.');
        } else {
            setError('Error desconocido al registrar el usuario.');
        }
        console.error('Error al registrar usuario:', error);
    }
    };

    return (
    <div className="auth-container">
        <h2>Registro de Usuario</h2>
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
        <div className="form-group">
            <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirma tu contraseña"
            />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="btn-submit">Crear cuenta</button>
        </form>
        <br></br>
        <p>
        ¿Ya tienes cuenta? <a href="/login">Inicia sesión aquí</a>
        </p>
    </div>
    );
};
export default Register;