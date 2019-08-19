const scene_default = document.getElementById("scene").outerHTML;
console.log(scene_default);

se.volume = 0.5;
const se_slider = document.getElementById("se_slider");
se_slider.addEventListener("change",function () {
    for (let count = 0; count < se_list.length; count++){
        se_list[count].volume = se_slider.value/100;
    }
    se.volume = se_slider.value/100;
});
bgm.volume = 0.5;
const bgm_slider = document.getElementById("bgm_slider");
bgm_slider.addEventListener("change",function () {
    for (let count = 0; count < bgm_list.length; count++){
        bgm_list[count].volume = bgm_slider.value/100;
    }
});

function display_speed_btn(num){
    text_display_speed = num;
}

function font_size_btn(num){
    console.log("font resize")
    document.getElementById("font_size").innerHTML = '.font_size { font-size: '+ num +'px}';
}

function btn(key){
    console.log(key);
    switch (key) {
        case "start":
                frame_name[frame_number].style.display = 'none';
                frame_name[frame_number = 2].style.display = 'initial';
                console.log(frame_name[frame_number]);
                scene_number = 0;
                scene_count = 0;
                scene_play();
            break;
            
        case "gotop":
                frame_name[frame_number].style.display = 'none';
                frame_name[frame_number = 0].style.display = 'initial';
                scene_number = 0;
                scene_count = 0;
                bgm.pause();
                bgm.currentTime = 0;
                document.getElementById("scene_box").innerHTML = scene_default;
                frame_name[2] = document.getElementById("scene");
            break;

        case "setting":
                frame_name[3].style.display = 'initial';
            break;

        case "close_setting":
                frame_name[3].style.display = 'none';
            break;
        case "sound_on":
                frame_name[4].style.display = 'none';
                sounds_load();
                sounds_mute();
            break;
        case "sound_mute":
                frame_name[4].style.display = 'none';
                sounds_load();
                document.getElementById("mute_btn").checked = 'true';
            break;
        default:
            break;
    }

}