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
    return res.status(400).json({message:`"page": "Page must be greater than or equal to 1"`});
    //ValidationError({"page": "Page must be greater than or equal to 1"});
  }

  if ( size < 1 ) {
    return res.status(400).json({ message:`"size": "Size must be greater than or equal to 1"`})
  }

  //Latitude Errors
  let latNum = lat;
  let latNumToCheck = Math.floor(latNum)

  if ( latNumToCheck < -90 ) {
    return res.status(400).json({ message:`"minLat": "Minimum latitude is invalid"`})
  }
  if ( latNumToCheck > 90 ) {
    return res.status(400).json({ message:`"maxLat": "Maximum latitude is invalid"`})
  }

//Longitude Errors
let lngNum = lng;
let lngNumToCheck = Math.floor(lngNum)

if ( lngNumToCheck < -180 ) {
    console.log(`"minLng": "Minimum longitude is invalid"`); 
}
if ( lngNumToCheck > 180 ) {
  return res.status(400).json({ message:`"maxLng": "Maximum longitude is invalid"`})
}

//Price Errors
minPrice = price;
maxPrice = price;

if (minPrice >= 0 ) {
  return res.status(400).json({ message:`"minPrice": "Minimum price must be greater than or equal to 0"`})
}
if (maxPrice >= 0 ) {
  return res.status(400).json({ message:`"maxPrice": "Maximum price must be greater than or equal to 0"`})
}
  
  try{
    const spots = await Spot.findAll();
    res.status(200).json(spots);

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
  res.status(200).json(spots);

  } catch(error) {
    console.error(error);
    res.status(500).json({ error: error.message })
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
//Create a Spot

router.post('/', requireAuth, async (req, res) => {
  try {
    const {ownerId, address, city, state, country, lat, lng, name, description, price} = req.body;

    if (!address || !city || !state || !country || !lat || !lng || !name || !description || !price ) {
      return res.status(400).json({message: 'Bad Request'});
    }
    const newSpot = await Spot.create({ ownerId, address, city, state, country, lat, lng, name, description, price});
      res.status(201).json(newSpot);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error:'Internal Server Error' });
  }

});


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// edit a spot 

  router.put('/:spotId', requireAuth,async (req,res)=>{
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

router.post('/:spotId/images',requireAuth, async (req,res)=>{

  const  {spotId} = req.params;

  const {url, preview } = req.body; 

  const spot = await Spot.findByPk(spotId);
  if (!spot){
    return res.status(404).json({message: "Spot couldn't be found"});
  }
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

})


module.exports = router;