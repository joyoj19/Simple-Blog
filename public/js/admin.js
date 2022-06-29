window.addEventListener("load", function () {
  //delete user modal
  const deleteButton = document.querySelectorAll(".btnDelete");

  const deleteModal = document.querySelectorAll(".deleteModal");

  const btnConfirm = document.querySelectorAll(".btnConfirm");
  const cancelDelete = document.querySelectorAll(".btnClose");

  deleteButton.forEach((element) => {
    element.addEventListener("click", function () {
      deleteModal.style.display = "block";
    });
  });

  cancelDelete.forEach((element) => {
    element.addEventListener("click", function () {
      deleteModal.style.display = "none";
    });
  });

  btnConfirm.forEach((element) => {
    element.addEventListener("click", function () {
      deleteModal.style.display = "none";
    });
  });
});

