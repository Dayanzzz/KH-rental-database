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























































  router.put('/:spotId', async (req,res)=>{
    const {spotId} = req.params;
    const {address, city, state, country, lat, lng, name, description, price } = req.body;

    const  updatedData = {};  

    if (address !== undefined) updatedData.address = address;
    if (city !== undefined) updatedData.city = city;
    if (state !== undefined) updatedData.state = state;
    if (country !== undefined) updatedData.country = country;
    if (lat !== undefined) updatedData.lat = lat;
    if (lng !== undefined) updatedData.lng = lng;
    if (name !== undefined) updatedData.name = name;
    if (description !== undefined) updatedData.description = description;
    if (price !== undefined) updatedData.price = price;

    if (Object.keys(updatedData).length ===0 ){
      return res.status(400).json({message: "Bad request"});
    }

    const spot = await Spot.findByPk(spotId);
    if (!spot){
      return res.status(404).json({message: "Spot couldn't be found"});
    }
    await spot.update(updatedData);
    res.status(200).json(spot);
  });
  


  module.exports = router;