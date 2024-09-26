const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser,requireAuth } = require('../../utils/auth');
const { Spot, User, Review , SpotImage } = require('../../db/models');
const router = express.Router();


router.delete('/:imageId', requireAuth, async (req,res)=>{
    const {imageId} = req.params;
      
        try {
          const imageToDelete = await SpotImage.findByPk(imageId);
          
          if (!imageToDelete) {
            return res.status(404).json({ message: "Spot image couldn't found"});
          }
          await imageToDelete.destroy();
          return res.status(200).json({ message: 'Successfully deleted'}); 
        } catch (error) {
      
          console.error(error);
          return res.status(500).json({ message: 'Internal server error'});
        }
    
});

module.exports = router;