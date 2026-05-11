const express =
require("express");

const router =
express.Router();

const bcrypt =
require("bcryptjs");

const jwt =
require("jsonwebtoken");

const User =
require("../models/User");


// ======================
// SIGNUP
// ======================

router.post(

  "/signup",

  async(req,res)=>{

    try{

      const {

        firstName,
        lastName,
        email,
        password,
        age,
        bodyWeight,
        height,
        gender

      } = req.body;


      // CHECK EXISTING USER
      const existingUser =
      await User.findOne({email});


      if(existingUser){

        return res.status(400).json({

          message:
          "User already exists"
        });
      }


      // HASH PASSWORD
      const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );


      // CREATE USER
      const user =
      new User({

        firstName,
        lastName,
        email,

        password:
        hashedPassword,

        age,
        bodyWeight,
        height,
        gender
      });


      await user.save();


      res.status(201).json({

        message:
        "Signup Successful"
      });

    }

    catch(error){

      console.log(error);

      res.status(500).json({

        message:
        "Signup Failed"
      });
    }
  }
);



// ======================
// LOGIN
// ======================

router.post(

  "/login",

  async(req,res)=>{

    try{

      const {

        email,
        password

      } = req.body;


      // FIND USER
      const user =
      await User.findOne({email});


      if(!user){

        return res.status(400).json({

          message:
          "User not found"
        });
      }


      // CHECK PASSWORD
      const isMatch =
      await bcrypt.compare(

        password,
        user.password
      );


      if(!isMatch){

        return res.status(400).json({

          message:
          "Invalid Credentials"
        });
      }


      // GENERATE TOKEN
      const token =
      jwt.sign(

        {id:user._id},

        process.env.JWT_SECRET,

        {expiresIn:"7d"}
      );


      // SUCCESS RESPONSE
      res.status(200).json({

        message:
        "Login Successful",

        token,

        user
      });

    }

    catch(error){

      console.log(error);

      res.status(500).json({

        message:
        "Login Failed"
      });
    }
  }
);


module.exports = router;