let bgm_list = ["Close_Room_1_Gillthim.ogg", "Close_Room_2_Gillthim.ogg"];
let se_list = ["01Paper.wav", "02Call.wav", "03Notification.wav", "04OpenDoor.wav", "05Correct_answer.wav"];

let mute = true;
let bgm_num = -1;

function sounds_load(){
    let sound_tmp;
    for (let count = 0; count < bgm_list.length; count++){
        sound_tmp = "./data_bgm/" + bgm_list[count];
        bgm_list[count] = new Audio();
        bgm_list[count].src = sound_tmp;
        bgm_list[count].load();
        bgm_list[count].addEventListener("ended",function () {
            bgm_list[count].currentTime = 0;
            bgm_list[count].play();
        }, false);
        console.log(bgm_list);
    }
    for (let count = 0; count < se_list.length; count++){
        sound_tmp = "./data_se/" + se_list[count];
        se_list[count] = new Audio();
        se_list[count].src = sound_tmp;
        se_list[count].load();
        se_list[count].volume = 0.5;
    }
}
function sounds_mute(){
    let change = function (){
        for (let count = 0; count < bgm_list.length; count++){
            bgm_list[count].muted = mute;
        }
        for (let count = 0; count < se_list.length; count++){
            se_list[count].muted = mute;
        }
    };
    if ( mute == false ) {
        mute = true 
        change();
    }else {
        mute = false;
        change();
    }
    se_list[2].play();
}

const bgm = new Audio();
const se = new Audio();


function se_player (sceneP){
    se_list[sceneP[1]].play();
}

function bgm_player (sceneP){
    switch (sceneP[1]) {
        case "play":
                console.log("bgmplay_num"+bgm_num);
                if (bgm_num != -1){
                    bgm_list[bgm_num].pause();
                    bgm_list[sceneP[2]].play();
                    bgm_list[bgm_num].currentTime = 0;
                    bgm_num = sceneP[2];
                } else {
                    bgm_list[sceneP[2]].play();
                    bgm_num = sceneP[2];
                }
                console.log("bgm_num:"+bgm_num);
            break;
        case "stop":
                console.log("bgmstop");
                bgm_list[bgm_num].pause();
                bgm_list[bgm_num].currentTime = 0;
                bgm_num = -1;
            break;
    
        default:
            break;
    }
}