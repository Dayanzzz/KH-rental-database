// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser,requireAuth } = require('../../utils/auth');
const { Review, User } = require('../../db/models');
const router = express.Router();


/////CHANGE EVERYTHING FOR REVIEWS////////////////


//Get all Reviews owned by logged in user
router.get('/current',requireAuth, async (req, res) => {
    console.log(req.user.dataValues.id);
    
    const loggedInUserId = req.user.dataValues.id;
    try {
    const reviews = await Review.findAll({
      where: {
        userId: loggedInUserId
      }
    })
    res.status(200).json(reviews);
  
    } catch(error) {
      console.error(error);
      res.status(500).json({ error: error.message })
    }
  })
  
  
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Create a Review for a Spot based on Spot's id
  
  router.post('/:spotId',requireAuth, async (req, res) => {
    const { spotId } = req.params; 
    const loggedInUserId = req.user.dataValues.id;

    try {
      const {review, stars} = req.body;
  
      if (!review || !stars ) {
        return res.status(400).json({message: 'All fields are required.'});
      }
      const newReview = await Review.create({ spotId, userId:loggedInUserId, review, stars});
        res.status(201).json(newReview);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error:'Internal Server Error' });
    }
  
  
  
  
  });
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
  
  
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // edit a spot 
  
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
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Delete a Review
  
  router.delete('/:reviewId', async (req, res) => {
    const { reviewId } = req.params;
  
    try {
      const reviewToDelete = await Review.findByPk(reviewId);
      
      if (!reviewToDelete) {
        return res.status(404).json({ message: 'Review not found'});
      }
      await reviewToDelete.destroy();
      return res.status(200).json({ message: 'Review deleted successfully'}); 
    } catch (error) {
  
      console.error(error);
      return res.status(500).json({ message: 'Internal server error'});
    }
  
  });
  
  ////////////////////////////////////////////////////////////////////////////////////////






















































module.exports = router;