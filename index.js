const inquirer = require("inquirer");
const axios = require("axios");
const fs = require("fs");

//initializing the prompt questions
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

//creating the inquirer prompt
inquirer.prompt(questions)
.then(function(answers) {
    const queryUrl = `https://api.github.com/users/${answers.username}`;
    const badge = "https://img.shields.io/static/v1?label=Created-By&message=Javascript&color=blue"
    
    //making the API call
    axios.get(queryUrl)
    .then(function(res) {

       //Creating the template for the generated markdown file and inserting user answers 
        let generateMarkdown = 
`![badge](${badge})
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

# Questions: 
* ![Github profile picture](${res.data.avatar_url})
* ${res.data.email}`;

        //Creating the new markdown file in the directory
        fs.writeFile("README.md", generateMarkdown, function(err) {
            if (err) {
                throw err;
            }
          });
        });
    });