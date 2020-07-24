"use.strict";

/** fileリストに追加する */
function addFile(fileName){
    try{
        document.getElementById(fileName).remove();
    }catch(e){}
    let newElement = document.createElement("div");
    newElement.className = "fileTab";
    newElement.id = fileName;
    newElement.textContent = fileName;
    newElement.addEventListener("click",function(){
        readData(fileName)
        
    },false);
    let newDeleteBtn = document.createElement("span");
    newDeleteBtn.className = "fileDeleteBtn";
    newDeleteBtn.textContent = "×";
    newDeleteBtn.addEventListener("click",function(){
        newElement.remove();
        delete files[fileName];
        setLocalData("javaDocFiles", files);
    },false);
    //newElement.appendChild(newDeleteBtn);
    newElement.insertAdjacentHTML('afterbegin',newDeleteBtn.outerHTML);
    document.getElementById("fileList").prepend(newElement);
}