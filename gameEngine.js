let WordGen    = require("./wordGen.js");
let Word       = require("./word.js");
let colors     = require("colors");

//This is where the guts of the game are stored.
let GameEngine = function(fileName, inputCallback)
{
    this.NUM_GUESSES   = 9; 
    this.inputCallback = inputCallback;
    this.fileName      = fileName;
    this.guessesLeft   = this.NUM_GUESSES;
    this.badGuesses    = [];
    this.goodGuesses   = [];
    this.wins          =  0;
    this.losses        =  0;
    this.wordGen;
    this.thisWord;

    let self = this;
    this.runGame = function()
    {
        //Pick a new random word.
        self.thisWord = new Word(self.wordGen.getWord());
        self.guessesLeft = self.NUM_GUESSES;
        self.badGuesses  = [];
        self.goodGuesses = [];
        
        console.log("\n************** New Word **************".yellow);
        console.log(self.thisWord.getWord() + "\n");

        //Get the user's letter guess.
        setTimeout(self.inputCallback, 0); //Do this to prevent filling up the stack.    
    }

    this.processInput = function(guessedLetter)
    {
        //Record how many underscores are left before the guess.
        //Then make a guess and check to see if the number of 
        //underscores changed.
        let guess = guessedLetter.guess.toLowerCase();
        let lastUnderscores = this.thisWord.countUnderscores();
        this.thisWord.guessLetter(guess);
        let thisUnderscores = this.thisWord.countUnderscores();

        if(!thisUnderscores) //Check for a win.
        {
            this.wins++;
            console.log("\n************** You Win! **************".green);
            console.log(this.thisWord.getWord());
            console.log("Wins:   " + this.wins.toString().magenta);
            console.log("Losses: " + this.losses.toString().magenta);
            setTimeout(this.runGame, 0); //Do this to prevent filling up the stack.
        }
        else //Check the other conditions.
        {
            //Check if the player correctly guessed a letter.
            if(lastUnderscores !== thisUnderscores)
            {
                console.log("\n**************** Hit! ****************".yellow);
                console.log(this.thisWord.getWord());
                console.log("Bad guesses:  " + this.badGuesses.toString().cyan);
                console.log("guesses left: " + this.guessesLeft.toString().cyan + "\n");
                this.goodGuesses.push(guess)
                setTimeout(this.inputCallback, 0); //Do this to prevent filling up the stack.
            }
            //Check if the letter has already been guessed.
            else if(this.badGuesses.includes(guess) || this.goodGuesses.includes(guess))
            {
                console.log("\n********** Already Guessed! **********".yellow);
                console.log(this.thisWord.getWord());
                console.log("Bad guesses:  " + this.badGuesses.toString().cyan);
                console.log("guesses left: " + this.guessesLeft.toString().cyan + "\n");
                setTimeout(this.inputCallback, 0); //Do this to prevent filling up the stack.
            }
            else
            {
                //Wrong guess and letter not already guessed.
                this.guessesLeft--;
                this.badGuesses.push(guess)

                if(!this.guessesLeft) //Check for a loss.
                {
                    this.losses++;
                    console.log("\n************* You Lose! **************".red);
                    console.log(this.thisWord.revealWord());
                    console.log("Wins:   " + this.wins.toString().magenta);
                    console.log("Losses: " + this.losses.toString().magenta);
                    setTimeout(this.runGame, 0); //Do this to prevent filling up the stack.
                }
                else //Keep playing.
                {
                    console.log("\n*************** Miss! ****************".yellow);
                    console.log(this.thisWord.getWord());
                    console.log("Bad guesses:  " + this.badGuesses.toString().cyan);
                    console.log("guesses left: " + this.guessesLeft.toString().cyan + "\n");
                    setTimeout(this.inputCallback, 0); //Do this to prevent filling up the stack.
                }
            }
        }
    }

    console.log("\n\n\n-----Node.js Word Guess Game-------");
    console.log("type " + "quit".red + " or " + "exit".red + " to leave the game");
    this.wordGen = new WordGen(this.fileName, this.runGame);
}

module.exports = GameEngine;