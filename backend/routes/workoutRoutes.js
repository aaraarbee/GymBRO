const express =
require("express");

const router =
express.Router();

const Workout =
require("../models/Workout");

const User =
require("../models/User");


// SAVE WORKOUT
router.post("/", async(req,res)=>{

  try{

    // CREATE WORKOUT
    const workout =
    new Workout(req.body);

    await workout.save();


    // FIND USER
    const user =
    await User.findById(
      req.body.userId
    );


    // TODAY
    const today =
    new Date().toDateString();


    // LAST WORKOUT DATE
    const lastWorkout =
    user.lastWorkoutDate

    ? new Date(
        user.lastWorkoutDate
      ).toDateString()

    : null;


    // UPDATE STREAK
    if(lastWorkout !== today){

      user.streak += 1;

      user.lastWorkoutDate =
      new Date();

      await user.save();
    }


    res.status(201).json({

      message:
      "Workout Saved Successfully",

      updatedUser:user

    });

  }

  catch(error){

    console.log(error);

    res.status(500).json({

      message:
      "Failed to save workout"

    });
  }
});


// GET USER WORKOUTS
router.get("/:userId", async(req,res)=>{

  try{

    const workouts =
    await Workout.find({

      userId:req.params.userId

    }).sort({

      workoutDate:-1

    });

    res.status(200).json(
      workouts
    );

  }

  catch(error){

    console.log(error);

    res.status(500).json({

      message:
      "Failed to fetch workouts"

    });
  }
});


module.exports = router;
