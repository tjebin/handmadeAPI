const CustomError = require('../errors');


// resourceUserId - from parameter
const checkPermissions = (requestUser, resourceUserId) => {
    // console.log(requestUser);
    // console.log(resourceUserId);
    // console.log(typeof resourceUserId);

    if (requestUser.role === 'admin') return;

    if (requestUser.userID === resourceUserId) return
    throw new CustomError.UnAuthorizedError('Not authorized to access this role');

};

module.exports = checkPermissions;

