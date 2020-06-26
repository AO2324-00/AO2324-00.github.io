"use.strict";
/**
 * タイトルや勝敗、ターン表示や分身などのUIを表示するエレメントのデータ
 */
let result = document.getElementById("result");

/**
 * 手のエレメントデータと、指の数を保持する連想配列
 * 例
 * 　hands["friend"]["left"] プレイヤーの左手
 * 　hands["enemy"]["right"].value 相手の右手の指の数(0 ~ 5)
 */
let hands = {
    "friend":{
        "left":document.getElementById("friend").getElementsByClassName("hands")[0].getElementsByClassName("left")[0],
        "right":document.getElementById("friend").getElementsByClassName("hands")[0].getElementsByClassName("right")[0]
    }, "enemy":{
        "left":document.getElementById("enemy").getElementsByClassName("hands")[0].getElementsByClassName("left")[0],
        "right":document.getElementById("enemy").getElementsByClassName("hands")[0].getElementsByClassName("right")[0]
    }}

/**
 * 指の数を手のimgタグに保持させるために、pointAdd関数を用いてvalue属性を持たせる
 */
for(let foe in hands) for(let lor in hands[foe]) pointAdd(foe, lor, null);

/**
 * 初期画面で手をクリックできないようにする
 */
changeAllStyle("pointerEvents", "none");

/**
 * 引数foe、lorを用いて指定した手の指の数に、引数numを加算する(5以上になる場合は余りを設定する)
 * 引数numがnullの場合は強制的に手をパーにする
 * @param {String} foe friend or enemy
 * @param {String} lor left or right
 * @param {Number} num 足し合わせる指の数
 */
function pointAdd(foe, lor, num){
    if(num == null){
        hands[foe][lor].value = 5;
        hands[foe][lor].src = `./resources/hand5.png`;
        return;
    }
    hands[foe][lor].value = (hands[foe][lor].value + num)%5;
    hands[foe][lor].src = `./resources/hand${hands[foe][lor].value}.png`;
}

/**
 * すべての手に指定したcssを適用させる
 * @param {String} name cssのプロパティ名
 * @param {String} value cssのプロパティの値
 */
function changeAllStyle(name,value){
    for(let foe in hands) for(let lor in hands[foe]) hands[foe][lor].style[name] = value;
}

/**
 * currentTurn : 現在のターンのユーザ (friend or enemy)
 * currentState : 行動を行う手 (left or right)
 */
let currentTurn = "friend",currentState="";

/**
 * ユーザの行動により処理を行う
 * @param {String} foe 行動を起こした手の情報 (friend or enemy)
 * @param {String} lor 行動を起こした手の情報 (left or right)
 */
function action(foe, lor){
    changeAllStyle("opacity", "1.0");
    if(currentTurn == foe && currentState == "" && hands[foe][lor].value != 0) {
        currentState = lor;
        hands[foe][lor].style.opacity ="0.5";
    } else if(currentTurn == foe && currentState == lor) currentState = "";
    else if(currentTurn != foe && !currentState == ""){
        pointAdd(foe, lor, hands[currentTurn][currentState].value);
        continueGame();
    } else if(!currentState == ""){
        selectingFriend(foe, lor);
    }
}

/**
 * 自分自身の手に対して行動を起こしたときの処理 (分身時に何本の指を動かすかのセレクタを表示させる)
 * @param {String} foe 行動を起こした手の情報 (friend or enemy)
 * @param {String} lor 行動を起こした手の情報 (left or right)
 */
function selectingFriend(foe, lor){
    let resultText = "";
    for(let count = 1; count <= hands[currentTurn][currentState].value; count++){
        resultText += `<img class="fingerSelector" src="./Resources/hand${count}.png" onclick="selectedFriend('${foe}','${lor}',${count})">`;
    }
    result.innerHTML = resultText;
}

/**
 * 分身時の指の足し引きを行う
 * @param {String} foe 行動を起こした手の情報 (friend or enemy)
 * @param {String} lor 行動を起こした手の情報 (left or right)
 * @param {Number} num 分身時に動かす指の数
 */
