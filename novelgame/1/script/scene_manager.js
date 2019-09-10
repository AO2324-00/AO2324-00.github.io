
let name_box;
let text_box;
let text_display_speed;

let text_displaying = false;
let text_display_loop;

let choice_window;

function span (num){
    return new Promise(function(resolve) { 
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

function text_display (name, text, sce_count, string_counter = 0){
    if (text_displaying == true){
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
            se_list[Number(text.slice(str_counter_S , str_counter) )].play();
        }
        if (str_counter != text.length) {
            if (scene_count == sce_count){
                text_display_loop = setTimeout("text_display ('"+ name +"', '"+text+"', "+ sce_count +", "+ (str_counter+1) +")", text_display_speed);
            } else {
                setTimeout("text_display ('"+ name +"', '"+text+"', "+ sce_count +", "+ text.length +")", 0);
                text_displaying = false;
            }
            
        } else text_displaying = false;
    }
}

function choiceBtn(sceneP) {
    text_displaying = true;
    text_display( sceneP[1], sceneP[2], scene_count );
    return new Promise(function(resolve) {
        for (let count = 0; count < sceneP[3].length; count++) {
            (function(countIn) {
                choice_window.insertAdjacentHTML('beforeend', '<button id="choiceBtn'+countIn+'" class="choiceBtn">'+sceneP[3][countIn]+'</button>');
                document.getElementById("choiceBtn"+countIn).addEventListener("click", async function(){
                    choice_window.innerHTML = "";
                    clearTimeout(text_display_loop);
                    switch (sceneP[4+countIn][0]) {
                        case "next":
                                text_box.style.cursor = 'pointer';
                                await nextBtn(sceneP[4+countIn]);
                                text_box.style.cursor = 'default';
                            break;
                        case "choice":
                                await choiceBtn(sceneP[4+countIn]);
                            break;
                        case "switch":
                                await switchBtn(sceneP[4+countIn]);
                            break;
                        case "bgm":
                                bgm_player(sceneP[4+countIn]);
                            break;
                        case "se":
                                se_player(sceneP[4+countIn]);
                            break;
                        case "fead":
                                await fade(sceneP[4+countIn][1]);
                            break;
                        case "span":
                                await span(sceneP[4+countIn][1]);
                            break;
                        case "darkening":
                                document.getElementById('still_box').className = 'black';
                            break;
                        case "background_image":
                                background_image(sceneP[4+countIn][1]);
                            break;
                        case "character_image":
                                character_image(sceneP[4+countIn]);
                            break;
                        case "change_scene":
                                scene_number = sceneP[4+countIn][1];
                                scene_count = 0;
                                scene_play () ;
                            return;
                        case "loop":
                                text_box.style.cursor = 'pointer';
                                await nextBtn(sceneP[4+countIn]);
                                text_box.style.cursor = 'default';
                                scene_count --;
                            break;
                        case "skip":
                            break;
                        default:
                            break;
                    }
                    resolve();
                }, {once: true});
            })(count);
        }
    });
}

async function switchBtn(sceneP) {
    let count;
    for (let counter = 0; counter < sceneP[2].length; counter++) {
        if (sceneP[1] == sceneP[2][counter] ){
            count = counter;
        } else {
            count = sceneP[2].length-1;
        }
    }
            switch (sceneP[3+count][0]) {
                case "next":
                        text_box.style.cursor = 'pointer';
                        console.log(sceneP[3+count]);
                        await nextBtn(sceneP[3+count]);
                        text_box.style.cursor = 'default';
                    break;
                case "choice":
                        await choiceBtn(sceneP[3+count]);
                    break;
                case "switch":
                        await switchBtn(sceneP[3+count]);
                    break;
                case "bgm":
                        bgm_player(sceneP[3+count]);
                    break;
                case "se":
                        se_player(sceneP[3+count]);
                    break;
                case "fead":
                        await fade(sceneP[3+count][1]);
                    break;
                case "span":
                        await span(sceneP[3+count][1]);
                    break;
                case "darkening":
                        document.getElementById('still_box').className = 'black';
                    break;
                case "background_image":
                        background_image(sceneP[3+count][1]);
                    break;
                case "character_image":
                        character_image(sceneP[3+count]);
                    break;
                case "finish":
                        document.getElementById("frame_effect").className = 'fadeout';
                        await span(1500);
                        btn("credit");
                    break;
                case "change_scene":
                        scene_number = sceneP[3+count][1];
                        scene_count = 0;
                        scene_play () ;
                    return;
                case "loop":
                        text_box.style.cursor = 'pointer';
                        await nextBtn(sceneP[3+count]);
                        text_box.style.cursor = 'default';
                        scene_count --;
                    break;
                case "skip":
                    break;
                default:
                    break;
            }
}

function next() {
    return new Promise(function(resolve) {
        text_box.addEventListener("click", resolve, {once: true});
    });
}
async function nextBtn(sceneP) {
    text_displaying = true;
    text_display( sceneP[1], sceneP[2], scene_count );
    await next(sceneP);
    if (text_displaying == true) {
        text_displaying = false;
        clearTimeout( text_display_loop );
        text_box.innerHTML = sceneP[2];
        if (sceneP[2].indexOf('[') !== -1){
            se_list[Number(sceneP[2].match(/\[(.*?)\]/)[0].replace(/\[|\]/g, ''))].play();
        }
        await next(sceneP);
    }
}


async function scene_play () {
    name_box = document.getElementById("name_box");
    text_box = document.getElementById("text_box");

    choice_window = document.getElementById("choice_window");
    while(scene_count != scene_list[scene_number].length) {
        let sceneP = scene_list[scene_number][scene_count];
        switch (sceneP[0] ) {
            case "text":
                text_box.style.cursor = 'pointer';
                await nextBtn(sceneP);
                text_box.style.cursor = 'default';
                break;

            case "choice":
                    await choiceBtn(sceneP);
                break;

            case "switch":
                    await switchBtn(sceneP);
                break;

            case "bgm":
                    bgm_player(sceneP);
                break;
            case "se":
                    se_player(sceneP);
                break;
            case "fead":
                    await fade(sceneP[1]);
                break;
            case "span":
                    await span(sceneP[1]);
                break;
            case "darkening":
                    document.getElementById('still_box').className = 'black';
                break;
            case "background_image":
                    background_image(sceneP[1]);
                break;
            case "character_image":
                    character_image(sceneP);
                break;
            case "finish":
                    document.getElementById("frame_effect").className = 'fadeout';
                    await span(1500);
                    btn("credit");
                break;
            case "change_scene":
                    scene_number = sceneP[1];
                    scene_count = 0;
                    scene_play () ;
                return;
            default:
                break;
        }

        scene_count++;
    }
}