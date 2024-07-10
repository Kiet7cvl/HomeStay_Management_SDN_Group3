const expess = require('express');
const router = expess.Router();
const categoryController = require('../controller/common/Category.controller');

router.get('/category/', categoryController.getAllCategories);
router.get('/category/:id', categoryController.getCategoryById);
router.post('/category/', categoryController.createCategory);
router.put('/:id', categoryController.updateCategory);

module.exports = router;