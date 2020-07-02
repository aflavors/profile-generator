const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
var teamMembers = [];
//uuid package for generating random number

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
function addManager(){
    inquirer.prompt([
    {
        type: "input",
        message: "What is your manager's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your manager's id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is your manager's email address?",
        name: "email"
    },
    {
        type: "input",
        message: "What is your manager's office number?",
        name: "officeNum"
    }
    /*,
    {
        type: "input",
        message: "What is your employee's [engineer only] GitHub username?",
        name: "name"
    },
    {
        type: "input",
        message: "What is your employee's [intern only] school?",
        name: "name"
    }*/]).then(function(res){
        const manager = new Manager (res.name, res.id,res.email,res.officeNum);
        teamMembers.push(manager);
        createTeam();
    })
}

function addEngineer() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the engineer's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the engineer's id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the engineer's email address?",
            name: "email"
        },
        {
            type: "input",
            message: "What is the engineer's GitHub username?",
            name: "github"
        }
    ]).then(function(res){
        const engineer = new Engineer (res.name, res.id,res.email,res.github);
        teamMembers.push(engineer);
        createTeam();
    })
}

function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is the intern's name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is the intern's id?",
            name: "id"
        },
        {
            type: "input",
            message: "What is the intern's email address?",
            name: "email"
        },
        {
            type: "input",
            message: "What school does the intern attend?",
            name: "school"
        }
    ]).then(function(res){
        const intern = new Intern (res.name, res.id,res.email,res.school);
        teamMembers.push(intern);
        createTeam();
    })
}

function createTeam(){
    
    inquirer
    .prompt([
        {
            type: "list",
            message: "Which type of team member would you like to add?",
            name: "type",
            choices: ["Manager", "Engineer", "Intern","Exit"]
        }
    ])
    .then (function(response){
        if(response.type === "Manager"){
            addManager();
        }
        if(response.type === "Engineer"){
            addEngineer();
        }
        if(respinse.type === "Intern"){
            addIntern();
        }
        //call render function and pass in an array containing all employee objects
        //render function will generate and return a block of HTML including templated divs for each employee
    })
}

createTeam();

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
