const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
const questions = [
    {
        type: "input",
        message: "Enter your GitHub username:",
        name: "username"
    },

];

inquirer.prompt(questions)
  .then(function(answers) {
    const queryUrl = `https://api.github.com/users/${answers.username}`;

    axios.get(queryUrl)
        .then(function(res) {
        console.log(res);
      });
    });


function writeToFile(fileName, data) {
}

fs.writeFile("README.md", writeToFile, function(err) {
    if (err) {
      throw err;
    }
});

function init() {

}

init();