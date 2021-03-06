"use.strict";
let fileReader;
(function(document){

    files = getLocalData("JavaDocConverter");
    if(files == null) setLocalData("JavaDocConverter", files = {});
    else {
        for(let fileName in files) {
            //console.log(files[fileName])
            addFile(fileName);
        }
    }

    const reader = new FileReader();

    fileReader = async function(evt, isDrop = false){
       // console.log("load file");
        let file = (isDrop)? evt.dataTransfer.files : evt.target.files;
    
        //テキスト形式で読み込む
        for (let count = 0; count < file.length; count++)
            await readFile(file[count]);
        document.getElementById("fileInput").value = "";
    }
    document.getElementById("fileInput").addEventListener('change', fileReader, false);
    function readFile(file) {
        return new Promise(function (resolve) {
            reader.readAsText(file);
    
            //読込終了後の処理
            reader.onload = function (ev) {
                //テキストエリアに表示する
                let fileData = reader.result;
                files[file.name] = {data:fileData}
                try{
                    setLocalData("JavaDocConverter", files);
                    addFile(file.name);
                    readData(file.name);
                }catch(e){
                    //console.log(e)
                    delete files[file.name];
                    setLocalData("JavaDocConverter", files);
                    document.getElementById(file.name).remove();
                }
                resolve();
            }
        });
    }
})(document);
function readData(name) {
    if(!(name in files)) return;
    selectedFileStyle(name);
    let fileData = files[name].data;
    let fileName = name.split(".");

    document.getElementById("classPreviewBtn").onclick = function(){
        switchClassDisplay('diagram');
        classproperty_to_classdiagram(fileName[0]);
    }
    
    if (fileName[fileName.length - 1] == "java") {
        document.getElementById("java").innerText = fileData;
        fileData = java_to_doc(fileData);
    } else if(fileName[fileName.length - 1] == "html" || fileName[fileName.length - 1] == "htm"){
        fileData = new DOMParser().parseFromString(fileData, "text/html");
        document.getElementById("java").innerText = doc_to_java(fileData);
    } else return;

    document.getElementById("list").innerHTML = doc_to_list(fileData);
    document.getElementById("latex").innerHTML = doc_to_latex(fileData);

    doc_to_classproperty(fileData);
}