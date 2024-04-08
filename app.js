// Put your name and ID here 

const express = require("express");
const path = require("path");
// Include fs module
const fs = require('fs');
const fsPromises = require('fs').promises;

const app = express();

app.use(express.static(
  path.resolve(__dirname, "public")
));

let words = [];

// read in a text file
async function readFile() {
  try {
    const data = await fsPromises.readFile('textfile.txt', 'utf8');
    words = data.split(' ').map(word => word.trim());
    console.log('Words loaded successfully.');
  } catch (err) {
    console.error('Error reading file:', err);
  }
}

readFile();


// router to return a word to client
app.get('/random', (req, res) => {
  const randIndex = Math.floor(Math.random() * words.length);
  const randWord = words[randIndex];
  
  //sends raondom word to client
  res.send(randWord);
});

app.listen(3000, () => console.log("Starting up Crazy Words"));


