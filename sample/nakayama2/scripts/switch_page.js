"use strict";
(function(){
    let isTop = true;

    /**
     * 各ページの要素を格納した連想配列
     * @key ページ名
     * @value element
     */
    const pages = Object.fromEntries(
        Object.entries(document.getElementsByClassName("page"))
            .map(([ _, val ]) => [ val.id, val ])
    );

    const navBtn = Object.fromEntries(
        Object.entries(document.getElementsByClassName("menuBtn"))
            .map(([ _, val ]) => [ val.id, val ])
    );
    console.log(pages.About);

    function switchPage(hash){

    }


        

    function loadPage(){
        const hash = document.location.hash.replace(/#=/g, '');
        switchPage((hash)?hash:"top");
        if(hash != '' && hash != "top") pageLinks[hash].checked = true;
    }
    loadPage();

    window.onpopstate = (event) => loadPage();

})();