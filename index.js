const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const pageTemplate = require("./src/page-template");
const path = require("path");
const fs = require("fs");
//set the dir for the output to be saved
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./src/page-template.js");

//declare the array to be rendered in page-template.js
const team = [];

// TODO: Write Code to gather information about the development team members, and render the HTML file.
function addNewEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please enter engineer name",
        validate: function (answer) {
          if (answer.length < 1) {
            console.log("Enter valid engineer name");
            return false;
          }
          return true;
        },
      },
      {
        type: "number",
        name: "id",
        message: "Please enter engineer employee id",
        validate: function (answer) {
          if (answer.length < 1 && typeof(answer) !== Number) {
            console.log("Employee ID expects a valid number");
            return false;
          }
          return true;
        },
      },
      {
        type: "input",
        name: "email",
        message: "Enter employee email",
        validate: function (answer) {
          if (answer.length < 1) {
            console.log("Enter a valid engineer's email");
            return false;
          }
          return true;
        },
      },
      {
        type: "input",
        name: "github",
        message: "Enter engineer GitHub username",
      },
    ])
    .then((data) => {
      const newEngineer = new Engineer(
        data.name,
        data.id,
        data.email,
        data.github
      );

      //add this employee object to the Team array
      team.push(newEngineer);
      //redirect user to main menu options
      addNewTeamMember();
    });
}

function addNewIntern() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Please enter intern's name",
        validate: function (answer) {
          if (answer.length < 1) {
            console.log("Enter a valid intern's name");
            return false;
          }
          return true;
        },
      },
      {
        type: "number",
        name: "id",
        message: "Enter intern's ID",
        validate: function (answer) {
          if (answer.length < 1 && typeof(answer) !== Number) {
            console.log("Intern ID expects a valid number");
            return false;
          }
          return true;
        },
      },
      {
        type: "input",
        name: "email",
        message: "Enter intern's email",
      },
      {
        type: "input",
        name: "school",
        message: "Enter intern's school",
        validate: function (answer) {
          if (answer.length < 1) {
            console.log("Enter valid intern's school");
            return false;
          }
          return true;
        },
      },
    ])
    .then((data) => {
      //create object for intern and initialise the constructor
      const newIntern = new Intern(data.name, data.id, data.email, data.school);
      //add the newintern to the team array
      team.push(newIntern);
      //call func with options to add more team members or finish
      addNewTeamMember();
    });
}

//2. prompt user to choose from options to add new member to the team Employee/intern/finish building team
function addNewTeamMember() {
  inquirer
    .prompt({
      type: "list",
      name: "employeeType",
      message: "Select employee type to add",
      choices: ["Engineer", "Intern", "Finish building the team"],
    })
    .then(({ employeeType }) => {
      if (employeeType === "Engineer") {
        //call function to add new employee info
        addNewEmployee();
      } else if (employeeType === "Intern") {
        //call function to add new intern info
        addNewIntern();
      } else if (employeeType === "Finish building the team") {
        /**when finished adding, a html page is generated in the output path initialised in the page. 
         the array var team is passed as param to the page-template.js file imported in this page**/
        fs.writeFileSync(outputPath, render(team));
      }
    });
}

//1. function to add Manager info such as name, employee id , email and office number
function addTeamManager() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "Enter your team manager's name",
        validate: function (answer) {
          if (answer.length < 1) {
            return console.log("Enter a valid manager name.");
          }
          return true;
        },
      },
      {
        type: "number",
        name: "id",
        message: "Enter manager employee ID",
        validate : function(answer){
          if(answer.length < 1 && typeof(answer) !== Number)
          {
            console.log("Manager ID expects a valid number");
            return false;
          }
          return true;
        }
      },
      {
        type: "input",
        name: "email",
        message: "Enter manager email address",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "Enter manager office number",
        validate: function (answer) {
          if (answer.length < 1) {
            return console.log("Enter manager office number.");
          }
          return true;
        },
      },
    ])
    .then((data) => {
      const newManager = new Manager(
        data.name,
        data.id,
        data.email,
        data.officeNumber
      );
      team.push(newManager);
      chooseEmployee();
    });
}

//call this function to add the manager details first when the application is executed
addTeamManager();
