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

//Create a Spot
router.post('/', async (req, res) => {
  try {
    const {address, city, state, country, lat, lng, name, description, price, ownerId} = req.body;

    if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price ) {
      return res.status(400).json({message: 'All fields are required.'});
    }
    const newSpot = await Spot.create({ address, city, state, country, lat, lng, name, description, price, ownerId });
      res.status(201).json(newSpot);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error:'Internal Server Error' });
  }




});
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


// Delete a spot
router.delete('/:spotId', async (req, res) => {
  const { spotId } = req.params;

  try {
    const spotToDelete = await Spot.findByPk(spotId);
    
    if (!spotToDelete) {
      return res.status(404).json({ message: 'Spot not found'});
    }
    await spotToDelete.destroy();
    return res.status(200).json({ message: 'Spot deleted successfully'}); 
  } catch (error) {

    console.error(error);
    return res.status(500).json({ message: 'Internal server error'});
  }

});