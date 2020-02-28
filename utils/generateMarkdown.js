const api = require("./api.js");

function generateMarkdown(data) {
    return `
  # ${data.title}
  
  `;
  }
  
  module.exports = generateMarkdown;
  