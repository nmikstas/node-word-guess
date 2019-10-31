# node-word-guess
### Problem Statement
This assignment is an exercise designed test our abilities to break a programming problem down into several packages.  The packages must then be exported and used by multiple different modules. It is an optional assignment for coding bootcamp.

### High-level Overview
This program is a command line version of the hangman word guess game. It reads a random word from a file of many words. In this case, it is reading a file calles `phrases.txt`. Although the current file supplied only has single words in it, the application can accept multi-word phrases. The `phrases.txt` file has nearlt a 1,000 words in it. The game will repeat indefinitely until the user types `exit` or `quit`.

### App Instructions
Simply start the application by typing `node index.js` at the command line. No additional command line arguments are supported. The game will immediately start and the player will be asked to guess a letter.  The player will be given a total of 9 incorrect letter guesses bofore the round is lost. If the player guesses the entire word before the 9 guesses are used, the wins tally will be incremented by 1.  If the player uses all 9 letter guesses and the word is till not complete, the losses tally wil be incremented instead.  The game will play indefinitely until the user types `exit` or `quit`. As the player quesses letters, the hit or miss and win or loss status of the current round will de updated.  Also, the current word with all the guessed and unguessed letters will be updates.  The unguessed letters will be represented as underscores.  Also, the guesses remaining and bad guesses made will be updated.  If the player wins or loses, the wins and losses tallies will be displayed along with the fully revealed word before a new word is chosen and a new round starts. 

### App GIFs
A single GIF is provided in the repository to illustrate the mechanics of the game.  The following is a link to the GIF:
<https://github.com/nmikstas/node-word-guess/blob/master/gifs/node_word_guess.gif>


### App Source Link
The application source code can be found at the following link: <https://github.com/nmikstas/node-word-guess>

### Technologies Used
The following packages were used in this assignment:
1. `fs`
2. `color`
3. `inquirer`

`fs` is used to acces the text file that contains the words to choose from.  `color` is being used to add color to the terminal window to make the game more visually appealing.  Finally, `inquirer` is being used to get the player's guess from the console.

### My Development Role
As this is an individual homework assignment, I was solely responsible for its design and implementation.

