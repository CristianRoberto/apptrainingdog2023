const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
//const bcrypt = require('bcryptjs');


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });


app.use(cors({ origin: ['http://localhost:5000', 
'http://gamebrag.onrender.com', 
'https://gamebrag.onrender.com'], credentials: true }))


// Analizar solicitudes con express.json y express.urlencoded
app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));

// Routes
app.use(require('./routes/index'));

//configuracion del servidor nodejs
app.listen(5000);
console.log('Server on port',5000);
console.log("estoy ejecutandome");
console.log("Gilces Panta Cristian");


// middlewares
//app.use(express.urlencoded({extended: false}));

