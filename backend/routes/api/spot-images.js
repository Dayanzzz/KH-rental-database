const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser,requireAuth } = require('../../utils/auth');
const { Spot, User, Review , SpotImage } = require('../../db/models');
const router = express.Router();


router.delete('/:imageId', requireAuth, handleValidationErrors, async (req,res)=>{
    const {imageId} = req.params;
      const loggedInUserId = req.user.dataValues.id;
       
     
      try {
        
        const imageToDelete = await SpotImage.findByPk(imageId);
        if (!imageToDelete) {
            return res.status(404).json({ message: "Spot Image couldn't be found" });
        }

        
        const spot = await Spot.findByPk(imageToDelete.spotId);
        if (!spot) {
            return res.status(404).json({ message: "Spot couldn't be found" });
        }

        const ownerId = spot.ownerId; 
        console.log('Logged in user ID:', loggedInUserId);
        console.log('Spot owner ID:', ownerId);

    
        if (ownerId === loggedInUserId) {
           
            await imageToDelete.destroy();
            return res.status(200).json({ message: 'Successfully deleted' });
        } else {
            
            return res.status(403).json({ message: 'Forbidden: You do not have permission to delete this image.' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;