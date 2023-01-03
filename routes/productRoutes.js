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
router.route('/').post(authenticateUser, createProduct);
router.route('/:id').patch(authenticateUser, updateProduct);
router.route('/:id').delete(authenticateUser, deleteProduct);
router.route('/:id').get(authenticateUser, getSingleProduct);
router.route('/uploadImage').post(authenticateUser, uploadImage);

// router.route('/uploadImage').post(authenticateUser, authorizePermissions('user'), uploadImage);

module.exports = router;