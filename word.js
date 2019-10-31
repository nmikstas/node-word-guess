let Letter = require("./letter.js");

//The constructor for letter objects.
let Word = function(word)
{
    this.wordLetters = [];
    this.revealedWord = "";

    //Make sure only letters and spaces exist in the word.
    let checkArray = word.split("");
    for(let i = 0; i < checkArray.length; i++)
    {
        if(!checkArray[i].match(/[a-z ]/i))
        {
            throw "Invalid Word";
        }
    }

    //Everything checks out. Fill the wordLetters array.
    for(let i = 0; i < checkArray.length; i++)
    {
        this.wordLetters.push(new Letter(checkArray[i].toLowerCase()));
    }

    //Create a string of the fully revealed word.
    for(let i = 0; i < checkArray.length; i++)
    {
        this.revealedWord += checkArray[i] + " ";
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

    //Returns the number of underscores in the word.
    this.countUnderscores = function()
    {
        let numUnderscores = 0;
        for(let i = 0; i < this.wordLetters.length; i++)
        {
            if(this.wordLetters[i].getLetter() === "_")
            {
                numUnderscores++;
            }
        }

        return numUnderscores;
    }

    //Returns the complete word.
    this.revealWord = function()
    {
        return this.revealedWord;
    }
}

module.exports = Word;