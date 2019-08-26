
let storage = localStorage;
let setting_data;

let save_data;
let save_screen_data;

let loading_num;

if (storage.getItem('save_data') == '{}'){
    storage.setItem('save_data', JSON.stringify([]) );
}

if (storage.length == 0){
    console.log("null")

    setting_data = [0,0,0.5,0.5]; // 文字の大きさ　文字スピード　オーディオ設定
    storage.setItem('setting_data', JSON.stringify(setting_data) );
    save_data = []; // save_data_name, scene_num, scene_count, bgm_num, bgi_num, char1, char2, still
    storage.setItem('save_data', JSON.stringify(save_data) );
} else {
    setting_data = JSON.parse(storage.getItem('setting_data') );
    save_data = JSON.parse(storage.getItem('save_data') );
}
console.log(setting_data);
console.log(save_data);

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
    bgm_list[count].volume = bgm_slider.value/100;
    console.log("bgm list:"+bgm_list);
    console.log("bgm vol:"+bgm_list[count].volume);
}
bgm_slider.addEventListener("change",function () {
    for (let count = 0; count < bgm_list.length; count++){
        bgm_list[count].volume = bgm_slider.value/100;
        console.log("bgm list:"+bgm_list);
        console.log("bgm vol:"+bgm_list[count].volume);
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

function data_load(data_num){
    let loaded_data = save_data[data_num];
    frame_name[frame_number].style.display = 'none';
    frame_name[frame_number = 2].style.display = 'block';
    console.log(frame_name[frame_number]);
    scene_number = loaded_data[1];
    scene_count = loaded_data[2];
    document.getElementById("scene_box").innerHTML = loaded_data[3];
    document.getElementById("choice_window").innerHTML = "";
    frame_name[2] = document.getElementById("scene");
    scene_play();
    console.log( loaded_data[4]);
    if( loaded_data[4] != -1){
        if ( bgm_num != -1) {
            bgm_list[bgm_num].pause();
        }
        bgm_num = loaded_data[4];
        bgm_list[ loaded_data[4]].play();
    }
    
}

async function btn(key){
    console.log(key);
    switch (key) {
        case "start":
                document.getElementById("frame_effect").className = 'fade';
                await span (1500);
                frame_name[frame_number].style.display = 'none';
                frame_name[frame_number = 2].style.display = 'block';
                console.log(frame_name[frame_number]);
                scene_number = 0;
                scene_count = 0;
                scene_play();
                await span (1500);
                document.getElementById("frame_effect").className = '';
            break;
            
        case "gotop":
                document.getElementById("frame_effect").className = "";
                frame_name[frame_number].style.display = 'none';
                frame_name[frame_number = 0].style.display = 'block';
                scene_number = -1;
                scene_count = 0;
                if ( bgm_num != -1) {
                    bgm_list[bgm_num].pause();
                    bgm_list[bgm_num].currentTime = 0;
                }
                bgm_num = -1;
                document.getElementById("scene_box").innerHTML = scene_default;
                frame_name[2] = document.getElementById("scene");
            break;

        case "setting":
                frame_name[3].style.display = 'block';
            break;

        case "close_setting":
                frame_name[3].style.display = 'none';
            break;
        case "sound_on":
                frame_name[4].style.display = 'none';
                sounds_mute();
            break;
        case "sound_mute":
                frame_name[4].style.display = 'none';
                document.getElementById("mute_btn").checked = 'true';
            break;
        case "saves":
                frame_name[5].style.display = 'block';
                for (let count = 0; count < save_data.length; count++){
                    document.getElementById("data_box").insertAdjacentHTML('beforeend', '<button onclick="loading_num = '+ count +'">'+
                    save_data[count][0][0] +'/'+ save_data[count][0][1] +'/'+ save_data[count][0][2] +'　シーン' + save_data[count][1] + '-' + save_data[count][2] + '</button>');
                }
                console.log(frame_name[5]);
            break;
        case "load":
                if(loading_num != null) data_load(loading_num);
        case "close_savesWindow":
                frame_name[5].style.display = 'none';
                document.getElementById("data_box").innerHTML = '';
            break;
        case "save":
                document.getElementById("save_data_form").innerHTML = 'シーン' + scene_number + '-' + scene_count + '"を<br>保存しますか？';
                frame_name[6].style.display = 'block';
            break;
        case "saved":
            let date = new Date();
                save_screen_data = document.getElementById("scene").outerHTML;
                save_data.unshift([ [date.getFullYear(), date.getMonth()+1, date.getDate() ], scene_number, scene_count, save_screen_data, bgm_num]);
                console.log(save_data);
                storage.setItem('save_data', JSON.stringify(save_data));
                frame_name[6].style.display = 'none';
            break;

        case "close_saveWindow":
                frame_name[6].style.display = 'none';
            break;
        default:
            break;
    }

}