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
            img.src = './img_character/' + character_list[count] + '/' + character_img[character_list[count] ][img_count];
        }
    }
}
