import axios from "axios";

export const saveUserToDatabase = async (userData) => {
  try {
    console.log("datos", userData);
    const response = await axios.post("http://localhost:3000/api/users", userData);
    return response.data;
  } catch (err) {
    if (err.response && err.response.status === 409) {
      alert("Bienvenido!: ",err.response.data.message);  // Mensaje de usuario ya existente
    } else {
      alert("Error al registrar usuario, intente nuevamente.");
      throw err;
    }
  }
};