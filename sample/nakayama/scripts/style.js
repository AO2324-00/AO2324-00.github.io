"use strict";
let topTransition, scrollTo;
(function(){
    const contentBox = document.getElementById("contentBox");
    const content = document.getElementById("content");
    const title = document.getElementById("title");
    const nav = document.getElementsByTagName("nav")[0];
    topTransition = (type)=>{
        switch (type) {
            case "normal":
                contentBox.style.animation = "transition-content-box 2s ease-in-out 0s 1 normal forwards";
                content.style.animation = "transition-content 1s ease-in-out 2s 1 normal forwards";
                title.style.animation = "transition-title 2s ease-in-out 0s 1 normal forwards";
                nav.style.animation = "transition-nav 2s ease-in-out 0s 1 normal forwards";
                nav.childNodes[3].style.animation = "transition-nav-gap 2s ease-in-out 0s 1 normal forwards";
                nav.childNodes[5].style.animation = "transition-nav-gap 2s ease-in-out 0s 1 normal forwards";
                return;
            case "reverse":
                contentBox.style.animation = "transition-content-box-reverse 2s ease-in-out 0s 1 normal forwards";
                content.style.animation = "transition-content-reverse 0.3s ease-in-out 0s 1 normal forwards";
                title.style.animation = "transition-title-reverse 2s ease-in-out 0s 1 normal forwards";
                nav.style.animation = "transition-nav-reverse 2s ease-in-out 0s 1 normal forwards";
                nav.childNodes[3].style.animation = "transition-nav-gap-reverse 2s ease-in-out 0s 1 normal forwards";
                nav.childNodes[5].style.animation = "transition-nav-gap-reverse 2s ease-in-out 0s 1 normal forwards";
                return;
        
            default:
                return;
        }
    }
})();