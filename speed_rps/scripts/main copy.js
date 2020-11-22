"use strict";
(function(){

    const AI = class{
        #cards = null;
        #selectedCard = null;
        #difficulty = null;
        #state = false;
        #strategy = {0:2,1:0,2:1}
        #actLoop = null;
        constructor(cards, selectedCard, difficulty = 99){
            this.#cards = cards;
            this.#selectedCard = selectedCard;
            this.#difficulty = difficulty/2 + 4;
        }

        setDifficulty(difficulty){
            this.#difficulty = difficulty + 4;
        }

        switchState(flug = null){
            (flug == null)? this.#state = !this.#state : this.#state = flug;
            clearTimeout(this.#actLoop);
            this.action();
        }

        attack(randomNum){
            console.log(this.#cards.style.pointerEvents == "none" || this.#cards.getElementsByClassName("card")[0].style.pointerEvents == "none")
            if(this.#selectedCard.enemy != null || this.#cards.style.pointerEvents == "none" || this.#cards.getElementsByClassName("card")[0].style.pointerEvents == "none") return null;
            console.log(this.#selectedCard)
            if(!this.#selectedCard.player){
                return Math.floor(Math.random()*3);
            }
            switch (randomNum) {
                case (0):
                    return (this.#selectedCard.player+1)-Math.floor((this.#selectedCard.player+1)/3);
                case (1):
                    return this.#selectedCard.player;
                default:
                    return this.#strategy[this.#selectedCard.player];
            }
        }

        action(){
            //console.log("aaaaaaa")
            const randomNum = Math.floor(Math.random()*this.#difficulty);
            const tmp = this;
            if(!this.#state) return;
            this.#actLoop = setTimeout(function(){
                const result = tmp.attack(randomNum);
                //console.log(result)
                if(result != null){
                    console.log(tmp.#cards)
                    tmp.#cards.getElementsByClassName("card")[result].click();
                }
                tmp.action();
            }, (randomNum*100 > 2000)?2000:randomNum*100);
            
        }
    }

    const Character = class {
        #helth = 100;
        #attackable = true;
        #coolTime = 1500;
        #includeDamage = null;
        #gotDamage = 0;
        #stateChange = null
        constructor(stateChange = null) { /* コンストラクタ */
            this.#stateChange = stateChange;
        }

        getHelth(){
            return this.#helth;
        }

        resetState(){
            this.#helth = 100;
            this.#gotDamage = 0;
            this.#attackable = true;
            this.#stateChange();
        }

        hit(){
            const tmp = this;
            this.#includeDamage = setTimeout(function(){
                tmp.damage(1, true);
            }, 0);
        }

        damage(num, forever = false){
            this.#gotDamage += num;
            const tmp = this;
            if((this.#helth -= num) < 0) this.#helth = 0;
            else if(forever) this.#includeDamage = setTimeout(function(){
                tmp.damage(num, true);
            }, 50);
            this.#stateChange();
        }

        recover(num){
            this.#helth += num;
        }

        cover(result){
            clearTimeout(this.#includeDamage);
            switch (result) {
                case true:
                    this.recover(this.#gotDamage/2);
                    break;
                case false:
                    this.damage(this.#gotDamage/3+10);
                    break;
            
                default:
                    break;
            }
            this.#stateChange();
            this.#gotDamage = 0;
        }

        attack(){
            if(!this.#attackable) return;
            this.#attackable = false;
            this.#stateChange();
            const tmp = this;
            setTimeout(function(){
                tmp.#attackable =true;
                tmp.#stateChange();
            }, tmp.#coolTime);
        }

        isAttackable(){
            return this.#attackable;
        }
    }

    const selectedCard = {player:null, enemy:null};

    const enemy = {
        cards : document.getElementById("enemy").getElementsByClassName("card"),
        canAttack : true,
        change : ()=>{
            const hp = enemy.character.getHelth();
            document.getElementById("enemyHelth").style.width = `${hp}%`;
            if(hp > 50) document.getElementById("enemyHelth").style.backgroundColor = `rgb(${(255-255*hp/100)*2},255,50)`;
            else document.getElementById("enemyHelth").style.backgroundColor = `rgb(255,${255*hp/50},50)`;
            if(!hp) matchResult(true);
            if(enemy.canAttack != enemy.character.isAttackable()){
                enemy.canAttack = !enemy.canAttack;
                const tmp = document.getElementById("enemy").getElementsByClassName("cards");
                for(let cards of tmp) {
                    cards.style.opacity = (enemy.canAttack)?"1":"0.5";
                    cards.style.pointerEvents= (enemy.canAttack)?"auto":"none";
                }
            }
        },
        character : null

    }

    const player = {
        cards : document.getElementById("player").getElementsByClassName("card"),
        canAttack : true,
        change : ()=>{
            const hp = player.character.getHelth();
            document.getElementById("playerHelth").style.width = `${hp}%`;
            if(hp > 50) document.getElementById("playerHelth").style.backgroundColor = `rgb(${(255-255*hp/100)*2},255,50)`;
            else document.getElementById("playerHelth").style.backgroundColor = `rgb(255,${255*hp/50},50)`;
            if(!hp) matchResult(false);
            if(player.canAttack != player.character.isAttackable()){
                player.canAttack = !player.canAttack;
                const tmp = document.getElementById("player").getElementsByClassName("cards");
                for(let cards of tmp) {
                    cards.style.opacity = (player.canAttack)?"1":"0.5";
                    cards.style.pointerEvents= (player.canAttack)?"auto":"none";
                }
            }
        },
        character : null
    }

    function calcRCP(n1, n2){
        const result = (3 + n1 - n2) % 3;
        return (result)?(result == 2):null;
    }

    function msToTime(duration) {
        const hour = Math.floor(duration / 3600000);
        const minute = Math.floor((duration - 3600000 * hour) / 60000);

        const hh = ('00' + hour).slice(-2);
        const mm = ('00' + minute).slice(-2);
        const ms = ('00000' + (duration % 60000)).slice(-5);

        const time = `Time ${mm}:${ms.slice(0, 2)}:${ms.slice(2, 5)}`;

        return time
    }

    function matchResult(flug){
        enemyAI.switchState(false);
        document.getElementById("result").style.display = "";
        console.log("flug: "+flug);
        document.getElementById("displayBox").style.pointerEvents = "none";
        document.getElementById("resultText").textContent = (flug)?"You win!":"You lose...";
        document.getElementById("resultTime").textContent = msToTime(new Date() - new Date(startTime));
        document.getElementById("currentLevel").textContent = (inputDifficulty.value == 100)?"Max":inputDifficulty.value;
        document.getElementById("UI").style.display = "";
        
    }

    function resetRadioBtn(){
        for(let card of enemy.cards) card.style.pointerEvents = "";
        for(let card of player.cards) card.style.pointerEvents = "";
        const tmp = document.getElementsByClassName("inputOfCard");
        for(let input of tmp){
            input.checked = false;
        }
    }

    for(let i = 0; i < enemy.cards.length; i++){
        enemy.cards[i].addEventListener("click",()=>{
            if(selectedCard.enemy || !enemy.character.isAttackable()) return;
            selectedCard.enemy = i;
            if(selectedCard.player != null){
                const result = calcRCP(selectedCard.enemy, selectedCard.player);
                enemy.character.cover(result);
                setTimeout(function(){
                    resetRadioBtn()
                }, 400);
                selectedCard.player = null;
                selectedCard.enemy = null;
            } else {
                for(let card of enemy.cards) card.style.pointerEvents = "none";
                document.getElementById(`e${selectedCard.enemy}`).checked = true;
                player.character.hit();
                enemy.character.attack()
            }
        });
    }

    for(let i = 0; i < player.cards.length; i++){
        player.cards[i].addEventListener("click",()=>{
            if(selectedCard.player || !player.character.isAttackable()) return;
            selectedCard.player = i;
            if(selectedCard.enemy != null){
                const result = calcRCP(selectedCard.player, selectedCard.enemy);
                player.character.cover(result);
                setTimeout(function(){
                    resetRadioBtn()
                }, 400);
                selectedCard.player = null;
                selectedCard.enemy = null;
            } else {
                for(let card of player.cards)card.style.pointerEvents = "none";
                document.getElementById(`p${selectedCard.player}`).checked = true;
                enemy.character.hit();
                player.character.attack()
            }
        });
    }
    const enemyAI = new AI(document.getElementById("enemy").getElementsByClassName("cards")[0], selectedCard);

    enemy.character = new Character(enemy.change);
    player.character = new Character(player.change);

    const playBtns = document.getElementsByClassName("playBtn");
    for(let i = 0; i < playBtns.length; i++){
        playBtns[i].addEventListener("click",()=>{
            gameStart();
        });
    }
    function gameStart(){
        document.getElementById("title").style.display = "none";
        document.getElementById("result").style.display = "none";
        document.getElementById("displayBox").style.pointerEvents = "auto";
        enemy.character.resetState();
        player.character.resetState();
        resetRadioBtn();
        selectedCard.player = null;
        selectedCard.enemy = null;
        setTimeout(function(){
            startCounter(0);
        }, 0);
    }

    const inputDifficulty = document.getElementById("difficulty");
    inputDifficulty.addEventListener("change", ()=>{
        console.log(inputDifficulty.value > 100)
        if(inputDifficulty.value > 100) inputDifficulty.value = 100;
        else if(inputDifficulty.value < 1) inputDifficulty.value = 1;
        console.log("Difficulty: " + (100-Number(inputDifficulty.value)));
        enemyAI.setDifficulty(100-Number(inputDifficulty.value));
    });

    const startCount = ["Are you ready?", "3", "2", "1", "Pon!", ""];
    let startTime = null;

    function startCounter(count){
        const counter = document.getElementById("startCounter");
        counter.textContent = startCount[count++];
        if(count == startCount.length) {
            enemyAI.switchState(true);
            document.getElementById("UI").style.display = "none";
            startTime = new Date();
            return;
        }
        setTimeout(function(){
            startCounter(count);
        }, 1000);
    }
    

})();