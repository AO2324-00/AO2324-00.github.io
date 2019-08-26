
let speaker = "";
let bgi_list = ['room0.jpg'];
let character_list = ['konomi', 'little_sister'];
let character_img = {
    'konomi': ['img-1.png', 'img0.png', 'img1.png', 'img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png'] , 
    'little_sister': ['img-1.png', 'img0.png', 'img1.png', 'img2.png', 'img3.png', 'img4.png', 'img5.png', 'img6.png', 'img7.png']
};
window.onload = function(){
    // 画像プリロード
    for (let count = 0; count < bgi_list.length; count++){
        let img = document.createElement('img');
        img.src = './img_background/'+ bgi_list[count];
    }
    for (let count = 0; count < Object.keys(character_list).length; count++){
        for (let img_count = 0; img_count < character_img[character_list[count]].length; img_count++) {
            let img = document.createElement('img');
            img.src = './img_character/'+ character_list[ count ] +'/'+ character_img[character_list[ count ] ] [ img_count ];
        }
    }
}

function background_image ( num ){
    if (num != -1){
        document.getElementById("bgi_box").innerHTML = '<img id="bgi" src="./img_background/'+ bgi_list[num] +'"></img>';
    } else {
        document.getElementById("bgi_box").innerHTML = '';
    }
}

function character_image ( option ) {
    console.log("speaker:"+speaker + "  option:"+ option[1]);
    if (speaker != option[1] && speaker != ""){
        document.getElementById("character_box_" + speaker ).className = 'character_box';
        console.log("hide"+speaker );
    }
    speaker = option[1];
    console.log("change character");
    console.log(option);
    console.log(character_list[ option[2] ] );
    if (option[2] != -1){
        document.getElementById("character_box_" + option[1] ).className = 'character_box show';
        document.getElementById("character_box_" + option[1] ).insertAdjacentHTML('beforeend', '<img width="100%" src="./img_character/'+ character_list[ option[2] ] +'/'+ character_img[character_list[ option[2] ] ] [ option[3] ] +'"></img>');
        setTimeout(function () {
            document.getElementById("character_box_" + option[1] ).innerHTML = '<div style="position:absolute;width:100%;"><img width="100%" src="./img_character/'+ character_list[ option[2] ] +'/'+ character_img[character_list[ option[2] ] ] [ option[3] ] +'"></img></div>';
        }, 200);
    } else {
        document.getElementById("character_box_" + option[1] ).innerHTML = '';
    }
}