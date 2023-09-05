
// 'this is   a example'->'example a is this'
function reverse(str){
  return str.replace(/\s+/g,' ').split(' ').reverse().join(' ')
}
console.log(reverse('this is   a example'))