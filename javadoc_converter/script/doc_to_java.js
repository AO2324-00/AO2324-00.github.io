"use.strict";
/**
 * JavaDocからJavaファイルのひな形を生成する
 * @param {Document} doc JavaDocのHTMLファイル
 */
function doc_to_java(doc){
    let output = "\n\n";
    let code = doc.getJavaCode();
    const indent = "    ";

    output += code.declaration[0].replace(/\n/g, " ").replace(/\s{2,}|&nbsp;{2,}/g, " ") + "{\n\n";

    for(let type in code){
        if(type == "declaration") continue;
        let cd = code[type];
        for(let i in cd){
            if(cd[i].length != 1) output += `${indent}/**\n${indent} * ${cd[i][1].replace(/\ {2,}|&nbsp;{2,}/g, " ").replace(/\n/g, `\n${indent} *`)}\n${indent} */\n`;
            output += `${indent}${cd[i][0].replace(/\n/g, " ").replace(/\s{2,}|&nbsp;{2,}/g, " ")}`;
            if(type != "enumConst" && type != "field" && type != "classField") output += `{\n\n\n${indent}}\n`;
            else output += ';\n';
            output += `\n\n`;
        }
    }
    output += "\n}";

    return output;
}