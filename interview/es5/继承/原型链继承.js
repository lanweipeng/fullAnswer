function Person(){
  this.name = '无名氏';
}
Person.prototype.setName = function(name){
  this.name = name;
}
Person.prototype.getName = function(){
  return this.name;
}
function Student(){
  this.name = '';
  this.score = 0;
}

Student.prototype = new Person();
Student.prototype.setScore = function(score){
  this.score = score;
}
Student.prototype.getScore = function(){
  return this.score
}
const s1 = new Student();
console.log(s1,s1.getName())
s1.setName('lwp')
s1.setScore(90)
console.log(s1.getName(),s1.getScore())


