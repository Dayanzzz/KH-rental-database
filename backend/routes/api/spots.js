// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot, User } = require('../../db/models');
const router = express.Router();

//Get all the Spots
  router.get(
      '/', async (req, res) => {
      try{

        const spots = await Spot.findAll();
        res.status(200).json(spots);

      } catch (error) {

        console.error(error);
        res.status(500).json({message:'error'});

      } 
    }
  );


  //Get all the Spots by spotId
  router.get(
    '/:spotId', async (req, res) => {
      const {spotId} = req.params;

        const spots = await Spot.findAll({
          where: {id: spotId}
        });

     if (spots.length ===0){
      return res.status(404).json({message: "Spot couldn't be found"})
     }
        res.status(200).json(spots);
    }
  );



  module.exports = router;