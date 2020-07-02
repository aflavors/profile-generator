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
    ]).then(function(res){
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

function createHTML(){
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }

    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
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
        if(response.type === "Intern"){
            addIntern();
        }
        if(response.type === "Exit"){
            createHTML();
        }
    })
}

createTeam();

