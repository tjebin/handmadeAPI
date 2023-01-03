// const { permittedCrossDomainPolicies } = require('helmet');
const CustomErr = require('../errors');
const { isTokenValid } = require('../utils/jwt');

const authenticateUser = async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        throw new CustomErr.UnauthenticatedError('Authentication Invalid');
    }

    try {
        const { payload } = isTokenValid(token);
        const { name, userId, role } = payload;

        req.user = { name, userId, role };
        next();

    } catch (error) {
        throw new CustomErr.UnauthenticatedError('Authentication Invalid');
    }
}

const authorizePermissions = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            throw new CustomErr.UnAuthorizedError('Unauthorized to access this route');
        }
        next();
    }
}

module.exports = {
    authenticateUser,
    authorizePermissions
}