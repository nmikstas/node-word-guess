var Word = require("./word.js");

let word = new Word("Hello");

console.log(word.getWord());

word.guessLetter("H");
console.log(word.getWord());

word.guessLetter("Q");
console.log(word.getWord());

word.guessLetter("O");
console.log(word.getWord());

word.guessLetter("l");
console.log(word.getWord());

word.guessLetter("E");
console.log(word.getWord());



