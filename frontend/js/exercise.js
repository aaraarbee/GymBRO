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


// BODY PART
const selectedBodyPart =
localStorage.getItem(
  "selectedBodyPart"
);


// PAGE TITLE
document.getElementById(
  "bodyPartTitle"
).innerText =

`${selectedBodyPart} Workout`;


// EXERCISES
const exerciseNames = {

  Chest:[
    "Bench Press",
    "Incline Dumbbell Press",
    "Chest Fly"
  ],

  Biceps:[
    "Barbell Curl",
    "Hammer Curl",
    "Cable Curl"
  ],

  Triceps:[
    "Pushdown",
    "Skull Crushers",
    "Dips"
  ],

  Back:[
    "Lat Pulldown",
    "Barbell Row",
    "Deadlift"
  ],

  Legs:[
    "Squats",
    "Leg Press",
    "Leg Curl"
  ],

  Shoulders:[
    "Shoulder Press",
    "Lateral Raise",
    "Front Raise"
  ],

  Abs:[
    "Crunches",
    "Leg Raises",
    "Plank"
  ]
};


// CONTAINER
const exerciseList =
document.querySelector(
  ".exercise-list"
);


exerciseList.innerHTML = "";


// CREATE CARDS
exerciseNames[selectedBodyPart]
.forEach((exercise)=>{

  exerciseList.innerHTML += `

  <div class="exercise-card">

    <h2>${exercise}</h2>

    <input
    type="number"
    class="sets"
    placeholder="Sets">

    <input
    type="number"
    class="reps"
    placeholder="Reps">

    <input
    type="number"
    class="weight"
    placeholder="Weight (kg)">

    <button
    class="save-btn"

    data-exercise="${exercise}">

      Save Workout

    </button>

  </div>

  `;
});


// SAVE BUTTONS
const saveButtons =
document.querySelectorAll(
  ".save-btn"
);


saveButtons.forEach((button)=>{

  button.addEventListener(

    "click",

    async()=>{

      const card =
      button.parentElement;


      const sets =
      card.querySelector(
        ".sets"
      ).value;


      const reps =
      card.querySelector(
        ".reps"
      ).value;


      const weight =
      card.querySelector(
        ".weight"
      ).value;


      // WORKOUT DATA
      const workoutData = {

        userId:user._id,

        bodyPart:selectedBodyPart,

        exerciseName:
        button.dataset.exercise,

        sets,

        reps,

        weight,

        workoutDate:
        new Date()
      };


      try{

        const response =
        await fetch(

          "https://gymbro-backend-vzz0.onrender.com/api/workouts",

          {

            method:"POST",

            headers:{
              "Content-Type":
              "application/json"
            },

            body:JSON.stringify(
              workoutData
            )
          }
        );


        const data =
        await response.json();


        alert(data.message);


        // UPDATE USER
        localStorage.setItem(

          "user",

          JSON.stringify(
            data.updatedUser
          )
        );


        // RESET
        card.querySelector(
          ".sets"
        ).value = "";

        card.querySelector(
          ".reps"
        ).value = "";

        card.querySelector(
          ".weight"
        ).value = "";

      }

      catch(error){

        console.log(error);

        alert(
          "Workout Save Failed"
        );
      }
    }
  );
});