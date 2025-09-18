const router = require('express').Router()
const { addProduct, getAll, getOne, updateProduct } = require('../controller/productController');
const upload = require('../middleware/multer')

router.post('/product',upload.array('images', 4),addProduct)
router.get('/product',getAll)
router.get('/product/:id',getOne)
router.put('/product/:id',upload.array('images', 4), updateProduct)

module.exports = router  