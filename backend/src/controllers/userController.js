const User = require("../model/user");
const { Sequelize, Op } = require("sequelize");


const createUser = async (req, res, next) => {
    try {
        console.log("data : ", req.body);
        const { uid, email, createdAt } = req.body;
    // Validar que los campos sean proporcionados
    if (!uid || !email) {
        console.log('vacio, no llegan los datos', uid, email, createdAt);
    return res.status(400).json({ message: "Faltan campos requeridos." });
}
    // Verifica si ya existe un usuario con el mismo UID
    const existingUser = await User.findOne({
        where: {
            [Sequelize.Op.or]: [{ email: email }],
        }
    });
    if (existingUser) {
        console.log('ya existe un usuario con este uid', email);
        return res.status(409).json({ message:`El correo electrónico ${email} ya está registrado.` });
    }
    // Crea un nuevo usuario
    const newUser = await User.create({ uid, email, createdAt: new Date(createdAt)});
    res.status(201).json(newUser);
    } catch (error) {
        console.log("error al crear usuario backend", error);
        res.status(500).json({ message: "Error al crear el usuario." });
        next("Error al crear usuario backend",error);
    }
};

module.exports = { createUser };
