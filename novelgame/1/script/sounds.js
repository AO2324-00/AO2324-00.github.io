let bgm_list = ["Close_Room_1_Gillthim.mp3", "Close_Room_2_Gillthim.mp3", "Lets_Go_to_the_dinnor.mp3"]; //BGMの名前と拡張子
let se_list = ["01Paper.wav", "02Call.wav", "03Notification.wav", "04OpenDoor.wav", "05Correct_answer.wav"]; //SEの名前と拡張子

let mute = true;
let bgm_num = -1;

let loop_bgm_timeout;

function loop_bgm ( num ) {
    bgm_list[num].currentTime = 0;
    if (bgm_num == num){
        bgm_list[num].play();
        loop_bgm;
        loop_bgm_timeout = setTimeout( 'loop_bgm ('+ num +')', (bgm_list[num].duration - 0.022)*1000 );
    }
}

(function(){
    let sound_tmp;
    for (let count = 0; count < bgm_list.length; count++){
        sound_tmp = "./data_bgm/" + bgm_list[count];
        bgm_list[count] = new Audio();
        bgm_list[count].src = sound_tmp;
        bgm_list[count].load();
        bgm_list[count].muted = mute;
    }
    for (let count = 0; count < se_list.length; count++){
        sound_tmp = "./data_se/" + se_list[count];
        se_list[count] = new Audio();
        se_list[count].src = sound_tmp;
        se_list[count].load();
        se_list[count].muted = mute;
    }
})();
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
    se_list[2].currentTime = 0;
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
                if (bgm_num != -1){
                    bgm_list[bgm_num].pause();
                    bgm_list[sceneP[2]].play();
                    bgm_list[bgm_num].currentTime = 0;
                    bgm_num = sceneP[2];
                    loop_bgm_timeout = setTimeout( 'loop_bgm ('+ sceneP[2] +')', (bgm_list[sceneP[2] ].duration - 0.022)*1000 );
                } else {
                    bgm_list[sceneP[2]].play();
                    bgm_num = sceneP[2];
                    loop_bgm_timeout = setTimeout( 'loop_bgm ('+ sceneP[2] +')', (bgm_list[sceneP[2] ].duration - 0.022)*1000 );
                }
            break;
        case "stop":
                bgm_list[bgm_num].pause();
                bgm_list[bgm_num].currentTime = 0;
                bgm_num = -1;
            break;
    
        default:
            break;
    }
}