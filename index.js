const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
//const generateMarkdown = require("./utils/generateMarkdown");
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
        let generateMarkdown = `
          # ${answers.username}
          # ${res.data.avatar_url}
          `;
        fs.writeFile("README.md", generateMarkdown, function(err) {
            if (err) {
                throw err;
            }
          });
        });
    });


function init() {

}

init();