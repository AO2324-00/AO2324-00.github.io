"use.strict";

/**
 * JavaDocからクラスの詳細を抜き出してリスト表示する
 * @param {Document} doc 
 */
function doc_to_list(doc){
    let output = "";
    const indent = "    ";
    let code = doc.getJavaCode();
    for(let type in code){
        let cd = code[type];

        switch (type) {
            case "declaration":
                let tmp = doc.getElementsByClassName("title")[0].innerHTML.split(" ");
                if(cd.length != 0) output += `${tmp[1].entityify()} ${(cd[0].parseJavaCode().isAbstract)?"抽象":""}${tmp[0].entityify()}\n`;
                continue;
            case "enumConst":
                if(cd.length != 0) output += `${indent}・列挙型定数\n`;
                break;
            case "field":
                if(cd.length != 0) output += `${indent}・フィールド\n`;
                break;
            case "classField":
                if(cd.length != 0) output += `${indent}・クラス変数\n`;
                break;
            case "constructor":
                if(cd.length != 0) output += `${indent}・コンストラクタ\n`;
                break;
            case "method":
                if(cd.length != 0) output += `${indent}・メソッド\n`;
                break;
            case "classMethod":
                if(cd.length != 0) output += `${indent}・クラスメソッド\n`;
                break;
            case "abstract":
                if(cd.length != 0) output += `${indent}・抽象メソッド\n`;
                break;
        }

        for(let i in cd){
            let tmp = cd[i][0].parseJavaCode();
            output += `${indent+indent}- ${tmp.name.entityify()}${(type != "enumConst" && type != "constructor")?`: ${tmp.type.entityify()} 型`:""} ${(cd[i].length == 1)?"":cd[i][1].deleteZeroSpace(" ").replace(/\s*\n\s*/g, " ").entityify()}\n`;
        }
    }

    return output.split(/(?=．)(?!．\))(?!．\n)/).join(`．\n${indent+indent+indent}`).replace(/\s．/g, "").split(/(?=。)(?!。\))(?!。\n)/g).join(`。\n${indent+indent+indent}`).replace(/\s。/g, "").replace(/\*\n/g, "\n");
}