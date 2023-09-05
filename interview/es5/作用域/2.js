let a  = '111'
function say(){
    let a = '222'
    sayA()
    function sayA(){
      console.log(a);
    }
}
say()  //输出222