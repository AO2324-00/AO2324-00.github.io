"use.strict";
/**サイドメニューの表示切替 */
function navClicked(){
    const checkbox = document.getElementById("navBtn");
    checkbox.checked = !checkbox.checked;
}

/**
 * 読み込み済みのファイルを削除する
 */
function deleteAllFiles(){
    document.getElementById("fileList").innerHTML = "";
    setLocalData("JavaDocConverter", files = {});
}

function selectedFileStyle(fileName){
    let tmp = document.getElementsByClassName("fileTab");
    for(let i = 0; i < tmp.length; i++){
        tmp[i].style.backgroundColor = "rgba(0, 0, 0, 0)";
    }
    //console.log(tmp = document.getElementById(fileName));
    if((tmp = document.getElementById(fileName)) != undefined) tmp.style.backgroundColor = "rgb(49, 49, 49)";
}

/**コードの表示切替 */
function listSelect(s){
    const selecter = {
        list : document.getElementById("list"),
        latex : document.getElementById("latex"),
        java : document.getElementById("java")
    }
    document.getElementById("copyBtn").onclick = function(){
        copyCode(s);
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
            display[type].style.display = "flex";
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
    copyToClipboard(document.getElementById("classData").value);
}

/**コードのコピー */
function copyCode(type) {
    copyToClipboard(document.getElementById(type).innerText);
}