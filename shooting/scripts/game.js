class Game {
    _enemy_list = [];

    onShot = function(){};

    onHit = function(){};

    MAX_CAPACITY;
    capacity;

    constructor(capacity=50, start=function(){}){
        const ground = document.getElementById("ground");
        this.capacity = capacity;
        this.MAX_CAPACITY = capacity;

        const clickEvent_ground = (e)=>{
            if( !this.shot(e) ) return;
            const height = ground.getBoundingClientRect().height;
            const range = (height - (e.clientY - ground.getBoundingClientRect().top))/height*10;
            Sound.hit('ground',range);
        }
        ground.addEventListener('touchstart', (e)=>clickEvent_ground(e) );
        ground.onmousedown = (e)=>clickEvent_ground(e);

        for(let box of document.getElementsByClassName("targetBox")) {
            const clickEvent_box = (e)=>{
                if( !this.shot(e) ) return;
                const position = box.getBoundingClientRect().bottom;
                const window_height = window.innerHeight;
                const range = (window_height - position)/window_height+0.2;
                Sound.hit('wall',range);

                const bulletMark = document.createElement("div");
                bulletMark.className = "bulletMark";
                bulletMark.style.top = `calc(${((e.clientY || e.touches[0].clientY) - box.getBoundingClientRect().top)/box.clientHeight*100}% + ${Math.random()*4 - 2}px)`;
                bulletMark.style.left = `calc(${((e.clientX || e.touches[0].clientX) - box.getBoundingClientRect().left)/box.clientWidth*100}% + ${Math.random()*4 - 2}px)`;
                box.appendChild(bulletMark);
            }
            box.addEventListener('touchstart', (e)=>clickEvent_box(e) );
            box.onmousedown = (e)=>clickEvent_box(e);
        }
        
        const clickEvent_body = (e)=>{
            this.shot(e);
        }
        document.body.addEventListener('touchstart', (e)=>clickEvent_body(e) );
        document.body.onmousedown = (e)=>clickEvent_body(e);
        start(this);
    }

    shot(e) {
        e.stopPropagation();
        if(this.capacity == 0) {
            Sound.empty();
            return false;
        }
        this.capacity--;
        this.onShot(this);
        Sound.shot(true);
        return true;
    }

    reload() {
        this.capacity = this.MAX_CAPACITY;
        Sound.empty();
        document.getElementById("ui").textContent = `${this.capacity}/${this.MAX_CAPACITY}`;
    }

    createEnemy(box_type, position = 0.5, deley = 0, speed = 0) {
        if(!["Top", "Middle", "Bottom"].includes(box_type) || isNaN(position)) return;

        if(position < 0) position = 0;
        else if(1 < position) position = 1;
        const newEnemy = document.createElement("div");

        newEnemy.className = "target hide";
        document.getElementById(`targetOn${box_type}`).appendChild(newEnemy);
        this._enemy_list.push(newEnemy);
        

        // 移動
        function move(newEnemy, speed, max_position){
            if(!(newEnemy.parentNode?.clientWidth && newEnemy.clientWidth)) return;
            if((newEnemy.className.match(/hide/))) return;
            const current_max_position = newEnemy.parentNode.clientWidth - newEnemy.clientWidth;
            const magnification = (max_position)? current_max_position/max_position : 1;
            const position = Number("0" + newEnemy.style.left.replace(/[^0-9.]/g, ''));
            const new_position = position * magnification + speed;

            max_position = current_max_position;

            newEnemy.style.left = `${new_position}px`;
            if(new_position < 0 || max_position < new_position) {
                speed = -speed;
                if(new_position < -Math.abs(speed)) newEnemy.style.left = `0px`;
                else if( max_position + Math.abs(speed) < new_position) newEnemy.style.left = `${max_position}px`;
            }
            setTimeout(() => {
                move(newEnemy, speed, max_position);
            }, 10);
        }

        setTimeout(function(){
            if(!(newEnemy.parentNode?.clientWidth && newEnemy.clientWidth)) return;
            newEnemy.style.left = `${(newEnemy.parentNode.clientWidth - newEnemy.clientWidth)*position}px`;
            newEnemy.className = "target";
            if(speed) move(newEnemy, speed);
        }, deley);

        const clickEvent_target = (e)=>{
            if( !this.shot(e) ) return;
            const position = newEnemy.getBoundingClientRect().bottom;
            const window_height = window.innerHeight;
            const range = (window_height - position)/window_height;
            Sound.hit('target',range);
            this.onHit(e);
            newEnemy.classList.add("hide");
        }
        newEnemy.addEventListener('touchstart', (e)=>clickEvent_target(e) );
        newEnemy.onmousedown = (e)=>clickEvent_target(e);

        return newEnemy;
    }

    deleteAllEnemy() {
        for(let enemy of this._enemy_list) enemy.remove();
        this._enemy_list = [];
    }
}

