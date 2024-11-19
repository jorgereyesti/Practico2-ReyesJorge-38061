import PropTypes from "prop-types";
import { useForm } from "react-hook-form";

const AuthForm = ({ onSubmit, isRegister }) => {
const { register, handleSubmit, formState: { errors } } = useForm();

return (
    <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
    <div>
        <label>Email:</label>
        <input
        type="email"
        {...register("email", { required: "El email es obligatorio" })}
        />
        {errors.email && <span>{errors.email.message}</span>}
    </div>
    <div>
        <label>Contraseña:</label>
        <input
        type="password"
        {...register("password", { required: "La contraseña es obligatoria" })}
        />
        {errors.password && <span>{errors.password.message}</span>}
    </div>
    {isRegister && (
        <div>
        <label>Nombre:</label>
        <input
            type="text"
            {...register("name", { required: "El nombre es obligatorio" })}
        />
        {errors.name && <span>{errors.name.message}</span>}
        </div>
    )}
    <button type="submit">{isRegister ? "Registrarse" : "Iniciar sesión"}</button>
    </form>
);
};

AuthForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isRegister: PropTypes.bool,
};

export default AuthForm;