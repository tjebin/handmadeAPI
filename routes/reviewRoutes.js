const express = require('express');
const router = express.Router();
const { authenticateUser, authorizePermissions } = require('../middleware/authentication');

const {
    createReview,
    getAllReviews,
    getSingleReview,
    updateReview,
    deleteReview
} = require('../controllers/reviewController');

router.route('/').get(getAllReviews);
router.route('/').post(authenticateUser, authorizePermissions('admin'), createReview);
router.route('/:id').patch(authenticateUser, authorizePermissions('admin'), updateReview);
router.route('/:id').delete(authenticateUser, authorizePermissions('admin'), deleteReview);
router.route('/:id').get(getSingleReview);

module.exports = router;