window.addEventListener("load", function () {

  //update-profile modal function 
  const editModal = document.querySelector("#update-profile");
  const editProfileBtn = document.querySelector("#btn-editProfile");
  const closeEdit = document.querySelector("#close-1");
  const cancelEdit = document.querySelector("#btnClose1");

  editProfileBtn.addEventListener("click", function () {
    editModal.style.display = "block";
  });

  closeEdit.addEventListener("click", function () {
    editModal.style.display = "none";
  });

  cancelEdit.addEventListener("click", function () {
    editModal.style.display = "none";
  });

  //delete-user modal
  const deleteModal = document.querySelector("#deleteConfirm");
  const deleteUserBtn = document.querySelector("#btn-deleteUser");
  const closeDelete = document.querySelector("#close-2");
  const cancelDelete = document.querySelector("#btnClose2");

  deleteUserBtn.addEventListener("click", function () {
    deleteModal.style.display = "block";
  });

  closeDelete.addEventListener("click", function () {
    deleteModal.style.display = "none";
  });

  cancelDelete.addEventListener("click", function () {
    deleteModal.style.display = "none";
  });
  
  //Check if two passwords match, if not, disable submit button 
  const btnSubmit = document.querySelector("#updateAccount");
  const firstPassword = document.getElementById("newPassword");
  const secondPassword = document.getElementById("newRePassword");
  const passwordLabel = document.getElementById("newRePasswordLabel");
  
  secondPassword.addEventListener("input", function () {
    console.log(firstPassword.value, secondPassword.value);
    if (firstPassword.value != secondPassword.value) {
      passwordLabel.innerHTML = "Passwords don't match";
      btnSubmit.disabled = true;
    } else {
      passwordLabel.innerHTML = "Re-enter Password:";
      btnSubmit.disabled = false;
    }
  });
});