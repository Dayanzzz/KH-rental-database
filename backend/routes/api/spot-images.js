const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser,requireAuth } = require('../../utils/auth');
const { Spot, User, Review , SpotImage } = require('../../db/models');
const router = express.Router();

//DELETE a spot image
router.delete('/:imageId', requireAuth,handleValidationErrors, async (req, res, next)=>{
    const {imageId} = req.params;
    const loggedInUserId = req.user.dataValues.id;
    const imageToDelete = await SpotImage.findByPk(imageId);
    const SpotIdOfImage = imageToDelete.spotId;
    const findOwner = await Spot.findByPk(SpotIdOfImage);
    const ownerNum = findOwner.ownerId;
    
    if (!imageToDelete || imageToDelete === null) {
      return res.status(404).json({ message: "Spot Image couldn't be found"});
    }

    // console.log('--------------============--------------------');
    // console.log(loggedInUserId);
    // console.log('--------------============--------------------');
    // console.log('--------------imageToDelete--------------------');
    // console.log(imageToDelete);
    // console.log('--------------============--------------------');
    // console.log('--------------SpotIdOfImage--------------------');
    // console.log(SpotIdOfImage);
    // console.log('--------------============--------------------');
    // console.log('--------------findOwner--------------------');
    // console.log(findOwner);
    // console.log('--------------============--------------------');
    // console.log('--------------ownerNum--------------------');
    // console.log(ownerNum);
    // console.log('--------------============--------------------');

        try {

          if (ownerNum === loggedInUserId) {
            await imageToDelete.destroy();
            return res.status(200).json( {message: 'Successfully deleted'}); 
          } else {
            const err = new Error('Forbidden');
            err.status = 403;
            err.errors = { message: 'Body validation error' };
            return next(err);
          }
          
          
        } catch (error) {
      
          console.error(error);
          return res.status(404).json({ message: 'Spot Image couldn\'t be found'});
        }
    
});

module.exports = router;