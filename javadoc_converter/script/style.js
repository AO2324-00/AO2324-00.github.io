"use.strict";
/**サイドメニューの表示切替 */
function navClicked(){
    const checkbox = document.getElementById("navBtn");
    checkbox.checked = !checkbox.checked;
}

/**コードの表示切替 */
function listSelect(s){
    const selecter = {
        list : document.getElementById("list"),
        latex : document.getElementById("latex"),
        java : document.getElementById("java")
    }
    for(let type in selecter){
        if(s == type) selecter[type].style.display = "block";
        else selecter[type].style.display = "none";
    }
}

/**クラス図の表示切替 */
function switchClassDisplay(s){
    const display ={
        diagram: document.getElementById("classDisplay"),
        property: document.getElementById("classData")
    }
    const btn = {
        diagram: document.getElementById("classPreviewBtn"),
        property: document.getElementById("classPropertyBtn")
    }
    for(let type in display){
        if(s == type){
            display[type].style.display = "block";
            btn[type].style.pointerEvents = "none";
            btn[type].style.backgroundColor = "rgb(15, 15, 15)";
        } else {
            display[type].style.display = "none";
            btn[type].style.pointerEvents = "all";
            btn[type].style.backgroundColor = "rgba(0, 0, 0, 0)";
        }
    }
}

/**クラス図のプロパティ―のコピー */
function copyClassProp(){
    console.log(document.getElementById("classData").value)
    copyToClipboard(document.getElementById("classData").value);
}