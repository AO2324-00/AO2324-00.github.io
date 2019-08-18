/*
Javascript
関数(funk1)の引数に配列が入った変数Aを入れて，その関数内で変数Aを引数とした関数(funk2)を作った．
*/

function func2 (A){
    console.log(A);
}

function func1 (A){
    func2(A);
}

function func0(){
    a = [ ["a","b","c"], ["x", "y", "z"]];
    A = a[0];
    func1(A);
}
func0();