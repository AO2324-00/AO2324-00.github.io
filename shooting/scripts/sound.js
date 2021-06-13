/**
 * 効果音を再生するためのオブジェクト
 * 
 * Sound.volue : 0~1で音の大きさを指定する（default: 1）
 * 
 * Sound.hit(type: String, range: Number) : 弾丸がものにあたったときの音を再生する
 *      type：物の種類 "target": 的(hit.mp3)、"ground": 地面(ground.mp3)、"wall": 壁(wall.mp3)
 *      range: 物との距離 ( 0.1 以上、default: 1)
 * 
 * Sound.shot(ejection: Boolean) : 銃の発砲音を再生する (発射音：shot.mp3, 薬莢音：cartridge.mp3)
 *      ejection: 排莢するかどうか (default: false)
 * 
 * Sound.empty() : 銃の弾薬が切れた時の音を再生する ()
 */
const Sound = {
    volume: 1,
    _AudioObjects: [new Audio(), new Audio(), new Audio(), new Audio()],
    _getAudio: ()=>{
        const CurrentAudio = Sound._AudioObjects.shift();
        Sound._AudioObjects.push(CurrentAudio);
        return CurrentAudio;
    },
    hit: (type, range = 1)=>{
        const Audio = Sound._getAudio();
        const delay = 50 + range*10
        setTimeout(function(){
            switch (type) {
                case "target":
                    Audio.src = `./sounds/hit.mp3`;
                    break;
                case "ground":
                    Audio.src = `./sounds/ground.mp3`;
                    break;
                case "wall":
                    Audio.src = `./sounds/wall.mp3`;
                    break;
                default:
                    return;
            }
            Audio.playbackRate = 1/range+1;
            Audio.volume = Math.min(1, Math.round(1/range*10)/10) * Sound.volume;
            Audio.play();
        }, delay);
    },
    shot: (ejection)=>{
        const Audio = Sound._getAudio();
        Audio.src = `./sounds/shot.mp3`;
        Audio.playbackRate = 1 + Math.random();
        Audio.volume = 1 * Sound.volume;
        Audio.play();
        if(!ejection) return;
        const delay = 0.5 + Math.random()*0.5;
        setTimeout(function(){
            const Audio = Sound._getAudio();
            Audio.src = `./sounds/cartridge.mp3`;
            Audio.playbackRate = 1 + Math.random()*3;
            Audio.volume = 0.1 + (1-delay)*0.8 * Sound.volume;
            Audio.play();
        }, 100 + delay*900);
    },
    empty: ()=>{
        const Audio = Sound._getAudio();
        Audio.src = `./sounds/empty.mp3`;
        Audio.playbackRate = 1 + Math.random();
        Audio.volume = 1 * Sound.volume;
        Audio.play();
    }
};