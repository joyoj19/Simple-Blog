window.addEventListener("load", function(){
    const heart = document.querySelector("#heart");
    //change heart image when clicked on 
    heart.addEventListener("click", function(){
        heart.innerHTML = '<i class="fa fa-heart" aria-hidden="true"></i> Liked this article';
    });
});