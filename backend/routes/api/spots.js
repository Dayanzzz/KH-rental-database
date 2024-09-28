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

router.get(
  '/', async (req, res) => {
    let { price, page, size, lng, lat, } = req.query;

  page = parseInt(page);
  size = parseInt(size);

  if (Number.isNaN(page)) page = 1;
  if (Number.isNaN(size)) size = 20;

  //validate page and size
  if (page < 1 ) {
    return res.status(400).json({message:"Page must be greater than or equal to 1"});
    //ValidationError({"page": "Page must be greater than or equal to 1"});
  }
  if ( size < 1 ) {
    return res.status(400).json({ message:"Size must be greater than or equal to 1"})
  }

  //Latitude Errors
  let latNum = lat;
  let latNumToCheck = Math.floor(latNum)

  if ( latNumToCheck < -90 ) {
    return res.status(400).json({ message:"Minimum latitude is invalid"})
  }
  if ( latNumToCheck > 90 ) {
    return res.status(400).json({ message:"Maximum latitude is invalid"})
  }

//Longitude Errors
let lngNum = lng;
let lngNumToCheck = Math.floor(lngNum)

if ( lngNumToCheck < -180 ) {
  return res.status(400).json({ message:"Minimum longitude is invalid"})
}
if ( lngNumToCheck > 180 ) {
  return res.status(400).json({ message:"Maximum longitude is invalid"})
}

//Price Errors
minPrice = price;
maxPrice = price;

if (minPrice >= 0 ) {
  return res.status(400).json({ message:"Minimum price must be greater than or equal to 0"})
}
if (maxPrice >= 0 ) {
  return res.status(400).json({ message:"Maximum price must be greater than or equal to 0"})
}
  
  try{

    

    const spots = await Spot.findAll({
      limit: size,
      offset: size * (page - 1),
    });
    const responseSpots = [];
    for (const spot of spots){

    const avgRating = await getAverageRating(spot.id);
    const previewImage = await getPreviewImage(spot.id);
    
   responseSpots.push({ 
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
    res.status(200).json({Spots: responseSpots, page});

  } catch (error) {

    console.error(error);
    res.status(500).json({message:'error'});

  } 
}
);

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

    const {address, city, state, country, lat, lng, name, description, price} = req.body;

    if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price ) {
      return res.status(400).json({message: 'Bad Request'});
    }

    const createNewSpot = await Spot.create({ ownerId: userId, address, city, state, country, lat, lng, name, description, price});
    newSpotId = createNewSpot.id;  

    
    const newSpot = await Spot.findByPk(newSpotId);
    res.status(201).json(newSpot.dataValues);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error:'Internal Server Error' });
  }

});


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// edit a spot 

router.put('/:spotId', requireAuth,handleValidationErrors, async (req,res,next)=>{
  const {spotId} = req.params;
  const {address, city, state, country, lat, lng, name, description, price } = req.body;
  const loggedInUserId = req.user.dataValues.id;
  const  updatedData = {};  



  const spot = await Spot.findByPk(spotId);
  if (!spot){
    return res.status(404).json({message: "Spot couldn't be found"});
  }
  
  //field validation checks
  if (address === undefined || city === undefined || state === undefined || country === undefined || name.length > 50 || description === undefined || price === undefined) {
    return res.status(400).json({message: "Bad Request"});
  };

//Latitude Errors
let latNum = lat;
let latNumToCheck = Math.floor(latNum)

if ( latNumToCheck < -90 ) {
  return res.status(400).json({ message:"Bad Request"})
}
if ( latNumToCheck > 90 ) {
  return res.status(400).json({ message:"Bad Request"})
}

//Longitude Errors
let lngNum = lng;
let lngNumToCheck = Math.floor(lngNum)

if ( lngNumToCheck < -180 ) {
return res.status(400).json({ message:"Bad Request"})
}
if ( lngNumToCheck > 180 ) {
return res.status(400).json({ message:"Bad Request"})
}




  // if spot's owner id is equal to loggin user

  if (loggedInUserId === spot.ownerId) {

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

  await spot.update(updatedData);
  res.status(200).json(spot);
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

router.delete('/:spotId',requireAuth, async (req, res) => {
  const { spotId } = req.params;

  try {
    const spotToDelete = await Spot.findByPk(spotId);
    
    if (!spotToDelete) {
      return res.status(404).json({ message: "Spot couldn't be found"});
    }
    await spotToDelete.destroy();
    return res.status(200).json({ message: 'Successfully deleted'}); 
  } catch (error) {

    console.error(error);
    return res.status(500).json({ message: 'Internal server error'});
  }

});


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Create a REVIEW for a Spot based on Spot's id
  
  router.post('/:spotId/reviews',requireAuth, async (req, res) => {
    const { spotId } = req.params; 
    const loggedInUserId = req.user.dataValues.id;

    const spotExists = await Spot.findByPk(spotId);
    if (!spotExists){
      return res.status(404).json({message: "Spot couldn't be found"});
    }

    try {
      const {review, stars} = req.body;
  
      if (!review || !stars ) {
        return res.status(400).json({message: 'Bad Request'});
      }
      const newReview = await Review.create({ spotId, userId:loggedInUserId, review, stars});
        res.status(201).json(newReview);
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error:'Internal Server Error' });
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
      attributes: ['id', 'firstName', 'lastName'], // Include necessary user fields
    },
    {
      model: ReviewImage,
      as:'reviewImages',
      attributes: ['id', 'url'], // Include necessary image fields
    },
  ],
});
  res.status(200).json(reviews);
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