// backend/routes/api/session.js
const express = require('express');
const { Op, ValidationError } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser,requireAuth } = require('../../utils/auth');
const { Spot, User, Review , SpotImage, ReviewImage } = require('../../db/models');
const { now } = require('sequelize/lib/utils');
const router = express.Router();

async function getAverageRating(spotId){
  const reviews = await Review.findAll({where:{spotId}});
  if (reviews.length===0){
    return 0;
  }
  const totalRating= reviews.reduce((sum,review)=> sum+ review.stars,0);
  return totalRating /reviews.length;
}

async function getPreviewImage(spotId){
  const image = await SpotImage.findOne({where:{spotId},
  attribues:['url']});
  if (image){
    return image.url;
  } else{
    return null;
  }
}

async function getNumReviews(spotId){
  const reviews = await Review.findAll({where:{spotId}});
  return reviews.length;
}

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Get all the Spots

router.get('/',handleValidationErrors, async (req, res, next) => {
  let { page = 1, size = 20, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

  // Parse query parameters
  page = parseInt(page) || 1;
  size = parseInt(size) || 20;

  const errors = {};

  // Validate page and size
  if (page < 1) errors.page = "Page must be greater than or equal to 1";
  if (size < 1 || size > 20) errors.size = "Size must be between 1 and 20";

  // Latitude validation
  if (minLat !== undefined) {
    minLat = parseFloat(minLat);
    if (isNaN(minLat) || minLat < -90 || minLat > 90) {
      errors.minLat = "Minimum latitude is invalid";
    }
  }
  if (maxLat !== undefined) {
    maxLat = parseFloat(maxLat);
    if (isNaN(maxLat) || maxLat < -90 || maxLat > 90) {
      errors.maxLat = "Maximum latitude is invalid";
    }
  }

  // Longitude validation
  if (minLng !== undefined) {
    minLng = parseFloat(minLng);
    if (isNaN(minLng) || minLng < -180 || minLng > 180) {
      errors.minLng = "Minimum longitude is invalid";
    }
  }
  if (maxLng !== undefined) {
    maxLng = parseFloat(maxLng);
    if (isNaN(maxLng) || maxLng < -180 || maxLng > 180) {
      errors.maxLng = "Maximum longitude is invalid";
    }
  }

  // Price validation
  if (minPrice !== undefined) {
    minPrice = parseFloat(minPrice);
    if (isNaN(minPrice) || minPrice < 0) {
      errors.minPrice = "Minimum price must be greater than or equal to 0";
    }
  }
  if (maxPrice !== undefined) {
    maxPrice = parseFloat(maxPrice);
    if (isNaN(maxPrice) || maxPrice < 0) {
      errors.maxPrice = "Maximum price must be greater than or equal to 0";
    }
  }

  // Return errors if any
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ 
      message: "Bad Request", 
      errors 
    });
  }

  try {
    const spots = await Spot.findAll({
      limit: size,
      offset: size * (page - 1),
    });
    
    if (!spots) {
      const err = new Error("Bad Request");
      err.status = 400;
      err.errors = { message: "Bad Request" };
      return next(err);
    }

    const responseSpots = await Promise.all(spots.map(async (spot) => {
      const avgRating = await getAverageRating(spot.id);
      const previewImage = await getPreviewImage(spot.id);

      return {
        id: spot.id,
        ownerId: spot.ownerId,
        address: spot.address,
        city: spot.city,
        state: spot.state,
        country: spot.country,
        lat: spot.lat,
        lng: spot.lng,
        name: spot.name,
        description: spot.description,
        price: spot.price,
        createdAt: spot.createdAt,
        updatedAt: spot.updatedAt,
        avgRating,
        previewImage,
      };
    }));

    // Include page and size in the response
    res.status(200).json({
      Spots: responseSpots,
      page,
      size,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

//Get all spots owned by logged in user
router.get('/current',requireAuth, async (req, res) => {
  // console.log(req.user.dataValues.id);
  
  const userId = req.user.dataValues.id;
  try {
  const spots = await Spot.findAll({
    where: {
      ownerId: userId
    }
    
  })
  const currentSpots = [];
  for (const spot of spots){

    const avgRating = await getAverageRating(spot.id);
    const previewImage = await getPreviewImage(spot.id);
    
   currentSpots.push({ 
    id: spot.id,
    ownerId: spot.ownerId,
    address: spot.address,
    city: spot.city,
    state: spot.state,
    country: spot.country,
    lat: spot.lat,
    lng: spot.lng,
    name: spot.name,
    description: spot.description,
    price: spot.price,
    createdAt: spot.createdAt,
    updatedAt: spot.updatedAt,
    avgRating, 
    previewImage});
   }
  res.status(200).json({Spots: currentSpots});

  } catch(error) {
    console.error(error);
    res.status(500).json({ error: error.message })
  }
});

  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Get the Spot by spotId

  router.get(
    '/:spotId', async (req, res) => {
      const {spotId} = req.params;

        const spot = await Spot.findByPk(spotId, {
          include:[
            {
              model:SpotImage,
              as: 'spotImages',
              attributes: {exclude:['spotId','createdAt', 'updatedAt']}
          },
        {
          model: User,
          as:'owner',
          attributes:{exclude:['username', 'email','hashedPassword','createdAt', 'updatedAt']}
        }]
        });

     if (!spot){
      return res.status(404).json({message: "Spot couldn't be found"})
     }
     const numReviews = await getNumReviews(spotId);
     const avgStarRating = await getAverageRating(spotId);
     const response = {
      id: spot.id,
      ownerId: spot.ownerId,
      address: spot.address,
      city: spot.city,
      state: spot.state,
      country: spot.country,
      lat: spot.lat,
      lng: spot.lng,
      name: spot.name,
      description: spot.description,
      price: spot.price,
      createdAt: spot.createdAt,
      updatedAt: spot.updatedAt,
      numReviews,
      avgStarRating,
      SpotImages: spot.spotImages,
      Owner: spot.owner 
    };

        res.status(200).json(response);
    }
  );


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Create a Spot

router.post('/', requireAuth, async (req, res) => {
  try {
    const userId = req.user.dataValues.id;

    const { address, city, state, country, lat, lng, name, description, price } = req.body;


    const errors = {};


    if (!address) {
      errors.address = "Street address is required";
    }
    if (!city) {
      errors.city = "City is required";
    }
    if (!state) {
      errors.state = "State is required";
    }
    if (!country) {
      errors.country = "Country is required";
    }
    if (lat === undefined || lat < -90 || lat > 90) {
      errors.lat = "Latitude must be within -90 and 90";
    }
    if (lng === undefined || lng < -180 || lng > 180) {
      errors.lng = "Longitude must be within -180 and 180";
    }
    if (!name || name.length > 50) {
      errors.name = "Name must be less than 50 characters";
    }
    if (!description) {
      errors.description = "Description is required";
    }
    if (price === undefined || price <= 0) {
      errors.price = "Price per day must be a positive number";
    }

   
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
        message: "Bad Request",
        errors,
      });
    }


    const createNewSpot = await Spot.create({ ownerId: userId, address, city, state, country, lat, lng, name, description, price });
    const newSpotId = createNewSpot.id;

    const newSpot = await Spot.findByPk(newSpotId);
    res.status(201).json(newSpot.dataValues);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// edit a spot 

router.put('/:spotId', requireAuth,handleValidationErrors, async (req,res,next)=>{
  const {spotId} = req.params;
  const {address, city, state, country, lat, lng, name, description, price } = req.body;
  const loggedInUserId = req.user.dataValues.id;
  const  updatedData = {};  
  const errors = {}; 

  // Field validation
  if (!address) errors.address = "Street address is required";
  if (!city) errors.city = "City is required";
  if (!state) errors.state = "State is required";
  if (!country) errors.country = "Country is required";
  if (!lat || isNaN(lat) || lat < -90 || lat > 90) errors.lat = "Latitude is not valid";
  if (!lng || isNaN(lng) || lng < -180 || lng > 180) errors.lng = "Longitude is not valid";
  if (!name || name.length > 50) errors.name = "Name must be less than 50 characters";
  if (!description) errors.description = "Description is required";
  if (!price || isNaN(price)) errors.price = "Price per day is required";


  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ message: "Bad Request", errors });
  }

  const spot = await Spot.findByPk(Number(spotId));
  if (!spot){
    return res.status(404).json({message: "Spot couldn't be found"});
  }

//Latitude & Longitude Errors 
let latNum = Number(lat);
let lngNum = Number(lng);
if (isNaN(latNum) || latNum < -90 || latNum > 90) {
  return res.status(400).json({ message: "Bad Request" });
}
if (isNaN(lngNum) || lngNum < -180 || lngNum > 180) {
  return res.status(400).json({ message: "Bad Request" });
}

  // if spot's owner id is equal to loggin user
  console.log('===========================USER ID=======================');
console.log(loggedInUserId);
console.log('===========================SPOT OWNER ID=======================');
console.log(spot.ownerId);


  if (loggedInUserId === spot.dataValues.ownerId) {

    if (address) updatedData.address = address;
    if (city) updatedData.city = city;
    if (state) updatedData.state = state;
    if (country) updatedData.country = country;
    if (lat !== undefined) updatedData.lat = lat;
    if (lng !== undefined) updatedData.lng = lng;
    if (name) updatedData.name = name;
    if (description) updatedData.description = description;
    if (price !== undefined) updatedData.price = price;
    updatedData.ownerId = spot.dataValues.ownerId;
    updatedData.id = spot.dataValues.id;
    
    if (Object.keys(updatedData).length === 0 ){
      return res.status(400).json({message: "Bad request"});
    }
    console.log('===========================Object.keys Length=======================');
    console.log(Object.keys(updatedData).length);
    
    console.log('===========================UPDATED DATA=======================');
    console.log(spot.ownerId);
    console.log(updatedData);
  updatedSpot = await spot.update(updatedData);
  console.log('===========================UPDATED SPOT=======================');
  console.log(updatedSpot.dataValues.id);
  console.log(updatedSpot.dataValues.ownerId);
  
  res.status(200).json(updatedSpot.dataValues);
  } else {
  //trigger validation error from Handle Validation Errors midware
  //return res.status(400).json({message: "Bad Request"});
  const err = new Error('Forbidden');
  err.status = 403;
  err.errors = { message: 'Body validation error' };
  return next(err);
  }
});
  
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Delete a spot

