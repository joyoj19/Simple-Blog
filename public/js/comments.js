window.addEventListener("load", function () {
    const allReplyBtns = Array.from(document.querySelectorAll(".reply"));
    const allReplySections = Array.from(document.querySelectorAll(".replySec"));
    const allCancelBtns = Array.from(document.querySelectorAll(".cancelReply"));

    //add reply button to each comment, open reply section once clicked
    for (i = 0; i < allReplyBtns.length; i++) {
        const btnReply = allReplyBtns[i];
        const replySection = allReplySections[i];
        btnReply.addEventListener("click", function () {
            btnReply.style.display = "none";
            replySection.style.display = "block";
        });
        const btnCancel = allCancelBtns[i];
        btnCancel.addEventListener("click", function () {
            btnReply.style.display = "inline";
            replySection.style.display = "none";
        });
    }
});