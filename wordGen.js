let fs = require("fs");

//Takes the file name and path of the text file containing words.
//It also takes a callback that runs when the constructor finishes.
let WordGen = function(fileName, doneCallback)
{
    this.callback = doneCallback;
    this.wordArray;
    let self = this;  //Use this to maintain the proper scope.

    this.readWords = function(error, data)
    {
        if(error) throw error;
     
        //Split phrases list into individual phrases.
        self.wordArray = data.split("\r\n");
        
        //Run the callback to let the caller know the file has been read.
        self.callback();
    }

    //Return a random word from the array.
    this.getWord = function()
    {
        let wordIndex = Math.floor(Math.random() * this.wordArray.length);
        let word = this.wordArray[wordIndex];
        return word;
    }

    //Read the text file containing all the words.
    fs.readFile(fileName, "utf8", this.readWords);
}

module.exports = WordGen;