router.delete('/:spotId',requireAuth,handleValidationErrors, async (req, res, next) => {
  const { spotId } = req.params;
  const loggedInUserId = req.user.dataValues.id;

  try {
    const spotToDelete = await Spot.findByPk(spotId);
    
    if (!spotToDelete) {
      return res.status(404).json({ message: "Spot couldn't be found"});
    }
    
    if(loggedInUserId === spotToDelete.ownerId) {
      await spotToDelete.destroy();
      return res.status(200).json({ message: 'Successfully deleted'});
    } else {
      const err = new Error('Forbidden');
      err.status = 403;
      err.errors = { message: 'Body validation error' };
      return next(err);
    }
  } catch (error) {

    console.error(error);
    return res.status(500).json({ message: 'Internal server error'});
  }

});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Create a REVIEW for a Spot based on Spot's id
  
  router.post('/:spotId/reviews', requireAuth, handleValidationErrors, async (req, res) => {
    const { spotId } = req.params; 
    const loggedInUserId = req.user.dataValues.id;
    

    const spotExists = await Spot.findByPk(spotId);
    if (!spotExists) {
      return res.status(404).json({ message: "Spot couldn't be found" });
    }
  
    const { review, stars } = req.body;
    const errors = {};
  
    
    if (!review || review.length === 0) {
      errors.review = 'Review text is required';
    }
  
 
    if (typeof stars !== 'number' || stars < 1 || stars > 5) {
      errors.stars = 'Stars must be an integer from 1 to 5';
    }
  
   
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ 
        message: 'Bad Request', 
        errors 
      });
    }
  

    const existingReview = await Review.findOne({
      where: {
        spotId,
        userId: loggedInUserId
      }
    });
  
    if (existingReview) {
      return res.status(500).json({ message: 'User already has a review for this spot' });
    }

    try {
      const newReview = await Review.create({ spotId, userId: loggedInUserId, review, stars });
  
      return res.status(201).json({
        id: newReview.id,
        spotId: newReview.spotId,
        userId: newReview.userId,
        review: newReview.review,
        stars: newReview.stars,
        createdAt: newReview.createdAt,
        updatedAt: newReview.updatedAt,
      });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////GET REVIEWS BY SPOT ID ////////////////////////////////////////////////////////////////////////////////////////////////

router.get('/:spotId/reviews', async (req,res)=>{
  const {spotId} = req.params;
const spot = await Spot.findByPk(spotId);

if (!spot){
return res.status(404).json({message: "Spot couldn't be found"})
}
const reviews = await Review.findAll({
  where: { spotId: spot.id },
  include: [
    {
      model: User,
      as: 'user',
      attributes: ['id', 'firstName', 'lastName'], 
    },
    {
      model: ReviewImage,
      as:'reviewImages',
      attributes: ['id', 'url'], 
    },
  ],
});
const formattedReviews = [];
// reviews.forEach(review =>{
//   formattedReviews.push({
//     id: review.id,
//     userId: review.userId,
//     spotId: review.spotId,
//     review: review.review,
//     stars: review.stars,
//     createdAt: review.createdAt,
//     updatedAt: review.updatedAt,
//     User: review.User,
//     ReviewImages: review.ReviewImages,
//   })
// })
   
    for (const review of reviews) {
//       const spot = review.spot;
//         const previewImage = await getPreviewImage(spot.id); 

        const formattedReview = {
          id: review.id,
          userId: review.userId,
          spotId: review.spotId,
          review: review.review,
          stars: review.stars,
          createdAt: review.createdAt,
          updatedAt: review.updatedAt,
          User: {
              id: review.user.id, 
              firstName: review.user.firstName,
              lastName: review.user.lastName
          },
         
          ReviewImages: review.reviewImages 
      };

   
      formattedReviews.push(formattedReview);
    }
  res.status(200).json({Reviews: formattedReviews});
});


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////ADD AN IMAGE TO A SPOT BASED ON THE SPOT'S ID ///////////////////////////////////////////////////////////////////////////////////////////////////

router.post('/:spotId/images',requireAuth,handleValidationErrors, async (req,res,next)=>{

  const  {spotId} = req.params;
  const {url, preview } = req.body; 
  const loggedInUserId = req.user.dataValues.id;

  const spot = await Spot.findByPk(spotId);
  if (!spot){
    return res.status(404).json({message: "Spot couldn't be found"});
  }

//validate if the user can create an image, if they can't return an error

// if spot's owner id is equal to loggin user

  if (loggedInUserId === spot.ownerId) {
    const image = await SpotImage.create({
      spotId,
      url,
      preview
    });

    return res.status(201).json({
      id:image.id,
      url: image.url,
      preview: image.preview
    });
  } else {
    //trigger validation error from Handle Validation Errors midware
    const err = new Error('Forbidden');
    err.status = 403;
    err.errors = { message: 'Body validation error' };
    return next(err);
  }


});

module.exports = router;