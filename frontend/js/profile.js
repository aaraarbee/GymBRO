// GET USER
const storedUser =
localStorage.getItem("user");


const user =
storedUser
? JSON.parse(storedUser)
: null;


// CHECK LOGIN
if(!user){

  window.location.href =
  "./login.html";
}


// USER DETAILS
document.getElementById(
  "fullName"
).innerText =

`${user.firstName}
 ${user.lastName}`;


document.getElementById(
  "age"
).innerText =

`Age: ${user.age}`;


document.getElementById(
  "gender"
).innerText =

`Gender: ${user.gender}`;


document.getElementById(
  "height"
).innerText =

`Height: ${user.height} cm`;


document.getElementById(
  "weight"
).innerText =

`Weight:
 ${user.bodyWeight} kg`;


// BMI
const heightInMeters =
user.height / 100;


const bmi =
(
  user.bodyWeight /

  (heightInMeters * heightInMeters)

).toFixed(1);


document.getElementById(
  "bmi"
).innerText =

`BMI: ${bmi}`;


// FETCH WORKOUT COUNT
async function getWorkoutCount(){

  try{

    const response =
    await fetch(

      `http://localhost:5000/api/workouts/${user._id}`

    );

    const workouts =
    await response.json();


    document.getElementById(
      "workoutCount"
    ).innerText =

    `Total Workouts:
     ${workouts.length}`;

  }

  catch(error){

    console.log(error);
  }
}


getWorkoutCount();


// LOGOUT
const logoutBtn =
document.getElementById(
  "logoutBtn"
);


logoutBtn.addEventListener(

  "click",

  ()=>{

    localStorage.clear();

    window.location.href =
    "./login.html";
  }
);