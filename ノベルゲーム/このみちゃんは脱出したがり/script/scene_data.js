const scene_list = [[/*導入*/], [/*問題*/], [/*回答1*/], [/*回答2*/], [/*回答3*/], [/*エンディング*/]];

//導入
scene_list[0].push(["text", "descriptive", "ある女の子らしい部屋の中で、<ruby><rb>脱出</rb><rp>（</rp><rt>だついで</rt><rp>）</rp></ruby>このみは一人頭を傾げていた。"]);
scene_list[0].push(["text", "このみ", "「妹が私を閉じ込めた……」"]);
scene_list[0].push(["bgm", "play", "./data_bgm/Close_Room_1_Gillthim.mp3"]);
scene_list[0].push(["text", "descriptive", "このみは俯くと、やがて肩を震わせはじめた。"]);
scene_list[0].push(["text", "このみ", "「あはは！　よくやった妹！　こんな感じで自分の部屋から脱出してみたかったんだよなー」"]);
scene_list[0].push(["text", "descriptive", "このみは高らかに笑うと部屋の真ん中の、膝下程の丸いテーブルに置いてあるヒントと書かれた紙を手に取った。"]);
scene_list[0].push(["se", "./data_se/"]);//se1手紙を取る
scene_list[0].push(["text", "このみ", "なるほど、ヒントがあるんだな。<br>「なになに……、幼馴染の男子に電話して脱出することがルール？　心当たりが一人しかいないんだけど」"]);
scene_list[0].push(["text", "descriptive", "そういってこのみはスマホを取り出すと番号を入力した。"]);
scene_list[0].push(["se", "./data_se/"]);//se2電話番ん号を打つ

scene_list[0].push(["choice",  "descriptive", "スマホの呼び出し音が流れている", [ "電話に出る", "電話に出ない" ] ,
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

scene_list[0].push(["text", "descriptive", "このみはスマホを片方の手でもち、もう一つあった紙を手にした。"]);
scene_list[0].push(["text", "このみ", "『お、案外簡単そう。一つだけ問題解けばいいみたい。暇つぶしぐらいにはなりそうね』"]);
scene_list[0].push(["bgm", "play", "./data_bgm/Close_Room_2_Gillthim.mp3"]);
scene_list[0].push(["text", "descriptive", "このみはスマホを片方の手でもち、もう一つあった紙を手にした。"]);
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
scene_list[1].push(["text", "descriptive", "そして数分後、監視カメラを覗き込んだ。"]);
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
scene_list[2].push(["text", "descriptive", "しばらくして返信を知らせる着信音が鳴った。"]);

scene_list[2].push(["choice",  "このみ", "『……違うってさ！　人気ありそうじゃん！<br>うーん、ご飯はなくなったけど、わからないままなのも嫌ね。頑張ろう』", [  "答えは 総理大臣 だと伝える", "答えは スーパーアイドル だと伝える"] ,
    [  "change_scene", 3] ,
    [  "change_scene", 4] 
]);
//回答２(総理大臣)

//回答３(スーパーアイドル)
scene_list[4].push(["text", "このみ", "『私もそれだと思ってた！　スーパーって言ってるんだし人気ありそうだよね』"]);
scene_list[4].push(["text", "descriptive", "このみはすぐさまスマホで妹にメッセージを送ると、タダ飯が食べれる事を想像しているのか涎を垂らし始めた"]);
scene_list[4].push(["text", "descriptive", "数分もしないうちの返信。"]);
scene_list[4].push(["text", "このみ", "『はぁ！？　違うって！　スーパー言ってるやん！』"]);
scene_list[4].push(["text", "descriptive", "このみは適当な方言で喚き散らしていた。"]);

scene_list[4].push(["choice",  "このみ", "『まあ、仕方ない。悔しいから一から考え直すよ！』", ["答えは 有名スポーツ選手 だと伝える",  "答えは 総理大臣 だと伝える"] ,
    [  "change_scene", 2] ,
    [  "change_scene", 3] 
]);
console.log(scene_list);