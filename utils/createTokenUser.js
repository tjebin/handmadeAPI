const createTokenUser = (user) => {
    console.log(' Create token user........');
    return { name: user.name, userId: user._id, role: user.role }
}

module.exports = {
    createTokenUser
}

