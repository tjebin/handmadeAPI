const express = require('express');
const router = express.Router();
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');

const {
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUser,
    updateUserPassword,
    deleteUser } = require('../controllers/userController');

router.route('/').get(authenticateUser, authorizePermissions('admin', 'user'), getAllUsers);
router.route('/showMe').get(showCurrentUser);
router.route('/updateUser').patch(authenticateUser, updateUser);
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword);
router.route('/:id').get(authenticateUser, getSingleUser);
router.route('/:id').delete(authenticateUser, deleteUser);


module.exports = router;