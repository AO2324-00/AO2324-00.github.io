const scene_list = [[/*導入*/], [/*問題*/], [/*回答1*/], [/*回答2*/], [/*回答3*/], [/*回答1後*/], [/*回答2後*/], [/*回答3後*/], [/*エンディング*/], [/*失敗エンディング1*/], [/*失敗エンディング2*/]];

//導入
scene_list[0].push(['darkening']);
scene_list[0].push(['span', 1000]);
scene_list[0].push(["text", "descriptive", "ある女の子らしい部屋の中で、<ruby><rb>脱出</rb><rp>（</rp><rt>だついで</rt><rp>）</rp></ruby>このみは一人頭を傾げていた。"]);
scene_list[0].push(["text", "このみ", "「妹が私を閉じ込めた……」"]);
scene_list[0].push(["bgm", "play", "./data_bgm/Close_Room_1_Gillthim.ogg"]);
scene_list[0].push(["fead", "in"]);
scene_list[0].push(["text", "descriptive", "このみは俯くと、やがて肩を震わせはじめた。"]);
scene_list[0].push(["text", "このみ", "「あはは！　よくやった妹！　こんな感じで自分の部屋から脱出してみたかったんだよなー」"]);
scene_list[0].push(["text", "descriptive", "このみは高らかに笑うと部屋の真ん中の、膝下程の丸いテーブルに置いてあるヒントと書かれた紙を<span class=hide>[./data_se/01Paper.wav]</span>手に取った。"]);
scene_list[0].push(["text", "このみ", "なるほど、ヒントがあるんだな。<br>「なになに……、幼馴染の男子に電話して脱出することがルール？　心当たりが一人しかいないんだけど」"]);
scene_list[0].push(["text", "descriptive", "そういってこのみはスマホを取り出すと番号を入力<span class=hide>[./data_se/02Call.wav]</span>した。"]);

scene_list[0].push(["choice",  "descriptive", "<span class=hide>[./data_se/03Notification.wav]</span>スマホの着信音がなった", [ "電話に出る", "電話に出ない" ] ,
    [  "skip" ] ,
    [ "loop", "descriptive", "こにみは少し苛立ちを見せながら、電話をかけ直した。" ]
]);

scene_list[0].push(["choice",  "descriptive", "『ねえもしもし？　聞こえる？』", [ "「聞こえるよ」", "「・・・」"] ,
    ["next", "descriptive", "『お、反応したね？　それじゃよろしく！』"] ,
    ["choice", "descriptive", "『ねえって、ねえ！』", [ "「聞こえてるよ」", "「・・・」"] ,
        ["next", "descriptive", "『お、反応したね？　それじゃよろしく！』"],
        ["choice", "descriptive", "『見てるんでしょ、監視カメラあるんだけど』", ["返事をする"],
            ["next", "descriptive", "『やっと返事したね、それじゃよろしく！』"]
        ]
    ]
]);

scene_list[0].push(["text", "descriptive", "このみはスマホを片方の手でもち、もう一つあった紙を<span class=hide>[./data_se/01Paper.wav]</span>手にした。"]);
scene_list[0].push(["text", "このみ", "『お、案外簡単そう。一つだけ問題解けばいいみたい。暇つぶしぐらいにはなりそうね』"]);
scene_list[0].push(["bgm", "play", "./data_bgm/Close_Room_2_Gillthim.ogg"]);
scene_list[0].push([  "change_scene", 1]);

//問題
scene_list[1].push(["text", "descriptive", "このみは紙を監視カメラに見せた。監視カメラの位置は部屋の角にあたる天井で、このみは自然とつま先立ちになった。"]);
scene_list[1].push(["change_background_image", "./img/"]);//img
scene_list[1].push(["text", "このみ", "『有名スポーツ選手、総理大臣、スーパーアイドル、この中で本当に人気があるのは誰でしょう？』"]);
scene_list[1].push(["text", "descriptive", "このみは辛そうに足を震えさせていた。"]);
scene_list[1].push(["text", "このみ", "『もういい……？　わかりそう？』"]);
scene_list[1].push(["text", "descriptive", "もう限界と、このみは勢いよく数歩後ろに下がった。"]);
scene_list[1].push(["change_background_image", "./img/"]);//img
scene_list[1].push(["get_infomation", "問題", "有名スポーツ選手、総理大臣、スーパーアイドル、この中で本当に人気があるのは誰でしょう？"]);
scene_list[1].push(["text", "このみ", "『一発でわかったら妹がご飯奢るらしいから頑張るよ！』"]);
scene_list[1].push(["text", "descriptive", "このみは意気込むと、顎に手を当て思案した。"]);
scene_list[1].push(["fead", 'out']);
scene_list[1].push(["span", '500']);
scene_list[1].push(["text", "descriptive", "そして数分後、監視カメラを覗き込んだ。"]);
scene_list[1].push(["fead", 'in']);
scene_list[1].push(["text", "このみ", "『ぜんっぜんわかんない！　そっちはわかったの？』"]);
scene_list[1].push(["change_background_image", "./img/"]);//img
scene_list[1].push(["text", "descriptive", "このみは分からない苛立ち混じりに監視カメラを睨みつけた。"]);

