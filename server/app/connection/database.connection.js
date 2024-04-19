var mongoose = require('mongoose');

const connectDB = async(DATABASE_URL) =>{
    try
    {
        const DB_OPTIONS ={
            dbname:'Sulok_task'
        }
        await mongoose.connect(DATABASE_URL,DB_OPTIONS);
        console.log('Connected Succesfully');
    }
    catch(error)
    {
        console.log(error);
    }
}

module.exports = connectDB;
