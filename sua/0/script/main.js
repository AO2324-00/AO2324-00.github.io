const gallery = document.getElementById("gallery");
let gallaryItem = "";
let rss = document.getElementsByClassName("rss-items")[0];
rss = String(rss.outerHTML).replace(/<\/li>/g, "");
rss = rss.split(`<li class="rss-item">`);
for(let count = 1; count < rss.length; count++){
    rss[count] = rss[count].split(`<br>`);
    rss[count][0] = rss[count][0].match(/href="(.*?)"/);
    rss[count][0] = String(rss[count][0]).replace('href="', "").replace('"',"");
    rss[count][0] = rss[count][0].split(",")[0];
    rss[count][1] = rss[count][1].match(/href="(.*?)"/);
    rss[count][1] = String(rss[count][1]).replace('href="', "").replace('"',"");
    if(rss[count][1] != "null"){
        rss[count][1] = rss[count][1].split(",")[0]+"?caw=800";
        gallaryItem += `<a href="${rss[count][0]}"><img src="${rss[count][1]}"></a>`;
    }
}
    console.log(gallaryItem);
    gallery.innerHTML = gallaryItem;


console.log(rss[1]);