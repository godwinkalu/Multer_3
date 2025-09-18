const productmodel = require('../models/productModels')
const fs =  require('fs')
exports.addProduct = async (req,res)=>{

  try {
    const {productName, description, quantity ,price}=req.body
    const productExist  =  await productmodel.findOne({productName});
    if (productExist) {
      return res.status(400).json({
        message:'product already exist'
      })
    }
    const files = req.files;
    const imagePaths =  files.map ((element)=>element.path)

    const product = new productmodel({
      productName,
      description,
      quantity,
      price,
      images: imagePaths
    })
    product.save()
    res.status(201).json({
      message:'product successfully created',
      data: product
    })
  } catch (error) {
    res.status(500).json({
      message:error.message
    })
  }
}
exports.getAll = async(req,res)=>{

  try {
    const allproduct = await productmodel.find()
    res.status(200).json({
      message:`All product in the database and the total is: ${allproduct.length}`,
      data:allproduct
    })
    
  } catch (error) {
    res.status(500).json({
      message:error.message
    })
  }
}
exports.getOne =  async (req,res)=>{

  try {
    const {id}=req.params
    const product = await productmodel.findById(id)
    if (!product) {
      return res.status(404).json({
        message:'product not found'
      })
    }
    res.status(200).json({
      message:'product found',
      data:product
    })
  } catch (error) {
   res.status(500).json({
    message:error.message
   }) 
  }
}
exports.updateProduct = async (req,res)=>{
 
  try {
    const{id}= req.params
    const {productName,description,quantity,price}=req.body
    const  product = await productmodel.findById(id)
    if (!product) {
      return res.status(400).json({
        message:'product not found'
      })
    }
    
    const data = {
      productName: productName || product?.productName,
      description: description || product?.description,
      quantity:quantity        || product?.quantity,
      price:price              || product?.price,
      images: product.images
    };
    const oldFilePath = product.images;

    const imagePath = req.files.map
    ((element)=> element.path);

    if (req.files && req.files[0]) {
      oldFilePath.forEach((element)=>{
        const fileCheck = fs.existsSync(element)
          console.log(fileCheck);
          
      })
        
      data.images = imagePath
      
    }
     
    const updatedProduct = await productmodel.findByIdAndUpdate(id,data,{new:true});

     res.status(200).json({
      message:'product updated',
      data:updatedProduct
    })
    
  } catch (error) {
     res.status(500).json({
      message:error.message
    })
  }
}
exports.updateSpecificFile = async (req, res) => {
  try {
    const { id, index } = req.params;
    const { productName, quantity, description, price } = req.body;

    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({
        message: 'product does not exist'
      });
    }

    const fileindex = parseInt(index, 10);

    // Check if index is valid
    if (fileindex < 0 || fileindex >= product.images.length) {
      return res.status(400).json({
        message: 'Invalid index. Please provide a valid image index'
      });
    }

    // Delete old file
    const oldImagePath = product.images[fileindex];
    if (fs.existsSync(oldImagePath)) {
      fs.unlinkSync(oldImagePath);
    }

    product.images[fileindex] = req.files[0].path;

    const data = {
      productName: productName || product.productName,
      quantity: quantity || product.quantity,
      description: description || product.description,
      price: price || product.price,
      images: product.images, 
    };

    const updatedProduct = await productmodel.findByIdAndUpdate(id, data, { new: true });

    res.status(200).json({
      message:' Image at index ${fileindex} updated successfully',
      data: updatedProduct
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
exports.deleteProduct = async (req,res)=>{

  try {
    const {id} = req.body;
    const deletedproduct = await productmodel.findByIdAndDelete(id)
    const oldFilePath = deletedproduct.images
    if (oldFilePath && oldFilePath.length > 0) {
      oldFilePath.forEach((el)=>{
        const fileCheck = fs.existsSync(el)
        if (fileCheck) {
          fs.unlinkSync(element)
        }
        console.log(fileCheck);
        
      })
    }
    res.status(200).js
  } catch (error) {
    res.status(500).json({
      message:error.message
    })
  }
}