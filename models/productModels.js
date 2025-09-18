const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  productName:{
    type:String,
    required:true
  },
  description:{
    type:String,
    required:true
  },
  price:{
    type:Number,
    required:true
  },
  quantity:{
    type:Number,
    required:true
  },
  images:[{
    type:String,
    required:true

  }]
}, {timestamps:true});

const productmodel = mongoose.model('products', productSchema)

module.exports = productmodel