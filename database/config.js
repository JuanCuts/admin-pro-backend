// getting-started.js
const mongoose = require('mongoose');

const dbConection = async ()=> {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB online')
    } catch (error) {
        throw new Error('Error al iniciar la DB');
    }
    
}

module.exports = {
    dbConection
}