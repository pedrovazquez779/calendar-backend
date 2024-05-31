const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        console.log("ENV VAR: " + process.env.DB_CNN);
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB Online');
    } catch (e) {
        console.log(e);
        throw new Error('Error trying to connect to DB');
    }
};

module.exports = {
    dbConnection
};