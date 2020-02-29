const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");
//const generateMarkdown = require("./utils/generateMarkdown");
const newFile = [];
const questions = [
    {
        type: "input",
        message: "Enter your GitHub username:",
        name: "username"
    },
    {
        type: "input",
        message: "What is your project called?",
        name: "title"
    },
    {
        type: "input",
        message: "Describe your project:",
        name: "description"
    },
    {
        type: "input",
        message: "List any programs/libraries the user might need to install to use your app:",
        name: "installation"
    },
    {
        type: "input",
        message: "Is there anything the user should know before they try your app?",
        name: "usage"
    },
    {
        type: "input",
        message: "List any licenses used by your project:",
        name: "license"
    },
];

    
inquirer.prompt(questions)
.then(function(answers) {
    const queryUrl = `https://api.github.com/users/${answers.username}`;
    const badge = "https://img.shields.io/static/v1?label=Created-By&message=Javascript&color=blue"
    
    axios.get(queryUrl)
    .then(function(res) {
        let generateMarkdown = `
            # ${answers.title}
            # Description:
            ${answers.description}
            # Table of Contents:
            1. [Installation](link)
            1. [Usage](link)
            1. [License](link)
            1. [Contributing](link)
            1. [Tests](link)
            # Installation
            ${answers.installation}
            # Usage
            ${answers.usage}
            # License
            ${answers.license}
            # Contributing:
            * ${answers.username}
            # Tests
            This project has beenrigorously tested for performance and quality!
            [badge](${badge})
            # Questions: 
            1. ![Github profile picture](${res.data.avatar_url})
            1. ${res.data.email}
            `;
        fs.writeFile("README.md", generateMarkdown, function(err) {
            if (err) {
                throw err;
            }
          });
        });
    });