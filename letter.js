//The constructor for letter objects.
let Letter = function(letter)
{
    if(letter.match(/[a-z]/i) && letter.length == 1)
    {
        this.letter = letter.toLowerCase();
        this.isGuessed = false;
    }
    else if(letter === " ") //Special case for space.
    {
        this.letter = letter;
        this.isGuessed = true;
    }
    else throw "Invalid Letter";

    //Return the letter if it has been guessed, _ if not.
    this.getLetter = function()
    {
        return this.isGuessed ? this.letter : "_";
    }

    //Make a guess at the letter.
    this.guessLetter = function(letter)
    {
        if(letter.toLowerCase() === this.letter)
        {
            this.isGuessed = true;
        }
    }
}

module.exports = Letter;