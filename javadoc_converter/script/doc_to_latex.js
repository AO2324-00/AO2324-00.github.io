"use.strict";

/**
 * JavaDocからクラスの詳細を抜き出してLaTeX形式のリストを表示する
 * @param {Document} doc 
 */
function doc_to_latex(doc){
    let output = "";
    const indent = "    ";
    let code = doc.getJavaCode();
    for(let type in code){
        let cd = code[type];
        if(cd.length != 0){
            switch (type) {
                case "declaration":
                    let tmp = doc.getElementsByClassName("title")[0].innerHTML.split(" ");
                    output += `\\subsection*{${tmp[1].toLatex().entityify()} ${(cd[0].parseJavaCode().isAbstract)?"抽象":""}${tmp[0].toLatex().entityify()}}\n`;
                    output += `\\begin{itemize}\n`;
                    continue;
                case "enumConst":
                    output += `${indent}\\item 列挙型定数\n`;
                    break;
                case "field":
                    output += `${indent}\\item フィールド\n`;
                    break;
                case "classField":
                    output += `${indent}\\item クラス変数\n`;
                    break;
                case "constructor":
                    output += `${indent}\\item コンストラクタ\n`;
                    break;
                case "method":
                    output += `${indent}\\item メソッド\n`;
                    break;
                case "classMethod":
                    output += `${indent}\\item クラスメソッド\n`;
                    break;
                case "abstract":
                    output += `${indent}\\item 抽象メソッド\n`;
                    break;
            }
            output += `${indent+indent}\\begin{itemize}\n`;
            for(let i in cd){
                let tmp = cd[i][0].parseJavaCode();
                output += `${indent+indent+indent}\\item ${tmp.name.toLatex().entityify()}${(type != "enumConst" && type != "constructor")?`: ${tmp.type.toLatex().entityify()} 型`:""} ${(cd[i].length == 1)?"":cd[i][1].deleteZeroSpace(" ").replace(/\s*\n\s*/g, " ").toLatex().entityify()}\n`;
            }
            output += `${indent+indent}\\end{itemize}\n`;
        }
    }
    output += `\\end{itemize}\n`;

    return output.replace(/\*\n/g, "\n");
}