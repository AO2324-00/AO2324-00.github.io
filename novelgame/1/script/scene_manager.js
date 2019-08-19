const bgm = new Audio();
const se = new Audio();

let name_box;
let text_box;
let text_display_speed = 60;

let choice_window;

function span (num){
    return new Promise(function(resolve) { 
        console.log("span:"+num);
        setTimeout(function() { resolve() }, num);
    });
}

function fade (option = "normal"){
    const still_box = document.getElementById('still_box');
    switch (option) {
        case 'normal':
            return new Promise(function(resolve) {
                still_box.className = 'fade';
                still_box.classList.toggle('fade');
                still_box.offsetWidth = still_box.offsetWidth;
                still_box.classList.toggle('fade');    
                setTimeout(function() { resolve() }, 3000);
            });
        case 'in':
            return new Promise(function(resolve) {
                still_box.className = 'fadein';
                still_box.classList.toggle('fadein');
                still_box.offsetWidth = still_box.offsetWidth;
                still_box.classList.toggle('fadein');    
                setTimeout(function() { resolve() }, 1000);
            });
        case 'out':
            return new Promise(function(resolve) {
                still_box.className = 'fadeout';
                still_box.classList.toggle('fadeout');
                still_box.offsetWidth = still_box.offsetWidth;
                still_box.classList.toggle('fadeout');    
                setTimeout(function() { resolve() }, 1000);
            });
        default:
            break;
    }
}

function se_player (sceneP){
    se.src = sceneP[1];
    se.play();
}

bgm.addEventListener("ended",function () {
    bgm.currentTime = 0;
    bgm.play();
}, false);
function bgm_player (sceneP){
    switch (sceneP[1]) {
        case "play":
                console.log("bgmplay");
                bgm.src = sceneP[2];
                bgm.play();
            break;
        case "stop":
                console.log("bgmstop");
                bgm.pause();
                bgm.currentTime = 0;
            break;
    
        default:
            break;
    }
}

function text_display (name, text, sce_count, string_counter = 0){

    let str_counter = string_counter;
    if (name == "descriptive"){
        name_box.innerHTML = '';
    }else {
        name_box.innerHTML = '<div id="name">'+name+'</div>';
    }
    
    if (text[str_counter] != "<"){
        text_box.innerHTML = text.slice(0 , str_counter);
    } else {
        while (text[str_counter] != ">"){
            str_counter++;
        }
    }
    if (text[str_counter] != "["){
        text_box.innerHTML = text.slice(0 , str_counter);
    } else {
        let str_counter_S = str_counter+1;
        while (text[str_counter] != "]"){
            str_counter++;
        }
        se.src = text.slice(str_counter_S , str_counter);
        se.play();
    }
    if (str_counter != text.length) {
        if (scene_count == sce_count){
            setTimeout("text_display ('"+ name +"', '"+text+"', "+ sce_count +", "+ (str_counter+1) +")", text_display_speed);
        } else {
            setTimeout("text_display ('"+ name +"', '"+text+"', "+ sce_count +", "+ text.length +")", 0);
        }
        
    }
}

function choiceBtn(sceneP) {
    text_display( sceneP[1], sceneP[2], scene_count );
    return new Promise(function(resolve) {
        for (let count = 0; count < sceneP[3].length; count++) {
            (function(countIn) {
                choice_window.insertAdjacentHTML('beforeend', '<button id="choiceBtn'+countIn+'" class="choiceBtn">'+sceneP[3][countIn]+'</button>');
                document.getElementById("choiceBtn"+countIn).addEventListener("click", async function(){
                    choice_window.innerHTML = "";
                    switch (sceneP[4+countIn][0]) {
                        case "next":
                                text_box.style.cursor = 'pointer';
                                await nextBtn(sceneP[4+countIn]);
                                text_box.style.cursor = 'default';
                                console.log("clicked");
                            break;
                        case "choice":
                                await choiceBtn(sceneP[4+countIn]);
                                console.log("clicked");
                            break;
                        case "change_scene":
                                scene_number = sceneP[4+countIn][1];
                                scene_count = 0;
                                console.log("clicked");
                                scene_play () ;
                            return;
                        case "loop":
                                text_box.style.cursor = 'pointer';
                                await nextBtn(sceneP[4+countIn]);
                                text_box.style.cursor = 'default';
                                console.log("clicked");
                                scene_count --;
                            break;
                        case "skip":
                            break;
                        default:
                            break;
                    }
                    
                    resolve(console.log("btn"+countIn));
                }, {once: true});
            })(count);
        }
    });
}
function nextBtn(sceneP) {
    text_display( sceneP[1], sceneP[2], scene_count );
    return new Promise(function(resolve) {
        text_box.addEventListener("click", resolve, {once: true});
    });
}


async function scene_play () {
    name_box = document.getElementById("name_box");
    text_box = document.getElementById("text_box");

    choice_window = document.getElementById("choice_window");
    while(scene_count != scene_list[scene_number].length) {
        //console.log(scene_list[scene_number][scene_count]);
        let sceneP = scene_list[scene_number][scene_count];
        switch (sceneP[0] ) {
            case "text":
                text_box.style.cursor = 'pointer';
                await nextBtn(sceneP);
                text_box.style.cursor = 'default';
                console.log("clicked");
                break;

            case "choice":
                await choiceBtn(sceneP);
                console.log("clicked");
                break;

            case "bgm":
                    bgm_player(sceneP);
                    console.log("clicked");
                break;
            case "se":
                    se_player(sceneP);
                    console.log("clicked");
                break;
            case "fead":
                    await fade(sceneP[1]);
                    console.log("clicked");
                break;
            case "span":
                    console.log("span load:"+sceneP[1]);
                    await span(sceneP[1]);
                    console.log("clicked");
                break;
            case "darkening":
                    document.getElementById('still_box').className = 'black';
                    console.log("clicked");
                break;
            case "change_scene":
                    scene_number = sceneP[1];
                    scene_count = 0;
                    console.log("clicked");
                    scene_play () ;
                return;
            default:
                break;
        }

        //let result = await choiceBtn(10);
        console.log(scene_count);
        scene_count++;
    }
}