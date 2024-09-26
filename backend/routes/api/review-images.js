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
  
    try {
      const reviewImageToDelete = await ReviewImage.findByPk(imageId);
      
      if (!reviewImageToDelete) {
        return res.status(404).json({ message: "Couldn't find a Review Image with the specified id"});
      }

      await reviewImageToDelete.destroy();
      return res.status(200).json({ message: 'Review Image deleted successfully'}); 
    } catch (error) {
  
      console.error(error);
      return res.status(500).json({ message: 'Internal server error'});
    }
  
  });
  

  module.exports = router;