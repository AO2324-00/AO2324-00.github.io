"use.strict";

/** fileリストに追加する */
function addFile(fileName){
    try{
        document.getElementById(fileName).remove();
    }catch(e){}
    //console.log(document.getElementById(fileName));
    let newElement = document.createElement("div");
    newElement.className = "fileTab";
    newElement.id = fileName;
    newElement.textContent = fileName;
    newElement.addEventListener("click",function(){
        readData(fileName);
    },false);
    let spanElm = document.createElement("span");
    spanElm.className = "fileDeleteBtn";
    spanElm.textContent = "×";
    spanElm.addEventListener("click",function(){
        newElement.remove();
        delete files[fileName];
        setLocalData("JavaDocConverter", files);
    },false);
    //newElement.appendChild(spanElm);
    newElement.insertBefore(spanElm,newElement.childNodes[0]);
    //newElement.insertAdjacentHTML('afterbegin',spanElm.outerHTML);
    document.getElementById("fileList").prepend(newElement);
}