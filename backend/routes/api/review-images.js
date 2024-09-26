const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser,requireAuth } = require('../../utils/auth');
const { Review, ReviewImage} = require('../../db/models');
const router = express.Router();





/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Delete a Review Image

router.delete('/:imageId',requireAuth, async (req, res) => {
    const { imageId } = req.params;
    const loggedInUserId = req.user.dataValues.id;
    const reviewImageToDelete = await ReviewImage.findByPk(imageId);
    const reviewImageReview = reviewImageToDelete.dataValues.reviewId
    reviewOwnerRecord = await Review.findByPk(reviewImageReview);
    reviewOwnerNum = reviewOwnerRecord.dataValues.userId;

    try {
      
      if (!reviewImageToDelete) {
        return res.status(404).json({ message: "Review Image couldn't be found"});
      }
      // if loggedIn User owns the review
      if (loggedInUserId === reviewOwnerNum) {
        await reviewImageToDelete.destroy();
        return res.status(200).json({ message: 'Successfully deleted'});
      }
      
    } catch (error) {
  
      console.error(error);
      return res.status(500).json({ message: 'Internal server error'});
    }
  
  });
  

  module.exports = router;