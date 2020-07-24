"use.strict";
/**
 * LocalStrageのデータを取得する
 * @param {String} key LocalStrageのキー
 */
function getLocalData(key) {
    if (!localStorage.getItem(key)) return null;
    else return JSON.parse(localStorage.getItem(key));
}
/**
 * LocalStrageにデータを記録する
 * @param {String} key LocalStrageのキー
 * @param {Array} data LocalStrageにセットするデータ
 */
function setLocalData(key, data) {
    try{
        localStorage.setItem(key, JSON.stringify(data));
        return true;
    }catch(e){
        return false;
    }
}