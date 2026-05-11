const express = require("express");

const cors = require("cors");

require("dotenv").config();


// DATABASE
const connectDB =
require("./config/db");


// ROUTES
const authRoutes =
require("./routes/authRoutes");

const workoutRoutes =
require("./routes/workoutRoutes");


// APP
const app = express();


// CONNECT DATABASE
connectDB();


// MIDDLEWARE
app.use(cors());

app.use(express.json());


// ROUTES
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/workouts",
  workoutRoutes
);


// TEST ROUTE
app.get("/", (req,res)=>{

  res.send(
    "GymBRO Backend Running 🚀"
  );
});


// PORT
const PORT =
process.env.PORT || 5000;


// SERVER
app.listen(PORT, ()=>{

  console.log(
    `Server running on port ${PORT}`
  );
});