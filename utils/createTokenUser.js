const createTokenUser = (user) => {
    const userId = user._id.toString();
    return { name: user.name, userId, role: user.role, gender: user.gender }
}

module.exports = {
    createTokenUser
}

