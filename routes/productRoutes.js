const express = require('express');
const router = express.Router();
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');

const {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
} = require('../controllers/productController');

router.route('/').get(getAllProducts);
router.route('/').post(authenticateUser, authorizePermissions, createProduct);
router.route('/').patch(authenticateUser, authorizePermissions, updateProduct);
router.route('/:id').delete(authenticateUser, authorizePermissions, deleteProduct);
router.route('/:id').get(getSingleProduct);
router.route('/uploadImage').post(authenticateUser, authorizePermissions, uploadImage);

module.exports = router;