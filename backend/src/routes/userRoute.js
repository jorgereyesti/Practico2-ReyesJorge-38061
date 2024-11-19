const express = require("express");
const { createUser } = require("../controllers/userController");
const router = express.Router();

router.post("/", createUser); // Ruta para crear un usuario usando un controller

module.exports = router;
