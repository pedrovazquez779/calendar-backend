const express = require('express');
const {dbConnection} = require('./database/config');
const cors = require('cors');
require('dotenv').config();

// Check all the env variables
// console.log(process.env);

// Create server
const app = express();

// DB
dbConnection();

// CORS
app.use(cors());

// Public directory
app.use(express.static('public'));

// Middleware to parse body
app.use(express.json());

// Routes
// app.get('/', (req, res) => {
//     res.json({
//         ok: true
//     });
// });
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));

// Port
app.listen(process.env.PORT, () => {
    console.log(`app running on port ${process.env.PORT}`);
});