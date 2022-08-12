const fs = require('fs');
const inquirer = require('inquirer');
const { features } = require('process');

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

            var sectionsIncluded = response.sections;
            console.log(sectionsIncluded);
            installation(sectionsIncluded);
        })
}

function installation(sectionsIncluded) {
    if (sectionsIncluded.includes('Installation')) {
        inquirer
            .prompt([ 
                {
                    type: 'input',
                    message: 'Please describe the process to install your program: ',
                    name: 'installation'
                },
            ])
            .then((response) => {
                var display = 
`## Installation

${response.installation}

`
                fs.appendFile('README.md', display, (error) => console.log(error));
                // usage(sectionsIncluded);     
            })
    }
}

function usage(sectionsIncluded) {
    if (sectionsIncluded.includes('Usage')) {
        var display = `## Usage\n`;
        do {
            inquirer
                .prompt([
                    {
                        type: 'input',
                        message: 'Please enter bullet point: ',
                        name: 'bullet'
                    },
                    {
                        type: 'confirm',
                        message: 'Do you want to enter another point?',
                        name: 'again',
                        default: true
                    },
                ])
                .then((response) => {
                    display += `* ${response.bullet}`
                    console.log(response.again); 
                })

        } while (response.again)

        fs.appendFile('README.md', display, (error) => console.log(error));

        // features(sectionsIncluded);
    } else {
        // features(sectionsIncluded);
    }
}