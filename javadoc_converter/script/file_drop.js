"use.strict";
/** ファイルのドラッグアンドドロップ処理 */
(function (document) {
    const dropArea = document.getElementById("dropArea");
    // ドラッグ中の要素がドロップ要素に重なった時
    dropArea.addEventListener('dragover', function (evt) {
        evt.preventDefault();

        // ファイルのコピーを渡すようにする
        evt.dataTransfer.dropEffect = 'copy';

        dropArea.style.backgroundColor = "rgba(197, 197, 197, 0.5)";
    });

    // ドラッグ中の要素がドロップ要素から外れた時
    dropArea.addEventListener('dragleave', function () {
        dropArea.style.backgroundColor = "";
    });

    // ドロップ要素にドロップされた時
    dropArea.addEventListener('drop', function (evt) {
        evt.preventDefault();

        dropArea.style.backgroundColor = "";
        //output.textContent = '';

        // ev.dataTransfer.files に複数のファイルのリストが入っている
        fileReader(evt, true);
    });
})(document);