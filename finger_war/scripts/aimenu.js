"use.strict";
(function(document){
    
document.onkeydown =
function (e) {
    if (event.ctrlKey) {
        if (event.keyCode == 83) {
            saveAIpage();
            event.keyCode = 0;
            return false;
        }
    }
}

document.onkeypress =
function (e) {
    if (e != null) {
        if ((e.ctrlKey || e.metaKey) && e.which == 115) {
            saveAIpage();
            return false;
        }
    }
}


editMenuBtn = function(){
    if(aiMenu.style.display == "none") aiMenu.style.display = "block";
    else aiMenu.style.display = "none";
}

const aiMenu = document.getElementById("aiMenu");
const aiSelector = document.getElementById("aiSelector");
const AIpageBox = document.getElementById("AIpageBox");
const defaultAiMenu = document.getElementById("aiMenu").cloneNode(true);
let aiData;
let currentID = 1;
let editedCheck = false;
let creatingCheck = false;
// 読込
function getLocalData(key) {
    if (!localStorage.getItem(key)) return null;
    else return JSON.parse(localStorage.getItem(key));
}
// 保存
function setLocalData(key, data) {
    try{
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    }catch(e){
        return false;
    }
}

function setUpAIdata(aiData){
    //console.log(aiData)
    for(let key in aiData){
        aiData[key].id = key;
        addAIPage(aiData[key]);
        //console.log(aiData[key]);
    }
}

openAI = function(id){
    try{
        document.getElementById("AInew").remove();
        document.getElementById("AIlabelnew").remove();
        creatingCheck = false;
    } catch(e){}
    currentID = Number(id);
    //console.log(id);
    AIpageBox.innerHTML = "";
    AIpageBox.appendChild((function(data){
        let newPage = document.createElement("div");
    newPage.id = "AIpage";
    newPage.appendChild((function(){
        let tmpElement = document.createElement("div");
        tmpElement.className = "aiName";
        tmpElement.textContent = data.name;
        tmpElement.contentEditable = true;
        tmpElement.spellcheck= false;
        return tmpElement;
    })());
    newPage.appendChild((function(){
        let tmpElement = document.createElement("textarea");
        tmpElement.className = "aiDescription";
        tmpElement.textContent = data.description;
        tmpElement.spellcheck= false;
        tmpElement.addEventListener("mousemove",function(){
            if(document.getElementById("AIpage").getElementsByClassName("aiDescription")[0].value != tmpElement.textContent && !editedCheck && !creatingCheck){
                /** DOMの変化が起こった時の処理 */
                //console.log('DOMが変化しました');
                editStyle.innerHTML = `#AIlabel${id}::after{content: " ●";color:gray;}`;
                editedCheck = true;
            } else if(editStyle.innerHTML == "") editedCheck = false;
        },false);
        return tmpElement;
    })());
    newPage.appendChild((function(){
        let tmpElement = document.createElement("textarea");
        tmpElement.className = "script";
        tmpElement.textContent = data.script;
        tmpElement.spellcheck= false;
        tmpElement.addEventListener("mousemove",function(){
            if(document.getElementById("AIpage").getElementsByClassName("script")[0].value != tmpElement.textContent && !editedCheck && !creatingCheck){
                /** DOMの変化が起こった時の処理 */
                //console.log('DOMが変化しました');
                editStyle.innerHTML = `#AIlabel${id}::after{content: " ●";color:gray;}`;
                editedCheck = true;
            } else if(editStyle.innerHTML == "") editedCheck = false;
        },false);
        return tmpElement;
    })());
    newPage.appendChild((function(){
        let tmpElement = document.createElement("style");
        tmpElement.id = "editStyle";
        return tmpElement;
    })());
    return newPage;
    })(aiData[id]));
    document.getElementById("AI"+id).checked = true;
    bot = new Function("myHands","enemyHands",aiData[id].script);
    setAIname(aiData[id].name);
    edited(id);
}
function edited(id){
    let observer = new MutationObserver(function(){
        if(!editedCheck && !creatingCheck){
            /** DOMの変化が起こった時の処理 */
            console.log('DOMが変化しました');
            editStyle.innerHTML = `#AIlabel${id}::after{content: " ●";color:gray;}`;
            editedCheck = true;
        } else if(editStyle.innerHTML == "") editedCheck = false;
    });
    
    /** 監視対象の要素オブジェクト */
    const elem = document.getElementById("AIpage");
    
    /** 監視時のオプション */
    const config = { 
    //attributes: true, 
    childList: true, 
    characterData: true,
    subtree: true
    };
    
    /** 要素の変化監視をスタート */
    observer.observe(elem, config);
}

function addAIPage(data){
    aiSelector.appendChild((function(){
        let tmpElement = document.createElement("input");
        tmpElement.id = "AI"+data.id;
        tmpElement.name = "aiSelector";
        tmpElement.type = "radio";
        tmpElement.addEventListener("click", function(){
            openAI(data.id);
        }, false);
        return tmpElement;
    })());
    aiSelector.appendChild((function(){
        let tmpElement = document.createElement("label");
        tmpElement.id = "AIlabel"+data.id;
        tmpElement.htmlFor = "AI"+data.id;
        tmpElement.textContent = data.name;
        return tmpElement;
    })());
}



function setUpAIpage(){
    aiData = getLocalData("aiData");
    //console.log(aiData);
    if(aiData == null || !Object.keys(aiData).length){
        setLocalData("aiData", [{"name":`Default AI`,"description":document.getElementById("AIpage").getElementsByClassName("aiDescription")[0].value, "script":document.getElementById("AIpage").getElementsByClassName("script")[0].value}]);
        aiData = getLocalData("aiData");
    }
    document.getElementById("AIpage").remove();
    document.getElementById("AIdemo").remove();
    document.getElementById("AIlabelDemo").remove();
    setUpAIdata(aiData);
    (currentID == 0)?openAI(currentID):openAI(currentID-1);
}
setUpAIpage();


createAIpage = function(){
    if(creatingCheck) return;
    creatingCheck = true;
    document.getElementById("AIpage").style.display = "none";
    addAIPage({id:"new", name:`New algorithm`});
    document.getElementById("AInew").checked = true;

    AIpageBox.appendChild((function(){
        let newPage = document.createElement("div");
    newPage.id = "newAIpage";
    newPage.appendChild((function(){
        let tmpElement = document.createElement("div");
        tmpElement.className = "newAiName";
        tmpElement.textContent = "New algorithm";
        tmpElement.contentEditable = true;
        tmpElement.spellcheck = false;
        return tmpElement;
    })());
    newPage.appendChild((function(){
        let tmpElement = document.createElement("textarea");
        tmpElement.className = "newAiDescription";
        tmpElement.spellcheck = false;
        tmpElement.placeholder = defaultAiMenu.childNodes[5].childNodes[1].childNodes[3].value;
        return tmpElement;
    })());
    newPage.appendChild((function(){
        let tmpElement = document.createElement("textarea");
        tmpElement.className = "newScript";
        tmpElement.textContent = "//Please write your script here!"
        tmpElement.spellcheck= false;
        return tmpElement;
    })());
    newPage.appendChild((function(){
        let tmpElement = document.createElement("button");
        tmpElement.className = "btn";
        tmpElement.textContent = "保存";
        tmpElement.addEventListener("click", function(){
            let newPage = document.getElementById("AIpageBox");
            aiData.push({name:newPage.getElementsByClassName("newAiName")[0].textContent,description:newPage.getElementsByClassName("newAiDescription")[0].value, script:newPage.getElementsByClassName("newScript")[0].value});
            setLocalData("aiData", aiData);
            aiData[aiData.length-1].id = aiData.length-1;
            addAIPage(aiData[aiData.length-1]);
            openAI(aiData.length-1);
            document.getElementById("AIpage").style.display = "block";
            creatingCheck = false;
        }, false);
        return tmpElement;
    })());
    return newPage;
    })());
}
saveAIpage = function(){
    if(creatingCheck) return;
    document.getElementById("AIlabel"+currentID).textContent = document.getElementsByClassName("aiName")[0].innerHTML;
    aiData[currentID].name = document.getElementsByClassName("aiName")[0].innerHTML;
    aiData[currentID].description = document.getElementsByClassName("aiDescription")[0].value;
    aiData[currentID].script = document.getElementsByClassName("script")[0].value;
    setLocalData("aiData", aiData);
    editStyle.innerHTML = "";
    openAI(currentID);
}
deleteAIpage = function(){
    aiData.splice(currentID, 1);
    setLocalData("aiData", aiData);
    //console.log(defaultAiMenu.childNodes);
    aiSelector.innerHTML = defaultAiMenu.childNodes[3].innerHTML;
    AIpageBox.innerHTML = defaultAiMenu.childNodes[5].innerHTML;
    setUpAIpage();
}
})(document);