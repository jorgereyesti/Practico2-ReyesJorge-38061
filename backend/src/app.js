const express = require('express');
const morgan = require('morgan');
const routerStudents = require('./routes/studentRoute');
const userRoutes = require("./routes/userRoute");
const errorHandler = require("./middleware/errorHandler");
const cors = require('cors');
require('./config/setupModel');
require("dotenv").config();
const app = express();


//Settings
app.set('port',3000);
app.use(cors()); //evitar bloqueo y permitir todas las solicitudes (ojo)
app.use(morgan('dev'));
app.use(express.json());
//routes
app.use('/api/users', userRoutes);
app.use('/api/students',routerStudents);

//manejo de error con el servidor
app.use(errorHandler);

app.use((req, res) => {
    res.send(`No se encontro tu pagina`);
});
//Connection
app.listen(app.get('port'));
console.log(`Connection in port ${app.get('port')}`);

