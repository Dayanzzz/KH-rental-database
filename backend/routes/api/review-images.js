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

router.delete('/:imageId',requireAuth,handleValidationErrors, async (req, res, next) => {
    const { imageId } = req.params;
    console.log('=======================IN ROUTE HANDLER============================');
    console.log('===========REQ.USER==================');
    console.log(req.user);
    
    const loggedInUserId = req.user.dataValues.id;
    
    try {
      const reviewImageToDelete = await ReviewImage.findByPk(imageId);

      if (!reviewImageToDelete) {
        return res.status(404).json({ message: "Review Image couldn't be found" });
      }

      const reviewOfImage = reviewImageToDelete.reviewId;
      const findReview = await Review.findByPk(reviewOfImage);

      if (!findReview) {
        return res.status(404).json({ message: "Bad Request"});
      }

      const reviewOwnerNum = findReview.userId; 

      console.log('========Start==============');
      console.log('========loggedInUserId==============');
      console.log(loggedInUserId);
      console.log('========reviewOwnerNum==============');
      console.log(reviewOwnerNum);
      console.log('========reviewImageToDelete==============');
      console.log(reviewImageToDelete);
      console.log('========End==============');

      if (loggedInUserId !== reviewOwnerNum) {
        const err = new Error('Forbidden');
        err.status = 403;
        err.errors = { message: 'Body validation error' };
        return next(err);
      } 

      if (loggedInUserId === reviewOwnerNum) {
      await reviewImageToDelete.destroy();
      return res.status(200).json({ "message": "Successfully deleted"});
      }
      

  }catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  });

  module.exports = router;