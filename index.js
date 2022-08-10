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

            installation();
        })
}

function installation() {
    inquirer
        .prompt([ 
            {
                type: 'confirm',
                message: 'Would you like to include a snippet of code in your installation section? ',
                name: 'possibleCode'
            },
            {
                type: 'input',
                message: 'Please first describe the process to install your program: ',
                name: 'installation'
            },
        ])
        .then((response) => {
            var display = 
`## Installation

${response.installation}

`

            if (response.possibleCode) {
                inquirer.prompt([
                    {
                        type: 'input',
                        message: 'Enter the snippit of code for installation purposes',
                        name: 'snippit'
                    },
                ])
                .then((nestedResponse) => {
                    display += ` * ${nestedResponse.snippit}\n`;
                    console.log(display);
                    fs.appendFile('README.md', display, (error) => console.log(error));
                })
            } else {
                fs.appendFile('README.md', display, (error) => console.log(error));
            }
            
            

            // usage();
        })
}