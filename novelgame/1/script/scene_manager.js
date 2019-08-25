
let name_box;
let text_box;
let text_display_speed;

let text_displaying = false;
let text_display_loop;

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
                choice_window.insertAdjacentHTML('beforeend', '<button id="choiceBtn'+countIn+'" class="choiceBtn font_size">'+sceneP[3][countIn]+'</button>');
                document.getElementById("choiceBtn"+countIn).addEventListener("click", async function(){
                    choice_window.innerHTML = "";
                    clearTimeout(text_display_loop);
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
        console.log('scene'+ scene_count + '(' + sceneP[0] + ')');
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
            case "background_image":
                    background_image(sceneP[1]);
                    console.log("clicked");
                break;
            case "character_image":
                    character_image(sceneP);
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
        scene_count++;
    }
}