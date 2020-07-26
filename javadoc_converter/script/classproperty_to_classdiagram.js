"use.strict";
function classproperty_to_classdiagram(fileName){
    let classData = document.getElementById("classData");
    classData = classData.value.split("\n");
    let isFirstBlock = true;
    let dom = `<div style="font-family:Arial; font-size: 20px;background-color: white;padding:10px"><div style="border: solid black 1.5px">`;
        for(let count = 0; count < classData.length; count++){
            let opt = "";
            if(isFirstBlock) classData[count] = classData[count].replace(/<</g, "≪").replace(/>>/g, "≫");
            classData[count] = classData[count].replace(/</g, "＜").replace(/>/g, "＞").replace(/\s/g, "&#160;").replace(/\n/g, "&#160;");
            if(isFirstBlock) opt += "text-align: center;";
            if(classData[count][0] == "_" && classData[count][classData[count].length-1] == "_") {classData[count] = classData[count].substring(1, classData[count].length-1); opt += "border-bottom: solid black 1px; width: fit-content;"}
            if(classData[count][0] == "/" && classData[count][classData[count].length-1] == "/") {classData[count] = classData[count].substring(1, classData[count].length-1); opt += "font-style: oblique;"}
            if(classData[count][0] == "_" && classData[count][classData[count].length-1] == "_") {classData[count] = classData[count].substring(1, classData[count].length-1); opt += "border-bottom: solid black 1px; width: fit-content;"}
            if(classData[count] == "--") {dom += `<div style="width:100%;border-bottom: solid black 1.5px; margin-bottom: 3px; margin-top: 2px;"></div>`; isFirstBlock = false;}
            else dom += `<div style="${opt} margin: 3px 8px;">${classData[count]}</div>`;
        }
        dom += `</div></div>`;

    let domBox = document.getElementById("domBox");
        domBox.innerHTML = dom;
    let WIDTH = domBox.clientWidth;
    let HEIGHT = domBox.clientHeight;
    domBox.innerHTML = "";
    let FONT_SIZE = 20;
    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");
    let data =
        "<svg xmlns='http://www.w3.org/2000/svg' width='" + WIDTH + "px' height='" + HEIGHT + "px'>" +
        "<foreignObject width='100%' height='100%'>" +
        "<div xmlns='http://www.w3.org/1999/xhtml' style='font-size: " + FONT_SIZE + "px; font-family: Arial;'>" +
        dom +
        "</div>" +
        "</foreignObject>" +
        "</svg>";
    let DOMURL = self.URL || self.webkitURL || self;
    let img = new Image();
    let svg = new Blob([data], { type: "image/svg+xml;charset=utf-8" });
    let url = DOMURL.createObjectURL(svg);
    img.addEventListener("load", function () {
        DOMURL.revokeObjectURL(url);

        ctx.drawImage(img, 0, 0);
    }, false);
    img.src = url;
    ctx.canvas.width = WIDTH;
    ctx.canvas.height = HEIGHT;
    document.getElementById("classDiagramImg").xlinkns = url;
    document.getElementById("classDiagramImg").src = url;
    document.getElementById("classDownloadBtn").onclick = function(){
        window.URL.revokeObjectURL(classDiagramURL);
        classDiagramURL = window.URL.createObjectURL(svg);
        classDiagramLink.href = classDiagramURL;
        classDiagramLink.download = fileName +'.svg';
        classDiagramLink.click();
    };
}
let classDiagramLink = document.createElement('a');
let classDiagramURL;