function selectedFriend(foe, lor, num){
    pointAdd(currentTurn, currentState, -num);
    pointAdd(foe, lor, num);
    continueGame();
}

/**
 * ターンを次に進める
 * もしどちらかの指が0になったとき、終了処理に移行させる
 */
function continueGame(){
    let defeat = {"friend":false, "enemy":false};
    for(let foe in hands)
        if(hands[foe].left.value == 0 && hands[foe].right.value == 0) defeat[foe] = true;
    if(defeat["friend"] || defeat["enemy"]) endGame(defeat);
    else {
        if(currentTurn == "enemy") {
            changeAllStyle("pointerEvents", "auto");
            changeAllStyle("cursor", "pointer");
        } else {
            changeAllStyle("pointerEvents", "none");
            changeAllStyle("cursor", "defalt");
        }
        (currentTurn == "enemy")?currentTurn="friend":currentTurn="enemy";
        currentState = "";
        result.innerHTML = document.getElementById(currentTurn).getElementsByClassName("name")[0].textContent + "のターンです";
    }
    if(currentTurn == "enemy") setTimeout(function(){
        bot({"left":hands["enemy"]["left"].value, "right":hands["enemy"]["right"].value}, {"left":hands["friend"]["left"].value, "right":hands["friend"]["right"].value});
    }, 1000);
}

/**
 * ゲームの開始処理
 */
function startGame(){
    currentTurn = (Math.floor(Math.random()*2) == 0)?"friend":"enemy";
    currentState="";
    for(let foe in hands) for(let lor in hands[foe]) pointAdd(foe, lor, 1);
    changeAllStyle("pointerEvents", "auto");
    changeAllStyle("cursor", "pointer");
    result.innerHTML = document.getElementById(currentTurn).getElementsByClassName("name")[0].textContent + "のターンです";
    if(currentTurn == "enemy") setTimeout(function(){
        bot({"left":hands["enemy"]["left"].value, "right":hands["enemy"]["right"].value}, {"left":hands["friend"]["left"].value, "right":hands["friend"]["right"].value});
    }, 1000);
}

/**
 * ゲームの終了処理
 * 勝敗を表示する
 * @param {friend: boolean, enemy: boolean} defeat プレイヤの勝敗を保持する連想配列
 */
function endGame(defeat){
    let resultText = "";
    if(defeat.friend) resultText += `<span onclick="startGame()">${document.getElementById("enemy").getElementsByClassName("name")[0].textContent}の勝利です<br>もう一度プレイする</span>`;
    else  resultText += `<span onclick="startGame()">${document.getElementById("friend").getElementsByClassName("name")[0].textContent}の勝利です<br>もう一度プレイする</span>`;
    result.innerHTML = resultText;
    for(let foe in hands) for(let lor in hands[foe]) pointAdd(foe, lor, null)
    changeAllStyle("pointerEvents", "none");
    changeAllStyle("cursor", "defalt");
}

//======================================
const botActLeft = (param1, param2)=>(
    (param1 == "friend")?(function(){
        if(param2 > hands["enemy"]["left"].value || param2 < 1) {
            console.error("AIが分身する際の指の数の指定に誤りがあります");
            return;
        }
        action("enemy", "left");
        action("enemy", "right");
        selectedFriend("enemy", "right", param2);
    })():(function(){
        action("enemy", "left");
        action("friend", param2);
    })()
);
const botActRight = (param1, param2)=>(
    (param1 == "friend")?(function(){
        if(param2 > hands["enemy"]["right"].value || param2 < 1) {
            console.error("AIが分身する際の指の数の指定に誤りがあります");
            return;
        }
        action("enemy", "right");
        action("enemy", "left");
        selectedFriend("enemy", "left", param2);
    })():(function(){
        action("enemy", "right");
        action("friend", param2);
    })()
);
function myHand(leftOrRight){
    if(leftOrRight == "left") return {"to":botActLeft}
    else return {"to":botActRight}
}