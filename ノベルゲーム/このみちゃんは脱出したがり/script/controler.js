function btn(key){
    console.log(key);
    switch (key) {
        case "start":
                frame_name[frame_number].style.display = 'none';
                frame_name[frame_number = 2].style.display = 'initial';
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
                name_box.innerHTML = '';
                text_box.innerHTML = '';
                choice_window.innerHTML = '';
            break;
    
        default:
            break;
    }

}