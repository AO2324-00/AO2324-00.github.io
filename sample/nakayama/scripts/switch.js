"use strict";

let switchPage;

(function(){
    let isTop = true;
    let beforeHash = "";
    const pageLinks = {
        about:document.getElementById("about_btn"),
        menu:document.getElementById("menu_btn"),
        gallery:document.getElementById("gallery_btn"),
        access:document.getElementById("access_btn")
    }
    const pages = {
        about:document.getElementById("about"),
        menu:document.getElementById("menu"),
        gallery:document.getElementById("gallery"),
        access:document.getElementById("access")
    }

    for(let key in pages) {
        pages[key].style.display = "none";
        pages[key].style.animation = "transition-content-reverse 0.5s ease-in-out 0s 1 normal forwards";
    }
    switchPage = (page)=>{
        switch (page) {
            case '':
            case "top":
                if(isTop) return;
                if(beforeHash != page && beforeHash in pages){
                    const hash = beforeHash;
                    setTimeout(function(){pages[hash].style.display = "none"},500);
                }
                for(let key in pages) pages[key].style.animation = "transition-content-reverse 0.5s ease-in-out 0s 1 normal forwards";
                for(let key in pageLinks) pageLinks[key].checked = false;
                topTransition("reverse");
                isTop = true;
                break;
            case "about":
            case "menu":
            case "gallery":
            case "access":
                if(isTop) topTransition("normal");
                if(beforeHash != page && beforeHash in pages){
                    const hash = beforeHash;
                    setTimeout(function(){pages[hash].style.display = "none"},500);
                }
                pages[page].style.display = "block";
                for(let key in pages) pages[key].style.animation = "transition-content-reverse 0.5s ease-in-out 0s 1 normal forwards";
                pages[page].style.animation = "fadeIn-content 1.5s ease-in-out 0s 1 normal forwards";
                isTop = false;
            break;
        
            default:
                return;
        }
        beforeHash = document.location.hash.replace(/#=/g, '');
    }

    function loadPage(){
        const hash = document.location.hash.replace(/#=/g, '');
        switchPage((hash)?hash:"top");
        if(hash == '' || hash == "top") return;
        pageLinks[hash].checked = true;
    }
    loadPage();

    window.onpopstate = function(event) {
        loadPage();
    };
})();