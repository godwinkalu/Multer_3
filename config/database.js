const mongoose = require('mongoose')
require('dotenv').config()
const DB = process.env.MONGODB_URI

mongoose.connect(DB)
.then(()=>{
  console.log(`Database connected successfully`);
  
})
.catch((err)=>{
console.log(`Error in connecting to the database`, err.message);

})