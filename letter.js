//The constructor for letter objects.
var Letter = function(letter)
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
    else
    {
        this.letter = "*";
        this.isGuessed = true;
        console.log("Invalid letter");
    }

    this.getLetter = function()
    {
        return this.isGuessed ? this.letter : "_";
    }

    this.guessLetter = function(letter)
    {
        if(letter.toLowerCase() === this.letter)
        {
            this.isGuessed = true;
        }
    }
}

module.exports = Letter;