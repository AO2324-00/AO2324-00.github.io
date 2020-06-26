/**
 * 例
 *  myHand("left").to("enemy", "right") AIの左手でプレイヤーの右手を攻撃
 *  myHand("right").to("friend", 2) AIの右手の指2本をAI自身の左手に分身 (.toの後の第二引数が、自身の指の数の範囲外の場合はエラーを出力する)
 * @param {left:Number, right:Number} myHands AI自身の手の指の数 変更不可 ( 左手: myHands.left ,  右手: myHands.right )
 * @param {left:Number, right:Number} enemyHands プレイヤーの手の指の数 変更不可 ( 左手: enemyHands.left ,  右手: enemyHands.right )
 */
function bot(myHands, enemyHands){

//=サンプルアルゴリズム(完全にランダム)===========================
    switch (Math.floor(Math.random()*5)) {
        case 0:
                if(myHands.left != 0) myHand("left").to("enemy", "left");
                else bot(myHands, enemyHands);
            break;
        case 1:
                if(myHands.left != 0) myHand("left").to("enemy", "right");
                else bot(myHands, enemyHands);
            break;
        case 2:
                if(myHands.right != 0) myHand("right").to("enemy", "left");
                else bot(myHands, enemyHands);
            break;
        case 3:
                if(myHands.right != 0) myHand("right").to("enemy", "right");
                else bot(myHands, enemyHands);
            break;
        case 4:
                if(myHands.left != 0) myHand("left").to("friend", Math.floor(Math.random()  * (myHands.left-1))+1 );
                else bot(myHands, enemyHands);
            break;
        case 5:
                if(myHands.right != 0) myHand("right").to("friend", Math.floor(Math.random() * (myHands.right-1))+1 );
                else bot(myHands, enemyHands);
            break;
        default:
            break;
    }
//===============================================

}