scene_list[1].push(["choice",  "このみ", "『わかったなら言ってね、ご飯がかかってるんだから！』", [ "答えは 有名スポーツ選手 だと伝える", "答えは 総理大臣 だと伝える", "答えは スーパーアイドル だと伝える"] ,
    [  "change_scene", 2] ,
    [  "change_scene", 3] ,
    [  "change_scene", 4] 
]);
let check_scene = [0, 0];

//回答１(有名スポーツ選手)
scene_list[2].push(["text", "このみ", "『え？　有名スポーツ選手が？』"]);
scene_list[2].push(["text", "descriptive", "このみは不審げにカメラを覗き込む。"]);
scene_list[2].push(["text", "このみ", "『確かに人気……はありそうだし。妹に送ってみる』"]);
scene_list[2].push(["text", "descriptive", "そういうと、このみはスマホで妹にメッセージを送った。"]);
scene_list[2].push(["fead", 'out']);
scene_list[2].push(["span", 1000]);
scene_list[2].push(["text", "descriptive", "しばらくして返信を知らせる<span class=hide>[./data_se/03Notification.wav]</span>着信音が鳴った。"]);
scene_list[2].push(["fead", 'in']);

scene_list[2].push(["choice",  "このみ", "『……違うってさ！　人気ありそうじゃん！<br>うーん、ご飯はなくなったけど、わからないままなのも嫌ね。頑張ろう』", [  "答えは 総理大臣 だと伝える", "答えは スーパーアイドル だと伝える"] ,
    [  "change_scene", 6] ,
    [  "change_scene", 7] 
]);
//回答２(総理大臣)
scene_list[3].push(["text", "このみ", "『え、なんで総理大臣？　他の方が人気ありそうじゃない？』"]);
scene_list[3].push(["text", "descriptive", "このみは納得いかない様子でしばらく考えていた。"]);
scene_list[3].push(["text", "このみ", "『にしてもなんで総理大臣……。理由があるって？　なら、信じるけど』"]);
scene_list[3].push(["text", "descriptive", "まだ納得いかないといった様子だったが、このみはスマホで妹にメッセージを送った。"]);
scene_list[3].push(["text",  "このみ", "『本当に総理大臣で正解なの？』"]);
scene_list[3].push(["text", "descriptive", "とその時だった。<br><span class=hide>[./data_se/04OpenDoor.wav]</span>部屋のドアが無遠慮に開かれた。"]);
scene_list[3].push(["text", "descriptive", "このみの目が丸くなり、開いたドアに立つ妹を見ていた。"]);
scene_list[3].push([  "change_scene", 8]);

//回答３(スーパーアイドル)
scene_list[4].push(["text", "このみ", "『私もそれだと思ってた！　スーパーって言ってるんだし人気ありそうだよね』"]);
scene_list[4].push(["text", "descriptive", "このみはすぐさまスマホで妹にメッセージを送ると、タダ飯が食べれる事を想像しているのか涎を垂らし始めた。"]);
scene_list[4].push(["fead","out"]);
scene_list[4].push(["span", 500]);
scene_list[4].push(["se", "./data_se/03Notification.wav"]);
scene_list[4].push(["span", 1000]);
scene_list[4].push(["text", "descriptive", "数分もしないうちの返信。"]);
scene_list[4].push(["fead","in"]);
scene_list[4].push(["text", "このみ", "『はぁ！？　違うって！　スーパー言ってるやん！』"]);
scene_list[4].push(["text", "descriptive", "このみは適当な方言で喚き散らしていた。"]);

scene_list[4].push(["choice",  "このみ", "『まあ、仕方ない。悔しいから一から考え直すよ！』", ["答えは 有名スポーツ選手 だと伝える",  "答えは 総理大臣 だと伝える"] ,
    [  "change_scene", 5] ,
    [  "change_scene", 6] 
]);

//回答１(有名スポーツ選手)後
scene_list[5].push(["text", "このみ", "『え？　有名スポーツ選手が？』"]);
scene_list[5].push(["text", "descriptive", "このみは不審げにカメラを覗き込む。"]);
scene_list[5].push(["text", "このみ", "『確かに人気……はありそうだし。妹に送ってみる』"]);
scene_list[5].push(["text", "descriptive", "そういうと、このみはスマホで妹にメッセージを送った。"]);
scene_list[5].push(["fead", 'out']);
scene_list[5].push(["span", 1000]);
scene_list[5].push(["text", "descriptive", "しばらくして返信を知らせる<span class=hide>[./data_se/03Notification.wav]</span>着信音が鳴った。"]);
scene_list[5].push(["fead", 'in']);
scene_list[5].push(["text",  "このみ", "『……違うってさ！　人気ありそうじゃん！<br>うーん、ってことは，総理大臣が答え ?』"]);
scene_list[5].push([  "change_scene", 10]);

