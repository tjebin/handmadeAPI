
const User = require('../models/Users');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { response } = require('express');
const { createTokenUser } = require('../utils/createTokenUser');
const { attachCookiesToResponse } = require('../utils/jwt');
const { checkPermissions } = require('../utils');


const getAllUsers = async (req, res) => {
    console.log(" get all users.....");
    console.log(req.user);
    const users = await User.find({ role: 'user' }).select('-password');
    res.status(StatusCodes.OK).json({ users });

}

const getSingleUser = async (req, res) => {
    const user = await User.findOne({ _id: req.params.id }).select('-password');

    if (!user) {
        throw new CustomError.NotFoundError(`No user with id : ${req.params.id}`);
    }

    checkPermissions(req.user, user._id);

    res.status(StatusCodes.OK).json({ user });
}


const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({ user: req.user });
}
// update user with user.save()

const updateUser = async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        throw new CustomError.BadRequestError('please provide name and email');
    }
    const user = await User.findOne({ _id: req.user.userId });

    user.email = email;
    user.name = name;

    await user.save();


    const tokenUser = createTokenUser(user);
    attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.OK).json({ user: tokenUser });

}

// const updateUser = async (req, res) => {
//     const { name, email } = req.body;

//     if (!name || !email) {
//         throw new CustomError.BadRequestError('please provide name and email');
//     }
//     const user = await User.findByIdAndUpdate(
//         { _id: req.user.userId },
//         { email, name },
//         { new: true, runValidators: true }
//     );


//     const tokenUser = createTokenUser(user);
//     attachCookiesToResponse({ res, user: tokenUser });
//     res.status(StatusCodes.OK).json({ user: tokenUser });

//     res.send('update user');
// }

const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        throw new CustomError.BadRequestError('please provide both values');
    }

    const user = await User.findOne({ _id: req.user.userId });

    const isPasswordCorrect = await user.comparePassword(oldPassword);

    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }

    user.password = newPassword;

    await user.save();

    res.status(StatusCodes.OK).json({ msg: 'Success! Password updated' });
}


const deleteUser = async (req, res) => {
    res.send('delete user');
}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword,
    deleteUser
}