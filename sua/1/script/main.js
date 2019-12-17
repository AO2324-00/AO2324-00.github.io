let observer = new MutationObserver(function(){
    observer.disconnect();//監視を終了
    /** DOMの変化が起こった時の処理 */
    let rss = document.getElementsByClassName("rss-items")[0];
    rss = String(rss.outerHTML).replace(/<\/li>/g, "");
    rss = rss.split(`<li class="rss-item">`);
    for (let count = 1; count < rss.length; count++) {
        rss[count] = rss[count].split(`<br>`);
        rss[count][0] = rss[count][0].match(/href="(.*?)"/);
        rss[count][0] = String(rss[count][0]).replace('href="', "").replace('"', "");
        rss[count][0] = rss[count][0].split(",")[0];
        rss[count][1] = rss[count][1].match(/href="(.*?)"/);
        rss[count][1] = String(rss[count][1]).replace('href="', "").replace('"', "");
        if (rss[count][1] != "null") {
            rss[count][1] = rss[count][1].split(",")[0] + "?caw=800";
            gallaryItem += `<a href="${rss[count][0]}"><img src="${rss[count][1]}"></a>`;
        }
    }
    //console.log(gallaryItem);
    gallery.innerHTML = gallaryItem;
});

const gallery = document.getElementById("gallery");
let gallaryItem = "";

observer.observe(document.body, {
    attributes: true, // 属性変化の監視
    attributeOldValue: true, // 変化前の属性値を matation.oldValue に格納する
    characterData: true, // テキストノードの変化を監視
    characterDataOldValue: true, // 変化前のテキストを matation.oldValue に格納する
    childList: true, // 子ノードの変化を監視
    subtree: true // 子孫ノードも監視対象に含める
});