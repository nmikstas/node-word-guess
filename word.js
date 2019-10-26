var Letter = require("./letter.js");

//The constructor for letter objects.
var Word = function(word)
{
    this.wordLetters = [];

    //Make sure only letters and spaces exist in the word.
    let checkArray = word.split("");
    for(let i = 0; i < checkArray.length; i++)
    {
        if(!checkArray[i].match(/[a-z ]/i))
        {
            console.log("Invalid word");
            return;
        }
    }

    //Everything checks out.  Fill the wordLetters array.
    for(let i = 0; i < checkArray.length; i++)
    {
        this.wordLetters.push(new Letter(checkArray[i].toLowerCase()));
    }

    //Return the current state of the word.
    this.getWord = function()
    {
        let wordString = "";

        for(let i = 0; i < this.wordLetters.length; i++)
        {
            wordString += this.wordLetters[i].getLetter() + " ";
        }

        return wordString;
    }

    //Attempt to guess a letter in the word.
    this.guessLetter = function(letter)
    {
        for(let i = 0; i < this.wordLetters.length; i++)
        {
            this.wordLetters[i].guessLetter(letter.toLowerCase());
        }
    }
}

module.exports = Word;