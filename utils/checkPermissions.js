const CustomError = require('../errors');


// resourceUserId - from parameter
const checkPermissions = (requestUser, resourceUserId) => {
    console.log(requestUser.userId + " - " + resourceUserId);
    if (requestUser.role === 'admin') return;

    if (requestUser.userId == resourceUserId) return
    throw new CustomError.UnAuthorizedError('Not authorized to access this role');
};

module.exports = checkPermissions;