//回答２(総理大臣)後
scene_list[6].push(["text", "このみ", "『え、なんで総理大臣？　他の方が人気ありそうじゃない？』"]);
scene_list[6].push(["text", "descriptive", "このみは納得いかない様子でしばらく考えていた。"]);
scene_list[6].push(["text", "このみ", "『にしてもなんで総理大臣……。理由があるって？　なら、信じるけど』"]);
scene_list[6].push(["text", "descriptive", "まだ納得いかないといった様子だったが、このみはスマホで妹にメッセージを送った。"]);
scene_list[6].push(["text",  "このみ", "『本当に総理大臣で正解なの？』"]);
scene_list[6].push(["text", "descriptive", "とその時だった。<br><span class=hide>[./data_se/04OpenDoor.wav]</span>部屋のドアが無遠慮に開かれた。"]);
scene_list[6].push(["text", "descriptive", "このみの目が丸くなり、開いたドアに立つ妹を見ていた。"]);
scene_list[6].push([  "change_scene", 9]);

//回答３(スーパーアイドル)後
scene_list[7].push(["text", "このみ", "『私もそれかもって思ってた！　スーパーって言ってるんだし人気ありそうだよね』"]);
scene_list[7].push(["text", "descriptive", "このみはすぐさまスマホで妹にメッセージを送ると、タダ飯が食べれる事を想像しているのか涎を垂らし始めた"]);
scene_list[7].push(["fead","out"]);
scene_list[7].push(["span", 500]);
scene_list[7].push(["se", "./data_se/03Notification.wav"]);
scene_list[7].push(["span", 1000]);
scene_list[7].push(["text", "descriptive", "数分もしないうちの返信。"]);
scene_list[7].push(["fead","in"]);

scene_list[7].push(["text",  "このみ", "『はぁ！？　違うって！　スーパー言ってるやん！<br>ってことは，総理大臣が答えなの ?』"]);
scene_list[7].push([  "change_scene", 10]);
console.log(scene_list);

//エンディング
scene_list[8].push(["se", "./data_se/05Correct_answer.wav"]);
scene_list[8].push(["bgm", "stop"]);
scene_list[8].push(["text", "妹", "正解でーす！　本当に任期（人気）があるからでしたぁ！　お姉ちゃんよくわかったね"]);
scene_list[8].push(["text", "descriptive", "妹の手は南京錠を持っており、それで閉じ込めていたのが伺える。"]);
scene_list[8].push(["text", "このみ", "『まじか。ふうっ！　これでタダ飯だ』"]);
scene_list[8].push(["text", "descriptive", "このみは電話を切ることを忘れて喜んでいた。が、通話中のスマホに気付くとカメラを見て笑みを浮かべた。"]);
scene_list[8].push(["text",  "このみ", "『一緒に考えてくれてありがとね！　今日は外食よ』"]);
scene_list[8].push(["text", "妹", "え、外食なの？　金欠が……"]);
scene_list[8].push(["text", "このみ", "一発でクリアしたんだから、約束でしょ？"]);
scene_list[8].push(["text", "妹", "うぅ……"]);
scene_list[8].push(["text", "このみ", "『あんたもそこで見てないで早く出て来て。　食べに行くよ！』"]);

//失敗エンディング1
scene_list[9].push(["se", "./data_se/05Correct_answer.wav"]);
scene_list[9].push(["bgm", "stop"]);
scene_list[9].push(["text", "妹", "正解でーす！　本当に任期（人気）があるからでしたぁ！　お姉ちゃんよくわかったね"]);
scene_list[9].push(["text", "descriptive", "妹の手は南京錠を持っており、それで閉じ込めていたのが伺える。"]);
scene_list[9].push(["text", "このみ", "『まじか。ふうっ！　まあ、いい暇つぶしぐらいにはなったわね』"]);
scene_list[9].push(["text",  "このみ", "『一緒に考えてくれてありがとね！』<br>『奢ってもらえないのは残念だけど、せっかくの機会だし、どこかに食べに行きましょ！』"]);
scene_list[9].push(["text", "このみ", "『あんたも行くのよ！』<br>『そんなところで見てないで、早く出て来なさい。』"]);

//失敗エンディング2
scene_list[10].push(["text", "descriptive", "とその時だった。<br><span class=hide>[./data_se/04OpenDoor.wav]</span>部屋のドアが無遠慮に開かれた。"]);
scene_list[10].push(["text", "descriptive", "このみの目が丸くなり、開いたドアに立つ妹を見ていた。"]);
scene_list[10].push(["bgm", "stop"]);
scene_list[10].push(["text", "妹", "もう！お姉ちゃん達、全然正解しないじゃん！"]);
scene_list[10].push(["text", "descriptive", "妹の手は南京錠を持っており、それで閉じ込めていたのが伺える。"]);
scene_list[10].push(["text", "このみ", "『まじか。ふうっ...　やっと解放された...』"]);
scene_list[10].push(["text",  "このみ", "『一緒に考えてくれてありがとね。』<br>『でも、正解できなかったのはあなたのせいでもあるんだから、責任とって妹の代わりに奢ってよね！』"]);
scene_list[10].push(["text", "妹", "やった！　奢りだー！"]);
scene_list[10].push(["text", "descriptive", "あなたは、このみ と妹にご飯を奢ることになった。"]);