const express = require('express')
require('./config/database')
const port = process.env.port || 8877
const productRouter = require('./routes/productRouter')

const app = express()
app.use(express.json())
app.use(productRouter)


app.listen(port, ()=>{
  console.log(`my server is running on port: ${port}`);
  
})