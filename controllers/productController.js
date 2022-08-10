
const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

const { checkPermissions } = require('../utils');



const createProduct = async (req, res) => {
    checkPermissions(req.user, user._id);

    const { name, price, description, image, category, company, colors, featured, freeShipping, inventory, averageRating } = req.body;
    // const { email, name, password } = req.body;
    // const emailExists = await User.findOne({ email });
    // if (emailExists) {
    //     throw new CustomError.BadRequestError('Email already exists');
    // }

    const product = await Product.create({ name, price, description, image, category, company, colors, featured, freeShipping, inventory, averageRating, user: req.user.userId });
    res.status(StatusCodes.CREATED).json({ product });
}

const getAllProducts = async (req, res) => {
    const products = await Product.find({});
    res.status(StatusCodes.OK).json({ products });

}

const getSingleProduct = async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id });

    if (!product) {
        throw new CustomError.NotFoundError(`No product with id : ${req.params.id}`);
    }

    res.status(StatusCodes.OK).json({ product });
}


// update user with user.save()

const updateProduct = async (req, res) => {
    checkPermissions(req.user, user._id);

    const { name, price, description, image, category, company, colors, featured, freeShipping, inventory, averageRating } = req.body;


    // const { name, email } = req.body;

    // if (!name || !email) {
    //     throw new CustomError.BadRequestError('please provide name and email');
    // }
    // const user = await User.findOne({ _id: req.user.userId });

    // user.email = email;
    // user.name = name;

    // await user.save();


    // const tokenUser = createTokenUser(user);
    // attachCookiesToResponse({ res, user: tokenUser });
    // res.status(StatusCodes.OK).json({ user: tokenUser });

}


const deleteProduct = async (req, res) => {
    checkPermissions(req.user, user._id);
    const product = await Product.findByIdAndDelete({ _id: req.params.id });
    res.status(StatusCodes.OK).json({ msg: 'User got deleted' });
}

const uploadImage = async (req, res) => {
    checkPermissions(req.user, user._id);

    res.send('delete user');
}
module.exports = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    uploadImage
}