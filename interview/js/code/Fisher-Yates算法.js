function shuffer(array){
  const len = array.length;
  let currentIndex=len;
  while(currentIndex!==0){
    const randomIndex=Math.floor(Math.random()*len);
    currentIndex--;
    [array[currentIndex],array[randomIndex]]=[array[randomIndex],array[currentIndex]]
   
  }
  return array;
}
console.log(shuffer([1,2,3,4,5]))