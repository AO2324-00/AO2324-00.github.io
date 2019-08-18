const scene_default = document.getElementById("scene").outerHTML;
console.log(scene_default);

se.volume = 0.5;
const se_slider = document.getElementById("se_slider");
se_slider.addEventListener("change",function () {
    se.volume = se_slider.value/100;
});
bgm.volume = 0.5;
const bgm_slider = document.getElementById("bgm_slider");
bgm_slider.addEventListener("change",function () {
    console.log(bgm.volume);
    bgm.volume = bgm_slider.value/100;
    console.log(bgm.volume);
});

function display_speed_btn(num){
    text_display_speed = num;
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
        default:
            break;
    }

}