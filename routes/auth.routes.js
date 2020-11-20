const router = require('express').Router();
const passport = require("../lib/passportConfig");
const Customer = require("../models/customer.models");
const jwt = require("jsonwebtoken");

/**
 * @method POST
 * @route api/auth/register
 * @name Registration
 */

router.post("/register", async (req,res)=>{
    try {
        let {email,password,firstname,lastname,location} = req.body;
        let customer = new Customer({email,password,firstname,lastname,location});
        await customer.save();
        res.status(201).json({message:"user successfully registered!"});
    } catch (error) {
        res.status(400).json({message:"one or more fields does not match requirement"});
    }
})

/**
 * @method POST
 * @route api/auth/login
 * @name login
 * @returns jwt 
 */
router.post("/login", async (req, res, next) => {
    passport.authenticate("local", async (err, user, info) => {
      try {
        if (err || !user) {
          const error = new Error("An error occurred.");
  
          return next(error);
        }
  
        req.login(user, { session: false }, async (error) => {
          if (error) return next(error);
  
          const body = { _id: user._id};
          const token = jwt.sign({ user: body }, process.env.SECRET);
  
          return res.status(200).json({ token});
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  });

module.exports = router;