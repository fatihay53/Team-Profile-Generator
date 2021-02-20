const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const util = require('util')
const writeFileAsync = util.promisify(fs.writeFile);

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = []

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const githubCheck = async function (input){
    if (input === ''){
        return 'Please enter a valid Github!'
    }
    return true;
}

const numeric = async function (input){
    var numbers = /^[0-9]+$/;
    if (input.match(numbers) && input !== '') {
    return true}
    else{
        return 'Please enter a Number!'
    }
}

const letters = async function (input){
    var letter = /^[A-Za-z]+$/;
    if (input.match(letter) && input !=='' ){
    return true}
    else{ return'Please enter letter!'}
}
const email = async function (input){
    if (input.includes("@") && input.includes(".") && input !=='' && !input.includes(' ') ){
        return true
    } 
    else{
        return 'Please enter a valid email! Includes "@" '
    }
}



   

function addMember() {
    inquirer.prompt(
        [
            {
                type: 'confirm',
                message: 'Do you want add another team Member?',
                name: 'anotherMember',
              
            },
        ]
    ).then(val => {
        if (val.anotherMember) {
            aboutTeamMember()
        }
        else {
            finish()
        }

    })
}

async function finish() {
    console.log('\n creating Your HTML File ...')

    const rendering = await render(employees)
    await writeFileAsync(outputPath, rendering);
    console.log('file was created!')
}


function aboutTeamMember() {
    inquirer.prompt(
        [
            {
                type: 'list',
                message: 'Please choose type of employee!',
                choices: [
                    'Engineer',
                    'Intern',
                ],
                name: 'choice'
            },

        ]
    ).then(val => {
        if (val.choice === "Engineer") {
            engineerDetail()
        }
        else {
            internDetail()
        }
    })
}

function managerDetail() {
    inquirer.prompt(
        [
            {
                type: 'input',
                message: "What is the Manager's name?",
                name: 'name',
                validate: letters

            },
            {
                type: 'input',
                message: "What is manager's ID?",
                name: 'id',
                validate: numeric,
            },
            {
                type: 'input',
                message: "What is manager's email?",
                name: 'email',
                validate: email,
                
                
            },
            {
                type: 'input',
                message: "What is the Manager's office number?",
                name: 'officeNumber',
                validate: numeric,
            }
        ]
    )
        .then(val => {
            const manager = new Manager(val.name, val.id, val.email, val.officeNumber)
            employees.push(manager)
            addMember()
        }
        )
}



function engineerDetail() {
    inquirer.prompt(
        [
            {
                type: 'input',
                message: "What is the Engineer's  name?",
                name: 'name',
                validate: letters
            },
            {
                type: 'input',
                message: "What is Engineer's  ID?",
                name: 'id',
                validate: numeric
            },
            {
                type: 'input',
                message: "What is Engineer's  email?",
                name: 'email',
                validate: email,
            },
            {
                type: 'input',
                message: "What is the Engineer's GitHub username?",
                name: 'github',
                validate: githubCheck
            }
        ]
    )
        .then(val => {
            const engineer = new Engineer(val.name, val.id, val.email, val.github)
            employees.push(engineer)
            addMember()
        }
        )
}

function internDetail() {
    return inquirer.prompt(
        [
            {
                type: 'input',
                message: "What is the Intern's  name?",
                name: 'name',
                validate: letters
            },
            {
                type: 'input',
                message: "What is Intern's  ID?",
                name: 'id',
                validate: numeric
            },
            {
                type: 'input',
                message: "What is Intern's  email?",
                name: 'email',
                validate: email,
            },
            {
                type: 'input',
                message: "What is the Intern's School name?",
                name: 'schoolName',
                validate: letters
            }
        ]
    )
        .then(val => {
            const intern = new Intern(val.name, val.id, val.email, val.schoolName)
            employees.push(intern)
            addMember()
        }
        )
}

async function init() {
    try {
        await managerDetail()


    } catch (err) {
        console.log(err);
    }
}
init();




// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
