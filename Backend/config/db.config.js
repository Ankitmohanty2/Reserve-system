const mongoose = require('mongoose');
// const logger = require('../logger/api.logger');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI)
         console.log('DB Connected Successfully...')
     } catch (error) {
         console.log(error)
         console.log('Error In Connection, Please Retry')
     }
}

module.exports = {
    connectDB
}