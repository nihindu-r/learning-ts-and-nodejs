const mongoose = require('mongoose');
require('dotenv').config()

console.log(process.env.DB_URL)
async function dbConnect(){
    mongoose.connect(process.env.DB_URL, {
        useNewURLParser : true,
        useUnifiedTopology : true
    }).then(
        () => {console.log('Successfully connected to MongoDB Atlas')}
    ).catch(
        (error) => {
            console.log('Unable to connect to MongoDB')
            console.log(error)
        }
    )

}

module.exports = dbConnect;