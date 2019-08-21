
let storage = localStorage;
let setting_data;
if (storage.length == 0){
    console.log("null")

    setting_data = [0,0,0.5,0.5];
    storage.setItem('setting_data', JSON.stringify(setting_data) );
    storage.setItem('save_data', JSON.stringify({}) );
} else {
    setting_data = JSON.parse(storage.getItem('setting_data') );
}
console.log(storage);

const scene_default = document.getElementById("scene").outerHTML;
console.log(scene_default);

const se_slider = document.getElementById("se_slider");
se_slider.value = setting_data[2]*100;
for (let count = 0; count < se_list.length; count++){
    se_list[count].volume = setting_data[2];
}
se_slider.addEventListener("change",function () {
    for (let count = 0; count < se_list.length; count++){
        se_list[count].volume = se_slider.value/100;
    }
    setting_data[2] = se_slider.value/100;
    storage.setItem('setting_data', JSON.stringify(setting_data) );
});

const bgm_slider = document.getElementById("bgm_slider");
bgm_slider.value = setting_data[3]*100;
for (let count = 0; count < bgm_list.length; count++){
    bgm_list[count].volume = setting_data[3];
}
bgm_slider.addEventListener("change",function () {
    for (let count = 0; count < bgm_list.length; count++){
        bgm_list[count].volume = bgm_slider.value/100;
    }
    setting_data[3] = bgm_slider.value/100;
    storage.setItem('setting_data', JSON.stringify(setting_data) );
});

display_speed_btn(setting_data[1] );
document.getElementById("text_display_speed_"+setting_data[1] ).checked = true;
function display_speed_btn(num){
    switch (num) {
        case -1:
            text_display_speed = 30;
            break;
        case 0:
            text_display_speed = 60;
            break;
         case 1:
            text_display_speed = 120;
            break;
    
        default:
            break;
    }
    setting_data[1] = num;
    storage.setItem('setting_data', JSON.stringify(setting_data) );
}

font_size_btn(setting_data[0] );
document.getElementById("font_size_"+setting_data[0] ).checked = true;
function font_size_btn(num){
    console.log("font resize")
    const font_size = document.getElementById("font_size")
    switch (num) {
        case -1:
            font_size.innerHTML = '.font_size { font-size: 15px}';
            break;
        case 0:
            font_size.innerHTML = '.font_size { font-size: 20px}';
            break;
         case 1:
            font_size.innerHTML = '.font_size { font-size: 25px}';
            break;
    
        default:
            break;
    }
    setting_data[0] = num;
    storage.setItem('setting_data', JSON.stringify(setting_data) );
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
                scene_number = -1;
                scene_count = 0;
                bgm_list[bgm_num].pause();
                bgm_list[bgm_num].currentTime = 0;
                bgm_num = -1;
                document.getElementById("scene_box").innerHTML = scene_default;
                frame_name[2] = document.getElementById("scene");
            break;

        case "load":
            let data = localStorage.getItem("myCat");
            console.log(data);
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