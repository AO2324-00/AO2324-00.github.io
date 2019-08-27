
let storage = localStorage;
let setting_data;// 環境設定データ

let save_data;// セーブデータ
let save_screen_data; 

let loading_num;

// 保存している環境設定データ，セーブデータの読み取り==================================
if (storage.getItem('save_data') == '{}'){
    storage.setItem('save_data', JSON.stringify([]) );
}

if (storage.length == 0){//何も保存されてないときに初期値を設定する
    setting_data = [0,0,0.5,0.5]; // 文字の大きさ　文字スピード　オーディオ設定(SE BGM)
    storage.setItem('setting_data', JSON.stringify(setting_data) );
    save_data = []; 
    storage.setItem('save_data', JSON.stringify(save_data) );
} else {
    setting_data = JSON.parse(storage.getItem('setting_data') );
    save_data = JSON.parse(storage.getItem('save_data') );
}
//=============================================================================

const scene_default = document.getElementById("scene").outerHTML; 
// "タイトルに戻る" を押した時にゲーム画面を初期化するため，あらかじめ初期画面を保存しておく

//オーディオ関係=================================================================
const se_slider = document.getElementById("se_slider");
se_slider.value = setting_data[2]*100; // seスライダの位置を環境設定のデータと同期させる
for (let count = 0; count < se_list.length; count++){
    se_list[count].volume = setting_data[2]; // seのボリュームを環境設定のデータと同期させる
}
se_slider.addEventListener("change",function () { // seスライダが動いた時に実行
    for (let count = 0; count < se_list.length; count++){
        se_list[count].volume = se_slider.value/100;
    }
    setting_data[2] = se_slider.value/100;
    storage.setItem('setting_data', JSON.stringify(setting_data) ); // 変更した環境設定データを保存する
});

const bgm_slider = document.getElementById("bgm_slider");
bgm_slider.value = setting_data[3]*100;
for (let count = 0; count < bgm_list.length; count++){
    bgm_list[count].volume = bgm_slider.value/100; // bgmスライダの位置を環境設定のデータと同期させる
}
bgm_slider.addEventListener("change",function () { // seスライダが動いた時に実行
    for (let count = 0; count < bgm_list.length; count++){
        bgm_list[count].volume = bgm_slider.value/100; // bgmのボリュームを環境設定のデータと同期させる
    }
    setting_data[3] = bgm_slider.value/100;
    storage.setItem('setting_data', JSON.stringify(setting_data) ); // 変更した環境設定データを保存する
});

//文字表示速度=================================================================
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
    storage.setItem('setting_data', JSON.stringify(setting_data) ); // 変更した環境設定データを保存する
}

//文字サイズ==================================================================
font_size_btn(setting_data[0] );
document.getElementById("font_size_"+setting_data[0] ).checked = true;
function font_size_btn(num){
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
    storage.setItem('setting_data', JSON.stringify(setting_data) ); // 変更した環境設定データを保存する
}

//ゲームデータ セーブ機能関連==============================================================
function data_load_button (count){ // セーブデータをクリックした時
    loading_num = count;　// どのデータを選択しているかを記憶
    document.getElementById("data_name").innerHTML = save_data[count][0][0] +'/'+ save_data[count][0][1] +'/'+ save_data[count][0][2] +'　シーン' + save_data[count][1] + '-' + save_data[count][2];
}

function data_load(data_num){ // 選択されたデータを読み込む
    let loaded_data = save_data[data_num];
    frame_name[frame_number].style.display = 'none';
    frame_name[frame_number = 2].style.display = 'block';
    scene_number = loaded_data[1];
    scene_count = loaded_data[2];
    document.getElementById("scene_box").innerHTML = loaded_data[3];
    document.getElementById("choice_window").innerHTML = "";
    frame_name[2] = document.getElementById("scene");
    scene_play();
    if( loaded_data[4] != -1){
        if ( bgm_num != -1) {
            bgm_list[bgm_num].pause();
        }
        bgm_num = loaded_data[4];
        bgm_list[ loaded_data[4]].play();
        loop_bgm_timeout = setTimeout( 'loop_bgm ('+ loaded_data[4] +')', (bgm_list[loaded_data[4] ].duration - 0.022)*1000 );
    }
    
}

async function btn(key){ // ボタン入力を受け取る
    switch (key) {
        case "start": // 始めから
                document.getElementById("frame_effect").className = 'fade';
                await span (1500);
                frame_name[frame_number].style.display = 'none';
                frame_name[frame_number = 2].style.display = 'block';
                scene_number = 0;
                scene_count = 0;
                scene_play();
                await span (1500);
                document.getElementById("frame_effect").className = '';
            break;
            
        case "gotop": // タイトルに戻る
                clearTimeout(loop_bgm_timeout);
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

        case "setting": // 環境設定
                frame_name[3].style.display = 'block';
            break;

        case "close_setting": //環境設定を閉じる
                frame_name[3].style.display = 'none';
            break;
        case "sound_on": // ミュートにしない
                frame_name[4].style.display = 'none';
                sounds_mute();
            break;
        case "sound_mute": // ミュートにする
                frame_name[4].style.display = 'none';
                document.getElementById("mute_btn").checked = 'true';
            break;
        case "saves": // セーブデータ選択画面を開く
                frame_name[5].style.display = 'block';
                document.getElementById("data_box").innerHTML = "";
                for (let count = 0; count < save_data.length; count++){
                    let scene_data = save_data[count][0][0] +'/'+ save_data[count][0][1] +'/'+ save_data[count][0][2] +'　シーン' + save_data[count][1] + '-' + save_data[count][2];
                    document.getElementById("data_box").insertAdjacentHTML('beforeend', '<button class="choiceBtn" onclick="data_load_button('+ count +');">'+ scene_data + '</button>');
                }
            break;
        case "delete": // 選択されているセーブデータを削除する
                if(loading_num != null) {
                    if(loading_num != 0){
                        save_data.splice( loading_num, loading_num );
                    } else save_data.shift();
                    storage.setItem('save_data', JSON.stringify(save_data));
                    loading_num = null;
                    document.getElementById("data_name").innerHTML = "";
                    btn("saves");
                }
            break;
        case "open": // 選択されているセーブデータを開く
                if(loading_num != null) data_load(loading_num);
        case "close_savesWindow":
                frame_name[5].style.display = 'none';
                document.getElementById("data_box").innerHTML = '';
            break;
        case "save": // セーブ確認画面
                document.getElementById("save_data_form").innerHTML = '"シーン' + scene_number + '-' + scene_count + '"を<br>保存しますか？';
                frame_name[6].style.display = 'block';
            break;
        case "saved": // セーブする
            let date = new Date();
                save_screen_data = document.getElementById("scene").outerHTML;
                save_data.unshift([ [date.getFullYear(), date.getMonth()+1, date.getDate() ], scene_number, scene_count, save_screen_data, bgm_num]);
                storage.setItem('save_data', JSON.stringify(save_data));
                frame_name[6].style.display = 'none';
            break;
        case "close_saveWindow": // セーブ確認画面を閉じる
                frame_name[6].style.display = 'none';
            break;
        case "credit": // クレジットを再生する
                frame_number = 1;
                document.getElementById("frame_effect").className = 'fadeout';
                await span (1500);
                frame_name[1].style.display = 'block';
            break;
        default:
            break;
    }

}