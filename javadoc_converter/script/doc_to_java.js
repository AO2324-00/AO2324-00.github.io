"use.strict";
/**
 * JavaDocからJavaファイルのひな形を生成する
 * @param {Document} doc JavaDocのHTMLファイル
 */
function doc_to_java(doc){
    let output = "\n";
    let code = doc.getJavaCode();
    if(Object.keys(code).length == 0) return;
    const indent = "    ";

    output += code.declaration[0].replace(/\n/g, " ").replace(/\s{2,}|&nbsp;{2,}/g, " ") + "{\n\n";

    for(let type in code){
        if(type == "declaration") continue;
        let cd = code[type];
        for(let i in cd){
            if(type != "enumConst"){
                if(cd[i].length != 1) output += `${indent}/**\n${indent} * ${cd[i][1].replace(/\ {2,}|&nbsp;{2,}/g, " ").replace(/\n/g, `\n${indent} *`)}\n${indent} */\n`;
                output += `${indent}${cd[i][0].replace(/\n/g, " ").replace(/\s{2,}|&nbsp;{2,}/g, " ")}`;
                if(type != "field" && type != "classField" && !cd[i][0].parseJavaCode().isAbstract) output += `{\n\n${indent}}\n`;
                else output += ';\n';
                output += `\n`;
            } else {
                output += `${indent}${cd[i][0].parseJavaCode().name}${(cd.length-1 == i)?';\n':','}\n`;
            }
        }
    }
    output += "}";

    return output;
}