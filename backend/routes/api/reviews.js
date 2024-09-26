// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser,requireAuth } = require('../../utils/auth');
const { Review, ReviewImage, Spot, User } = require('../../db/models');
const router = express.Router();


/////////////////////


//Get all Reviews owned by logged in user
router.get('/current',requireAuth, async (req, res) => {
    console.log(req.user.dataValues.id);
    
    const loggedInUserId = req.user.dataValues.id;
    try {
    const reviews = await Review.findAll({
      where: {
        userId: loggedInUserId
      }
    });

    const spots = await Spot.findAll({
        where: {
            ownerId: loggedInUserId
        }
    });

    // const spotIds = spots.id; // Get the spot ids from the spots call
    // console.log(spotIds);
    

    const reviewImages = await Spot.findAll({
        where: {
            ownerId: loggedInUserId
        }
    });

    res.status(200).json({reviews, spots, reviewImages});
  
    } catch(error) {
      console.error(error);
      res.status(500).json({ error: error.message })
    }
  });
  
  
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
// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//   //Create a Review for a Spot based on Spot's id
  
//   router.post('/:spotId',requireAuth, async (req, res) => {
//     const { spotId } = req.params; 
//     const loggedInUserId = req.user.dataValues.id;

//     try {
//       const {review, stars} = req.body;
  
//       if (!review || !stars ) {
//         return res.status(400).json({message: 'All fields are required.'});
//       }
//       const newReview = await Review.create({ spotId, userId:loggedInUserId, review, stars});
//         res.status(201).json(newReview);
  
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error:'Internal Server Error' });
//     }
  
  
  
  
//   });
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   //REMOVE FROM REVIEWS 
  
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
  // Edit a Review
  
    router.put('/:reviewId',requireAuth, async (req,res)=>{
      const {reviewId} = req.params;
      const { review, stars } = req.body;
  
      const  updatedData = {};  
  
      if (review !== undefined) updatedData.review = review;
      if (stars !== undefined) updatedData.stars = stars;
  
      if (Object.keys(updatedData).length ===0 ){
        return res.status(400).json({message: "Body validation errors"});
      }

      const reviewExists = await Review.findOne({
        where: {
          id: reviewId
        }
      });
      
      if (!reviewExists){
        return res.status(404).json({message: "Couldn't find a Review with the specified id"});
      }

      await Review.update(updatedData, {
        where:{ id: reviewId }
      });

      const updatedReview = await Review.findOne({
        where: {
            id: reviewId
        }
      })
      res.status(200).json(updatedReview);
    });
    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Delete a Review
  
  router.delete('/:reviewId',requireAuth, async (req, res) => {
    const { reviewId } = req.params;
    const loggedInUserId = req.user.dataValues.id;
  
    try {
      const reviewToDelete = await Review.findByPk(reviewId);
      const reviewOwner = reviewToDelete.userId;  

      if (!reviewToDelete) {
        return res.status(404).json({ message: "Couldn't find a Review with the specified id"});
      }

      // if current logged in user id is equal to review user id
      if (loggedInUserId === reviewToDelete.userId) {
        await reviewToDelete.destroy();
        return res.status(200).json({ message: 'Successfully deleted'}); 
      }

    } catch (error) {
  
      console.error(error);
      return res.status(500).json({ message: 'Internal server error'});
    }
  
  });
  
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Add an IMAGE to a REVIEW based on Review's id
  
  router.post('/:reviewId/images',requireAuth, async (req, res) => {
    const { reviewId } = req.params;
    const { url } = req.body;
    const loggedInUserId = req.user.dataValues.id;

    const reviewExists = await Review.findByPk(reviewId);
    if (!reviewExists){
      return res.status(404).json({message: "Couldn't find a Review with the specified id"});
    }

    // find all reviewImages entries by provided review id
    const numOfReviewImages = await ReviewImage.findAll({
        where: {
            reviewId:reviewId
        }
    })

    if (numOfReviewImages.length >= 10){ // see if there are more reviewImages than allowed
        return res.status(404).json({message: "Cannot add more than 10 images per resource"});
    }
    
    try {
      const newReviewImage = await ReviewImage.create({ reviewId, url});
      console.log(newReviewImage);

      createdImage = await ReviewImage.findOne({ 
        attributes: ['id','url'],
        where:{
            url: url
        }
    })
      
    res.status(201).json(createdImage);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error:'Internal Server Error' });
    }
  
  });

  ////////////////////////////////////////////////////////////////////////////////////////


module.exports = router;