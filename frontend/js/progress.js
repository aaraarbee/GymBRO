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


const historyList =
document.querySelector(
  ".history-list"
);


let chart;


// FETCH WORKOUTS
async function getWorkouts(){

  try{

    const response =
    await fetch(

      `https://gymbro-backend-vzz0.onrender.com/api/workouts/${user._id}`

    );

    const workouts =
    await response.json();

    displayWorkouts(workouts);

    createDropdown(workouts);

  }

  catch(error){

    console.log(error);
  }
}


// DISPLAY WORKOUTS
function displayWorkouts(workouts){

  historyList.innerHTML = "";


  // GROUP BY DATE
  const grouped = {};


  workouts.forEach((workout)=>{

    const date =
    new Date(
      workout.workoutDate
    ).toLocaleDateString();

    if(!grouped[date]){

      grouped[date] = [];
    }

    grouped[date].push(workout);
  });


  // DISPLAY
  for(const date in grouped){

    let exercisesHTML = "";


    grouped[date].forEach((workout)=>{

      exercisesHTML += `

      <div class="exercise-item">

        <h2>
          ${workout.exerciseName}
        </h2>

        <p>

          Body Part:
          ${workout.bodyPart}

          <br>

          ${workout.sets} Sets ×
          ${workout.reps} Reps

          <br>

          Weight:
          ${workout.weight} kg

        </p>

      </div>

      `;
    });


    historyList.innerHTML += `

    <div class="date-section">

      <h1 class="date-title">

        ${date}

      </h1>

      ${exercisesHTML}

    </div>

    `;
  }
}


// CREATE DROPDOWN
function createDropdown(workouts){

  const select =
  document.getElementById(
    "exerciseSelect"
  );


  // UNIQUE EXERCISES
  const uniqueExercises =
  [...new Set(

    workouts.map(

      workout=>
      workout.exerciseName
    )

  )];


  // RESET
  select.innerHTML = "";


  uniqueExercises.forEach(

    (exercise)=>{

      select.innerHTML += `

      <option value="${exercise}">

        ${exercise}

      </option>

      `;
    }
  );


  createChart(
    workouts,
    uniqueExercises[0]
  );


  select.addEventListener(

    "change",

    ()=>{

      createChart(
        workouts,
        select.value
      );
    }
  );
}


// CREATE CHART
function createChart(
  workouts,
  selectedExercise
){

  if(chart){

    chart.destroy();
  }


  const filtered =
  workouts.filter(

    workout=>

    workout.exerciseName ===
    selectedExercise
  );


  const dates =
  filtered.map(

    workout=>

    new Date(
      workout.workoutDate
    ).toLocaleDateString()
  );


  const weights =
  filtered.map(

    workout=>

    workout.weight
  );


  const ctx =
  document.getElementById(
    "progressChart"
  );


  chart =
  new Chart(ctx, {

    type:"line",

    data:{

      labels:dates,

      datasets:[{

        label:
        `${selectedExercise} Progress`,

        data:weights,

        borderColor:"orange",

        backgroundColor:
        "rgba(255,165,0,0.2)",

        borderWidth:4,

        tension:0.3,

        fill:true,

        pointBackgroundColor:
        "orange",

        pointRadius:5
      }]
    },

    options:{

      responsive:true
    }
  });
}


// INITIAL
getWorkouts();