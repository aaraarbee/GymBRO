// ======================
// SIGNUP
// ======================

const signupForm =
document.getElementById(
  "signupForm"
);


if(signupForm){

  signupForm.addEventListener(

    "submit",

    async(e)=>{

      e.preventDefault();


      const userData = {

        firstName:
        document.getElementById(
          "firstName"
        ).value,

        lastName:
        document.getElementById(
          "lastName"
        ).value,

        email:
        document.getElementById(
          "email"
        ).value,

        password:
        document.getElementById(
          "password"
        ).value,

        age:
        document.getElementById(
          "age"
        ).value,

        bodyWeight:
        document.getElementById(
          "bodyWeight"
        ).value,

        height:
        document.getElementById(
          "height"
        ).value,

        gender:
        document.getElementById(
          "gender"
        ).value,
      };


      try{

        const response =
        await fetch(

          "https://gymbro-backend-vzz0.onrender.com/api/auth/signup",

          {

            method:"POST",

            headers:{
              "Content-Type":
              "application/json"
            },

            body:JSON.stringify(
              userData
            )
          }
        );


        const data =
        await response.json();

        alert(data.message);


        window.location.href =
        "/pages/login.html";

      }

      catch(error){

        console.log(error);

        alert(
          "Signup Failed"
        );
      }
    }
  );
}



// ======================
// LOGIN
// ======================

const loginForm =
document.getElementById(
  "loginForm"
);


if(loginForm){

  loginForm.addEventListener(

    "submit",

    async(e)=>{

      e.preventDefault();


      const loginData = {

        email:
        document.getElementById(
          "email"
        ).value,

        password:
        document.getElementById(
          "password"
        ).value,
      };


      try{

        const response =
        await fetch(

          "http://gymbro-backend-vzz0.onrender.com/api/auth/login",

          {

            method:"POST",

            headers:{
              "Content-Type":
              "application/json"
            },

            body:JSON.stringify(
              loginData
            )
          }
        );


        const data =
        await response.json();


        // SAVE TOKEN
        localStorage.setItem(

          "token",

          data.token
        );


        // SAVE USER
        localStorage.setItem(

          "user",

          JSON.stringify(
            data.user
          )
        );


        alert(
          "Login Successful"
        );


        window.location.href =
        "/pages/dashboard.html";

      }

      catch(error){

        console.log(error);

        alert(
          "Login Failed"
        );
      }
    }
  );
}