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
            fs.writeFile('README.md',

`# ${response.title}\n
## ${response.description}\n`,

            (error) =>
            error ? console.log(error) : console.log("Enjoy your README and use again next time!")
            );
        })
}

