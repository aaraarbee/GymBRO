// SAFE USER FETCH
const storedUser =
localStorage.getItem("user");


// SAFE PARSE
let user = null;

if(
  storedUser &&
  storedUser !== "undefined"
){

  user =
  JSON.parse(storedUser);
}


// REDIRECT IF NO USER
if(!user){

  window.location.href =
  "./login.html";
}


// WELCOME TEXT
document.getElementById(
  "welcomeText"
).innerHTML =

`Hello
<span>${user.firstName}</span>
👋`;


// STREAK
document.getElementById(
  "streakText"
).innerText =

`${user.streak} Days`;


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


// BODY CARD CLICK
const bodyCards =
document.querySelectorAll(
  ".body-card"
);


bodyCards.forEach((card)=>{

  card.addEventListener(

    "click",

    ()=>{

      const bodyPart =
      card.querySelector(
        "h2"
      ).innerText;


      localStorage.setItem(

        "selectedBodyPart",

        bodyPart
      );


      window.location.href =
      "./exercise.html";
    }
  );
});