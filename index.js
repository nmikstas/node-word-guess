let GameEngine = require("./gameEngine.js");
let inquirer   = require("inquirer");

let gameEngine;

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
                //Exit if user types "quit" or "exit".
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
        //Do this to prevent filling up the stack with infinite recursive calls.
        setTimeout(function(){gameEngine.processInput(guessedLetter)}, 0);
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
