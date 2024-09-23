// backend/routes/api/session.js
const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Spot,User } = require('../../db/models');
const router = express.Router();

//Get all the Spots
  router.get(
      '/spots', async (req, res) => {
      try{

        const spots = await Spot.findAll();
        res.status(200).json(spots);

      } catch (error) {

        console.error(error);
        res.status(500).json({message:'error'});

      } 
    }
  );


  module.exports = router;