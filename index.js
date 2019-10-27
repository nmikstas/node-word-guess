let GameEngine = require("./gameEngine.js");
let inquirer   = require("inquirer");

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
        gameEngine.processInput(guessedLetter);
    });
}

//The game execution starts here.
try
{
     //Try to instatiate the game engine object.
    gameEngine = new GameEngine("./phrases.txt", getInput);
}
catch(error)
{
    console.log(error);
}