document.getElementById("ui").innerHTML = `<span onclick="startGame()">Click to start!</span>`;
const game = new Game(20);

function startGame() {
    game.reload();
    game.deleteAllEnemy();
    const startTime = performance.now();
    let hitCounter = 0;

    document.getElementById("ui").textContent = `${game.capacity}/${game.MAX_CAPACITY}`;

    const Timer = setInterval(() => {
        drawUi(game, startTime, hitCounter);
    }, 100);

    game.onShot = function(e){
        document.getElementById("ui").textContent = `${e.capacity}/${e.MAX_CAPACITY}`;
        drawUi(game, startTime, hitCounter);
        if(!e.capacity) finish(startTime, hitCounter, Timer);
    }

    const EnemyList = [
        [
            {type: getRandomType(), position: Math.random(), deley: Math.random()*100, speed: 0},
            {type: getRandomType(), position: Math.random(), deley: Math.random()*100, speed: 0},
            {type: getRandomType(), position: Math.random(), deley: Math.random()*100, speed: 0},
            {type: getRandomType(), position: Math.random(), deley: Math.random()*100, speed: 0}
        ],
        [
            {type: getRandomType(), position: Math.random(), deley: Math.random()*100, speed: 1 + Math.random()*2},
            {type: getRandomType(), position: Math.random(), deley: Math.random()*100, speed: 1 + Math.random()*2},
            {type: getRandomType(), position: Math.random(), deley: Math.random()*100+1000, speed: 1 + Math.random()*2},
            {type: getRandomType(), position: Math.random(), deley: Math.random()*100, speed: -1 - Math.random()*2},
            {type: getRandomType(), position: Math.random(), deley: Math.random()*100, speed: -1 - Math.random()*2},
            {type: getRandomType(), position: Math.random(), deley: Math.random()*100+1000, speed: -1 -Math.random()*2}
        ],
        [
            {type: getRandomType(), position: Math.random(), deley: Math.random()*100, speed: 9+Math.random()*2},
            {type: getRandomType(), position: Math.random(), deley: Math.random()*100, speed: 9+Math.random()*2},
            {type: getRandomType(), position: Math.random(), deley: Math.random()*100, speed: -9-Math.random()*2},
            {type: getRandomType(), position: Math.random(), deley: Math.random()*100, speed: -9-Math.random()*2}
        ],
        [
            {type: getRandomType(), position: Math.random(), deley: Math.random()*100, speed: 12 + Math.random()*2},
            {type: getRandomType(), position: Math.random(), deley: Math.random()*100, speed: -12 - Math.random()*2},
            {type: getRandomType(), position: Math.random(), deley: Math.random()*100, speed: 16+Math.random()*2},
            {type: getRandomType(), position: Math.random(), deley: Math.random()*100, speed: -16-Math.random()*2},
            {type: getRandomType(), position: Math.random(), deley: Math.random()*100+1000, speed: 20+Math.random()*2},
            {type: getRandomType(), position: Math.random(), deley: Math.random()*100+1000, speed: -20-Math.random()*2},
        ]
    ];

    for(let Enemy of EnemyList[0]){
        game.createEnemy(Enemy.type, Enemy.position, Enemy.deley, Enemy.speed);
    }

    game.onHit = function(e){
        hitCounter++;
        let enemy_count = 0;
        for(let i = 0; i < EnemyList.length; i++){
            if(hitCounter == (enemy_count += EnemyList[i].length)){
                if(i == EnemyList.length-1) return finish(startTime, hitCounter, Timer);
                for(let Enemy of EnemyList[i+1]){
                    game.createEnemy(Enemy.type, Enemy.position, Enemy.deley, Enemy.speed);
                }
            }
        }
    }
}

function drawUi(game, startTime, hitCount) {
    const score = (hitCount*100-(performance.now()-startTime)/20);
    document.getElementById("ui").innerHTML = `
    <span>${game.capacity}/${game.MAX_CAPACITY}</span><br>
    <span>Score: ${Math.round(score)}</span>
    `;
}

function finish(startTime, hitCount, Timer) {
    clearInterval(Timer);
    const score = (hitCount*100-(performance.now()-startTime)/20);
    document.getElementById("ui").innerHTML = `
        <span onclick="startGame()">Click to restart!</span><br>
        <span>Your score is ${Math.round(score)}</span>
    `;
}

function getRandomType() {
    return ["Top", "Middle", "Bottom"][Math.floor(Math.random()*3)];
}