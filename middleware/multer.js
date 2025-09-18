const multer = require('multer')

const storage = multer.diskStorage({
   destination: (req,files,cb)=>{
    cb(null,'./uploads')
   },
   filename: (req,files,cb)=>{
    const randomNumber = Math.floor(Math.random()*100)
    const ext = files.mimetype.split('/')[1]
    const uniqueExt = `IMG_${Date.now()}.${randomNumber}.${ext}`
    cb(null,uniqueExt)
   }
});
const fileFilter = (req,file,cb)=>{
  if (file.mimetype.startsWith('image/')) {
    cb(null,true)
  }else{
    cb(new Error('Invaild file formate, only image file allowed'))
  }
}

const limits ={
  filesize: 1024 * 1024 * 1
}

const uploads = multer({
  storage,
  fileFilter,
  limits
})
module.exports = uploads