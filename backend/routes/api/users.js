const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();

const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
  ];

//sign up route
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { firstName, lastName, email, password, username  } = req.body;
      const errors = {};
      const existingEmail = await User.findOne({where:{email}});
      if (existingEmail){
        errors.email = "User with that email already exists";
        // return res.status(500).json({error: "User already exists with the specified email"});
      }
      const existingUsername = await User.findOne({where:{username}});
      if (existingUsername){
        errors.username = "User with that username already exists";
        // return res.status(500).json({message: "User already exists", errors: {
        //   email: "User already exists with the specified username",
        //   username: "User with that username already exists"
        }
        if (Object.keys(errors).length > 0) {
          return res.status(500).json({
            message: "User already exists",
            errors,
      
      
      
      });
      }
      // changed the above, below is old.
      // const existingUsername = await User.findOne({where:{username}});
      // if (existingUsername){
      //   return res.status(500).json({error: "User already exists with the specified username"});
      // }
      
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({ firstName, lastName, email, username, hashedPassword  });
  
      const safeUser = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
      };
  
      await setTokenCookie(res, safeUser);
  
      return res.status(201).json({
        user: safeUser
      });
    }
  );






module.exports = router;