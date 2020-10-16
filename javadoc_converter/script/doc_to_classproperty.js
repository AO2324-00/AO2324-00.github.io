"use.strict";
/**
 * JavaDocをclass図のプロパティ―に変換する
 * @param {Document} doc 
 */
function doc_to_classproperty(doc){

    function switchSig(param){
        if(param == null) return "()";
        let sig = param[1].replace(/\s*,+\s*/g, ",").split(",").filter(v => v);
        for(let i in sig) {
            sig[i] = sig[i].deleteZeroSpace(" ").replace(/\s/, " ").replace(/&nbsp;/g, " ").split(" ").filter(v => v);
            let tmp = sig[i][0];
            sig[i][0] = sig[i][1];
            sig[i][1] = tmp;
            sig[i] = sig[i].join(": ");
        }
        return `(${sig.join(",")})`;
    }

    let className = "";
    let tmp;
    let output = "";
    let code = doc.getJavaCode();
    for(let type in code){
        let cd = code[type];
        if(type == "declaration") {
            tmp = cd[0].parseJavaCode();
            switch (tmp.type) {
                case "interface":
                        output += "<<interface>>\n";
                    break;
                case "enum":
                        output += "<<enumeration>>\n";
                    break;
                default:
                    break;
            }
            if(tmp.isAbstract) output += '/';
            //console.log(tmp)
            className = tmp.name.replace(/\s?\((.+)\)/g, "");
            output += `${className}`;
            if(tmp.isAbstract) output += '/';
            output += "\n";
            continue;
        }
        //console.log(code[type]);
        if(type == "constructor" || type == "enumConst") output += "--\n";
        for(let i in cd){
            tmp = cd[i][0].parseJavaCode();
            //console.log(tmp)

            if(tmp.isStatic && type != "enumConst") output += '_';
            if(tmp.isAbstract && type != "enumConst") output += '/';
            
            let AM;
            switch (tmp.accessModified) {
                case "public": AM = '+';
                    break;
                case "private": AM = '-';
                    break;
                case "protected": AM = '#';
                    break;
                default: AM = '~';
                    break;
            }

            switch (type) {
                case "enumConst":
                    /*if(tmp.type == "") output += `${tmp.name.replace(/\s?\((.+)\)/g, "" )}: ${code["declaration"][0].parseJavaCode().name.replace(/\s?\((.+)\)/g, "").replace(/,/g, ", ")}`;
                    else output += `${AM} ${tmp.name.replace(/\s?\((.+)\)/g, switchSig(tmp.name.match(/\s?\((.+)\)/)) ).replace(/,/g, ", ")}: ${tmp.type.replace(/,/g, ", ")}`;*/
                    output += `${tmp.name.replace(/\s?\((.+)\)/g, "" )}`;
                    break;
                case "field":
                case "classField":
                        output += `${AM} ${tmp.name.replace(/\s?\((.+)\)/g, switchSig(tmp.name.match(/\s?\((.+)\)/)) ).replace(/,/g, ", ")}: ${tmp.type.replace(/,/g, ", ")}`;
                    break;
                case "constructor":
                        output += `${AM} ${tmp.name.replace(/\s?\((.+)\)/g, switchSig(tmp.name.match(/\s?\((.+)\)/)) ).replace(/,/g, ", ")}`;
                    break;
                case "method":
                case "classMethod":
                case "abstract":
                        output += `${AM} ${tmp.name.replace(/\s?\((.+)\)/g, switchSig(tmp.name.match(/\s?\((.+)\)/)) ).replace(/,/g, ", ")}: ${tmp.type.replace(/,/g, ", ")}`;
                    break;
            
                default:
                    break;
            }
            output += tmp.default;
            if(tmp.isFinal && type != "enumConst") output += " {Read only}";
            if(tmp.isAbstract && type != "enumConst") output += '/';
            if(tmp.isStatic && type != "enumConst") output += '_';
            output += '\n';
        }
        
    }
    document.getElementById("classData").value = output;
    classproperty_to_classdiagram(className);
}