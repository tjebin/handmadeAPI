const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const path = require('path');

const { checkPermissions } = require('../utils');

const createProduct = async (req, res) => {
    const requestUserId = req.user.userId;
    req.body.user = requestUserId;

    const product = await Product.create(req.body);
    res.status(StatusCodes.CREATED).json({ product });
}

const getAllProducts = async (req, res) => {
    let products = {};
    products = await Product.find({});

    // if (req.user.role === 'admin') {
    //     products = await Product.find({});
    // } else {
    //     products = await Product.find({ user: req.user.userId });
    // }

    res.status(StatusCodes.OK).json({ products, count: products.length });
}

const getSingleProduct = async (req, res) => {
    const { id: productId } = req.params;

    const product = await Product.findOne({ _id: productId });

    if (!product) {
        throw new CustomError.NotFoundError(`No product with id : ${productId}`);
    }

    checkPermissions(req.user, product.user);

    res.status(StatusCodes.OK).json({ product });
}


const updateProduct = async (req, res) => {
    const { id: productId } = req.params;
    const product = await Product.findOneAndUpdate(
        { _id: productId },
        req.body,
        { new: true, runValidators: true });

    if (!product) {
        throw new CustomError.NotFoundError(`No product with id : ${productId}`);
    }

    res.status(StatusCodes.OK).json({ product });
}


const deleteProduct = async (req, res) => {
    const { id: productId } = req.params;
    const product = await Product.findOne({ _id: productId });

    if (!product) {
        throw new CustomError.NotFoundError(`No product with id : ${productId}`);
    }

    await product.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success || Product Removed' })

}

const uploadImage = async (req, res) => {
    if (!req.files) {
        throw new CustomError.BadRequestError('No File Uploaded');
    } else {
        let uploadedFile = req.files.file;

        if (!uploadedFile.mimetype.startsWith('image')) {
            throw new CustomError.BadRequestError('Please upload a image');
        }

        const maxSize = 1024 * 1024;

        // if (uploadedFile.size > maxSize) {
        //     throw new CustomError.BadRequestError('Please upload image smaller than 1MB ');
        // }

        const imagePath = path.join(__dirname, '../public/uploads/images/');

        uploadedFile.mv(imagePath + uploadedFile.name);

        res.status(StatusCodes.OK).json({ 'image': `/uploads/${uploadedFile.name}` });
    }
}
module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
}