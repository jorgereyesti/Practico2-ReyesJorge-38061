import axios from "axios";

export const saveUserToDatabase = async (userData) => {
  try {
    console.log("datos", userData);
    const response = await axios.post("http://localhost:3000/api/users", userData);
    return response.data;
  } catch (error) {
    console.error("Error al guardar usuario en la base de datos:", error.message);
    throw error;
  }
};