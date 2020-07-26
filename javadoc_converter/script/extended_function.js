"use.strict";
/**
 * replaceメソッドを複数の置き換えに対応させたもの
 * @param {Array} array 置き換える文字列を連想配列で列挙した物 ( [[対象の文字,置き換え後の文字], ・・・] )
 */
String.prototype.replacePlural = function(array){
    let string = this;
    for(let key in array) string = string.replace(array[key][0],array[key][1]);
    return string;
}

/**
 * JavaDocから、Javaのコードとドキュメンテーションコメントを抜き出す
 */
Document.prototype.getJavaCode = function(){
    let output = {declaration:[], enumConst:[], field:[], classField:[], constructor:[], method:[], abstract:[], classMethod:[]};
    output.declaration = [this.getElementsByTagName("pre")[0].textContent.deleteZeroSpace(), this.getElementsByClassName("title")[0].textContent.deleteZeroSpace()];
    //console.log(this.getElementsByTagName("pre")[0].textContent.parseJavaCode())
    let details = this.getElementsByClassName("details")[0];
    let detail = details.getElementsByTagName("h3");
    for(let i = 0; i < detail.length; i ++){
        let type = detail[i].parentNode.getElementsByTagName("a")[0].outerHTML;
        if(type.match(/enum.constant.detail/)) type = "enumConst";
        else if(type.match(/field.detail/)) type = "field";
        else if(type.match(/constructor.detail/)) type = "constructor";
        else type = "method";
        
        let code = detail[i].parentNode.getElementsByTagName("div");
        for(let j = 0; j < code.length; j++){
            let tmp = code[j].getElementsByTagName("pre");
            for(let k = 0; k < tmp.length; k++) tmp[k].remove();
        }
        code = detail[i].parentNode.getElementsByTagName("pre");
        for(let j = 0; j < code.length; j++){
            if(type == "field" || type == "method") {
                let tmp = code[j].textContent.parseJavaCode();
                if(tmp.isAbstract) type = "abstract";
                if(tmp.isStatic) (type == "field")? type = "classField" : type = "classMethod";
            }
            let explanation = code[j].parentNode.getElementsByClassName("block");
            if(explanation.length != 0) output[type].push( [code[j].textContent.deleteZeroSpace(), explanation[0].textContent]);
            else output[type].push( [code[j].textContent.deleteZeroSpace()]);
        }
    }
    return output;
}

/**
 * 文字列をJavaのコードとして評価する
 */
String.prototype.parseJavaCode = function(){
    let output = {accessModified: "", type: "", name: "", default: "", isAbstract: false, isStatic: false, isFinal: false}
    let tmp = this.split(/\s?=\s?/g).filter(v => v);
    if(tmp.length != 1) output.default = " = " + tmp[1];
    tmp = tmp[0].replace(/\s*,\s*/g, ",").split(/\sextends/g).filter(v => v)[0].split(/\simplements/g).filter(v => v)[0].replace(/\s?\((.+)\)/g, "()").split(/\s/g).filter(v => v);
    let innerTmp = this.split(/=/g).filter(v => v)[0].match(/\s?\((.+)\)/g);
    if(innerTmp != null) output.name = tmp[tmp.length-1].replace("()", "") + innerTmp;
    else output.name = tmp[tmp.length-1];
    tmp.pop();
    if(tmp.length > 1) {
        output.type = tmp[tmp.length-1];
        tmp.pop();
        tmp = tmp.join(" ");
        if(tmp.match(/public/)) output.accessModified = "public";
        else if(tmp.match(/private/)) output.accessModified = "private";
        else if(tmp.match(/protected/)) output.accessModified = "protected";
        else output.accessModified = "package";
        if(tmp.match(/static/)) output.isStatic = true;
        if(tmp.match(/abstract/)) output.isAbstract = true;
        if(tmp.match(/final/)) output.isFinal = true;
    } else if(tmp.length == 1) {
        output.type = tmp[0];
        tmp = tmp.join(" ");
        if(tmp.match(/public/)) output.accessModified = "public";
        else if(tmp.match(/private/)) output.accessModified = "private";
        else if(tmp.match(/protected/)) output.accessModified = "protected";
        else output.accessModified = "package";
    }
    
    return output;
}

/**
 * 特殊なスペースを削除する
 */
String.prototype.deleteZeroSpace = function(string = ""){
    const spChar = [
        11, // 垂直タブ
        847, // 結合書記素接合子
        8203, // ゼロ幅スペース
        8204, // ゼロ幅非接合子
        8205, // ゼロ幅接合子
        8206, // 記述方向制御(左から右へ)
        8207, // 記述方向制御(右から左へ)
        8232, // 行区切り文字
        8233, // 段落区切り文字
        8234, // LRE
        8235, // RLE
        8236, // PDF
        8237, // LRO
        8238, // RLO
        8289, // 関数適用
        8290, // 不可視の乗算記号
        8291, // 不可視の区切り文字
        65279 // ゼロ幅のノーブレークスペース
    ];

    let output = "";
    for (let i=0; i < this.length; i++) {
        let chr = this.charCodeAt(i);
        if (spChar.indexOf(chr) == -1) {
            output += String.fromCharCode(chr);
        } else output += string;
    }
    return output;
}

/** 文字列をHTML特殊文字に置き換える */
String.prototype.entityify = function(){ 
    var character = { 
       '<' : '&lt;', 
       '>' : '&gt;', 
       '&' : '&amp;', 
       '"' : '&quot;' 
     }; 
  return this.replace(/[<>&"]/g, function (c) {return character[c];});
}

/**文字列をLaTeXの特殊文字に置き換える */
String.prototype.toLatex = function(){ 
    var character = { 
       '#' : '\\# ', 
       '$' : '\\$ ', 
       '%' : '\\% ', 
       '&' : '\\& ',
       '_' : '\\_ ', 
       '\{' : '\\{ ', 
       '\}' : '\\} ', 
       '\\' : '\\verv|\\| ',
       '\^' : '\\verv|\^| ', 
       '~' : '\\verv|~| ', 
       '\<' : '\\verv|\<| ', 
       '\>' : '\\verv|\>| ',
       '\|' : '\\verv+|+ '
     }; 
  return this.replace(/[#$%&_\{\}\\\^~\<\>\|]/g, function (c) {return character[c];});
}

/**
 * クリップボードにコピー
 */
function copyToClipboard(text){
    let area = document.createElement("textarea");
    area.textContent = text;
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    document.body.removeChild(area);
}