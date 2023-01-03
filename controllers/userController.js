
const User = require('../models/Users');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const { response } = require('express');
const { createTokenUser } = require('../utils/createTokenUser');
const { attachCookiesToResponse } = require('../utils/jwt');
const { checkPermissions } = require('../utils');

const getAllUsers = async (req, res) => {
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
    const { name, email, gender } = req.body;

    if (!name || !email) {
        throw new CustomError.BadRequestError('please provide name and email');
    }
    const user = await User.findOne({ _id: req.user.userId });

    checkPermissions(req.user, user._id);

    user.email = email;
    user.name = name;
    user.gender = gender;

    await user.save();

    // const tokenUser = createTokenUser(user);
    // attachCookiesToResponse({ res, user: tokenUser });
    res.status(StatusCodes.OK).json({ user: user });
}


const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        throw new CustomError.BadRequestError('please provide both values');
    }

    const user = await User.findOne({ _id: req.user.userId });
    checkPermissions(req.user, user._id);


    const isPasswordCorrect = await user.comparePassword(oldPassword);

    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }

    user.password = newPassword;

    await user.save();

    res.status(StatusCodes.OK).json({ msg: 'Success! Password updated' });
}


const deleteUser = async (req, res) => {
    const { id: userId } = req.params;
    const user = await User.findOne({ _id: userId });
    checkPermissions(req.user, user._id);

    if (!user) {
        throw new CustomError.NotFoundError(`No user with id : ${userId}`);
    }

    await user.remove();
    res.status(StatusCodes.OK).json({ msg: 'Success || User Removed' })

}

module.exports = {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword,
    deleteUser
}