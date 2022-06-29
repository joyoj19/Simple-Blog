window.addEventListener("load", async function () {
  const btnSubmit = document.querySelector("#createAccount");
  
  //fetch input from the usernamebox, check if exists in database, if yes, forbid submit 
  document.getElementById("txtUsername").addEventListener("input", async function () {
    const checkUser = await fetch(
      `checkUserExists?username=${document.getElementById("txtUsername").value}`
    );

    const userExists = await checkUser.json();
   
    if (userExists.userExists) {
      document.getElementById("userExists").innerHTML = "This username is already taken!";
      btnSubmit.disabled = true;
    } else {
      document.getElementById("userExists").innerHTML = "Username: ";
      btnSubmit.disabled = false;
    }
  });

  //check if two passwords match, if not, disable submission
  const firstPassword = document.getElementById("txtPassword");
  const secondPassword = document.getElementById("txtRePassword");
  const passwordLabel = document.getElementById("rePasswordLabel");
  secondPassword.addEventListener("input", function () {
    if (firstPassword.value != secondPassword.value) {
      passwordLabel.innerHTML = "Passwords don't match";
      btnSubmit.disabled = true;
    } else {
      passwordLabel.innerHTML = "Re-enter Password:";
      btnSubmit.disabled = false;
    }
  });
});
