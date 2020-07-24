"use.strict";
/**
 * JavaファイルをJavaDoc形式のHTMLファイルに変換する
 * @param {String} file Javaファイル
 */
function java_to_doc(file){
    let fileData = file.replacePlural([[/\/\/(.+)\n/g,""], [/(?=\/\*)(?!.*\/\*\*)(.+)\*\//g,""], [/\n{2,}/g, "\n"], [/ {2,}/g, " "]]);

    let data = {declaration:null,enumConst:[], field:[],constructor:[], method:[]};
    let cd = 0;
    let inside = 0;
    let tmpFileData = "";

    /** {} で囲まれた内側の文字列を削除する */
    for(let i = 0; i < fileData.length; i++){
        if(fileData[i] == "/" && fileData[i+1] == "*" && fileData[i+2] == "*") ++inside;
        if(inside == 0 && cd == 0 && fileData[i] == "{") tmpFileData += "{begin";
        if(inside < 1 && fileData[i] == "{") ++cd;
        if(cd <= 1) tmpFileData += fileData[i];
        if(inside == 0 && fileData[i] == ";" && cd <= 1) tmpFileData += "end;";
        if(inside < 1 && cd != 0 && fileData[i] == "}") {
            if(cd <= 2) tmpFileData += ";end;";
            --cd;
        }
        //if(cd == 0 && fileData[i] == "}") tmpFileData += "end}";
        if(inside > 0 && fileData[i] == "/" && fileData[i-1] == "*"){
            tmpFileData += "partition/";
            --inside;
        }
    }
    fileData = tmpFileData.replacePlural([[/{begin{/g, ";end;"], [/}end}/g, ""], [/\/partition\/\s*/g, "/partition/"], [/\s*\/\*\*/g, ""], [/\n\s*\*/g,""], [/\n/g, ""]]).split(";end;").filter(v => v);
    tmpFileData = {};
    for(let i in fileData){
        fileData[i] = fileData[i].split("/partition/").filter(v => v);
        let tmp;
        if(fileData[i].length != 1){
            tmp = fileData[i][0];
            fileData[i][0] = fileData[i][1];
            fileData[i][1] = tmp;
        }
        cd = 0, inside = 0, tmp = "";
        for(let j in fileData[i][0]){
            if(fileData[i][0][j] == "<" || fileData[i][0][j] == "(") ++cd;
            if(String(fileData[i][0][j]).length == 1) {
                tmp += fileData[i][0][j];
            }
            if(cd == 0 && fileData[i][0][j] == ","){
                inside++;
                tmp += "partition,";
            }
            if(fileData[i][0][j] == ">" || fileData[i][0][j] == ")") --cd;
        }
        if(inside > 0){
            tmp = tmp.split(",partition,").filter(v => v);
            //console.log(tmp)
            for(let j in tmp){
                if(fileData[i].length != 1) tmp[j] = [tmp[j], fileData[i][1]];
                else tmp[j] = [tmp[j]];
            }
            //console.log(tmp)
            tmpFileData[i] = tmp
        }
    }
    
    /** 列挙型や変数の連続宣言を別々の宣言に変換する */
    for(let i in tmpFileData){
        fileData.splice( i, 1 );
        Array.prototype.splice.apply(fileData,[i,0].concat(tmpFileData[i]));
    }

    /** "@Override" などを削除する */
    inside = [];
    for(let i in fileData){
        if(fileData[i].length == 1 && fileData[i][0] == fileData[i][0].match(/\s*}?\s*/)){
            inside.unshift(i);
            continue;
        } 
        tmpFileData = fileData[i][0].split(/\s/g).filter(v => v);
        //console.log(tmpFileData);
        if(tmpFileData.length != 0 && tmpFileData[0].match(/@/)){
            tmpFileData.shift();
            fileData[i][0] = tmpFileData.join(" ");
        }
    }
    for(let i in inside) fileData.splice( Number(inside[i]), 1 );

    /** データを区別してわける */
    let className = null, classType = null;
    for(let i in fileData) {
        //console.log(fileData[i][0])
        tmpFileData = fileData[i][0].replace(/\s{2,}/g, " ").replace(/\((.+)\)/g, "()").split(/\s*=/g).filter(v => v)[0].split(/(\sextends\s)|(\simplements\s)/g).filter(v => v)[0].split(/\s/g).filter(v => v);
        if(tmpFileData[0].match(/(import)|(package)/)) continue;
        if(data.declaration == null && tmpFileData[tmpFileData.length-2].match(/(class)|(interface)|(enum)/)) {
            className = tmpFileData[tmpFileData.length-1];
            classType = tmpFileData[tmpFileData.length-2];
            data.declaration = fileData[i];
        }
        else if(tmpFileData[tmpFileData.length-1].match(/\(\)/)){
            if(tmpFileData[tmpFileData.length-1].replace("()", "") == className) data.constructor.push(fileData[i]);
            //else if(!tmpFileData[tmpFileData.length-1].match(/[a-z]/)) data.enumConst.push(fileData[i]);
            else if(tmpFileData.length == 1) data.enumConst.push(fileData[i]);
            else data.method.push(fileData[i]);
        }
        //else if(!tmpFileData[tmpFileData.length-1].match(/[a-z]/)) data.enumConst.push(fileData[i]);
        else if(tmpFileData.length == 1) data.enumConst.push(fileData[i]);
        else data.field.push(fileData[i]);
    }
    //console.log(data);

    /** HTMLを生成 */
    function createDetailElement(baseElement, type){
        if(data[type].length == 0) return;
        let innerElement, newElement;

        newElement = doc.createElement("ul");
        baseElement.appendChild(newElement);
        innerElement = baseElement.childNodes[baseElement.childNodes.length-1];

        newElement = doc.createElement("li");
        innerElement.appendChild(newElement);
        innerElement = innerElement.childNodes[0];

        newElement = doc.createElement("a");
        switch (type) {
            case "enumConst":
                    newElement.name = "enum.constant.detail";
                    innerElement.appendChild(newElement);
                    newElement = doc.createElement("h3");
                    newElement.textContent = "列挙型定数の詳細";
                break;
            case "field":
                    newElement.name = "field.detail";
                    innerElement.appendChild(newElement);
                    newElement = doc.createElement("h3");
                    newElement.textContent = "フィールドの詳細";
                break;
            case "constructor":
                    newElement.name = "constructor.detail";
                    innerElement.appendChild(newElement);
                    newElement = doc.createElement("h3");
                    newElement.textContent = "コンストラクタの詳細";
                break;
            default:
                    newElement.name = "method.detail";
                    innerElement.appendChild(newElement);
                    newElement = doc.createElement("h3");
                    newElement.textContent = "メソッドの詳細";
                break;
        }
        innerElement.appendChild(newElement);
        
        for(let i in data[type]){
            (function(baseElement){
                let innerElement, newElement;

                newElement = doc.createElement("ul");
                baseElement.appendChild(newElement);
                innerElement = baseElement.childNodes[baseElement.childNodes.length-1];

                newElement = doc.createElement("li");
                innerElement.appendChild(newElement);
                innerElement = innerElement.childNodes[0];
                
                newElement = doc.createElement("pre");
                newElement.textContent = data[type][i][0].trim();
                innerElement.appendChild(newElement);

                if(data[type][i].length > 1){
                    newElement = doc.createElement("div");
                    newElement.className = "block";
                    newElement.textContent = data[type][i][1].trim();
                    innerElement.appendChild(newElement);
                }
                
            })(innerElement);
        }

    }
    let newElement;
    let doc = new DOMParser().parseFromString("", "text/html");
    // ===== タイトル =====
    newElement = doc.createElement("h2");
    newElement.className = "title";
    switch (classType) {
        case "interface":
                newElement.textContent = `インターフェース ${className}`;
            break;
        case "enum":
                newElement.textContent = `列挙型 ${className}`;
            break;
        default:
                newElement.textContent = `クラス ${className}`;
            break;
    }
    doc.body.appendChild(newElement);
    newElement = doc.createElement("pre");
    newElement.textContent = data.declaration[0].trim();
    doc.body.appendChild(newElement);
    // ===== 詳細 =====
    newElement = doc.createElement("div");
    newElement.className = "details";
    doc.body.appendChild(newElement);
    let innerElement = doc.getElementsByClassName("details")[0];

    newElement = doc.createElement("ul");
    innerElement.appendChild(newElement);
    innerElement = innerElement.childNodes[0];

    newElement = doc.createElement("li");
    innerElement.appendChild(newElement);
    innerElement = innerElement.childNodes[0];

    createDetailElement(innerElement, "enumConst");
    createDetailElement(innerElement, "field");
    createDetailElement(innerElement, "constructor");
    createDetailElement(innerElement, "method");

    return doc;
}