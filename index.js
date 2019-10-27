let WordGen  = require("./wordGen.js");
let Word     = require("./word.js");
let inquirer = require("inquirer");
let colors   = require("colors");

const numGuesses = 9;

let wordGen;
let thisWord;
let badGuesses  = [];
let goodGuesses = [];
let wins        =  0;
let losses      =  0;
let guessesLeft = numGuesses;

let getInput = function()
{
    //Get a letter guess from the player.
    inquirer.prompt
    ([
        {
            name: "guess",
            message: "Guess a letter:",
            validate: function(value)
            {
                //Exit early if user types "quit" or "exit".
                let val = value.toLowerCase();
                if(val === "quit" || val === "exit")
                {
                    process.exit(0);
                }

                if (value.length === 1 && value.match(/[a-z]/i))
                {
                    return true;
                }

                return false;
            }
        }
    ]).then(function(guessedLetter)
    {
        //Record how many underscores are left before the guess.
        //Then make a guess and check to see if the number of 
        //underscores changed.
        let lastUnderscores = thisWord.countUnderscores();
        thisWord.guessLetter(guessedLetter.guess);
        let thisUnderscores = thisWord.countUnderscores();

        if(!thisUnderscores) //Check for a win.
        {
            wins++;
            console.log("\n************** You Win! **************".green);
            console.log(thisWord.getWord());
            console.log("Wins:   " + wins.toString().magenta);
            console.log("Losses: " + losses.toString().magenta);
            setTimeout(runGame, 0); //Do this to prevent filling up the stack.
        }
        else //Check the other conditions.
        {
            //Check if the player correctly guessed a letter.
            if(lastUnderscores !== thisUnderscores)
            {
                console.log("\n**************** Hit! ****************".yellow);
                console.log(thisWord.getWord());
                console.log("Bad guesses:  " + badGuesses.toString().cyan);
                console.log("guesses left: " + guessesLeft.toString().cyan + "\n");
                goodGuesses.push(guessedLetter.guess)
                setTimeout(getInput, 0); //Do this to prevent filling up the stack.
            }
            //Check if the letter has already been guessed.
            else if(badGuesses.includes(guessedLetter.guess) || goodGuesses.includes(guessedLetter.guess))
            {
                console.log("\n********** Already Guessed! **********".yellow);
                console.log(thisWord.getWord());
                console.log("Bad guesses:  " + badGuesses.toString().cyan);
                console.log("guesses left: " + guessesLeft.toString().cyan + "\n");
                setTimeout(getInput, 0); //Do this to prevent filling up the stack.
            }
            else
            {
                //Wrong guess and letter not already guessed.
                guessesLeft--;
                badGuesses.push(guessedLetter.guess)

                if(!guessesLeft) //Check for a loss.
                {
                    losses++;
                    console.log("\n************* You Lose! **************".red);
                    console.log(thisWord.revealWord());
                    console.log("Wins:   " + wins.toString().magenta);
                    console.log("Losses: " + losses.toString().magenta);
                    setTimeout(runGame, 0); //Do this to prevent filling up the stack.
                }
                else //Keep playing.
                {
                    console.log("\n*************** Miss! ****************".yellow);
                    console.log(thisWord.getWord());
                    console.log("Bad guesses:  " + badGuesses.toString().cyan);
                    console.log("guesses left: " + guessesLeft.toString().cyan + "\n");
                    setTimeout(getInput, 0); //Do this to prevent filling up the stack.
                }
            }
        }
    });
}

let runGame = function()
{
    //Pick a new random word.
    thisWord = new Word(wordGen.getWord());
    badGuesses  = [];
    goodGuesses = [];
    guessesLeft = numGuesses;

    console.log("\n************** New Word **************".yellow);
    console.log(thisWord.getWord() + "\n");

    //Get the user's letter guess.
    setTimeout(getInput, 0); //Do this to prevent filling up the stack.    
}

//The game execution starts here.
console.log("\n\n\n-----Node.js Word Guess Game-------");
console.log("type " + "quit".red + " or " + "exit".red + " to leave the game");
try
{
    //Try to instatiate the word generator object.
    wordGen = new WordGen("./phrases.txt", runGame);
}
catch(error)
{
    console.log(error);
}


