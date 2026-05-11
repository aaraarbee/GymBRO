const mongoose =
require("mongoose");


const workoutSchema =
new mongoose.Schema({

  userId:{
    type:String,
  },

  bodyPart:{
    type:String,
  },

  exerciseName:{
    type:String,
  },

  sets:{
    type:Number,
  },

  reps:{
    type:Number,
  },

  weight:{
    type:Number,
  },

  workoutDate:{
    type:Date,

    default:Date.now,
  }

});


module.exports =
mongoose.model(
  "Workout",
  workoutSchema
);