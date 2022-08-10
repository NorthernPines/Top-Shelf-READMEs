const fs = require('fs');
const inquirer = require('inquirer');

projectBasics();

function projectBasics() {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'Title of the Project: ',
                name:'title',
            },
            {
                type: 'input',
                message: 'Description of your project: ',
                name:'description',
            },
        ])
        .then((response) => {
            const display = 
`# ${response.title}

## Description

${response.description}

`

            fs.writeFile('README.md', display, (error) =>
            error ? console.log(error) : console.log());
            tableOfContent();
        })
}

function tableOfContent() {
    inquirer
        .prompt([ 
            {
                type: 'checkbox',
                message: 'Which sections would you like to include in your README?',
                name: 'sections',
                choices: ['Installation', 'Usage', 'Features', 'License', 'Visuals', 'Credits', 'Tests', 'Questions']
            },
        ])
        .then((response) => {
            let display = 
`## Table of Contents


`

            response.sections.forEach(displayToC)

            function displayToC(section) {
                display += `[${section}](#${section})\n\n`;
            }
            
            fs.appendFile('README.md', display, (error) => console.log(error));
        })
}