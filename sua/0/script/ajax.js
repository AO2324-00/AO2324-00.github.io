function getData(path) {
    let httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        alert("中断 :( XMLHTTP インスタンスを生成できませんでした");
        return false;
    }
    httpRequest.onreadystatechange = getContents;
    httpRequest.open('GET', path);
    httpRequest.send();

    function getContents() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {
                //console.log(httpRequest.responseText);
                let checkRequest;
                if (httpRequest.responseText == 'false')checkRequest = false;
                else checkRequest = true;
                dataLoad(httpRequest, checkRequest);
            } else {
                alert('リクエストに問題が発生しました');
            }
        }
    }
}

function sendData(data){
    let httpRequest = new XMLHttpRequest();
    let urlEncodedData = "";
    let urlEncodedDataPairs = [];
    let name;

    //dataオブジェクトを，URL エンコードしたキーとあたいのペアの配列に変換します
    for(name in data){
        urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    }

    /*キーとあたいのペアを一つの文字列に連結して，webブラウザのフォーム送信方式に合うように，
    エンコードされた空白をプラス記号に置き換えます*/
    urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');
/*
    //データが正常に送信された場合に行うことを定義します
    httpRequest.addEventListener('load', function(event){
        alert('Yeah! Data sent and response loaded.');
    });
    //エラーが発生した場合に行うことを定義します
    httpRequest.addEventListener('error', function(event){
        alert('Oups! Something goes wrong.');
    });
*/
    //リクエストをセットアップします
    httpRequest.open('POST', location.origin);

    httpRequest.send(urlEncodedData);
}