const fs = require("fs");
const inquirer = require("inquirer");
const generateMD = require("./utils");
const templateMD = fs.readFileSync(__dirname + "/template.md", "utf-8");

// array of questions for user
const questions = [
    {
        type: 'input',
        name: 'name',
        message: 'Please provide a project name.  (Required)',
        validate: nameInput => {
            if (nameInput) {
                return true;
            } else {
                console.log('Please provide a project name!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'username',
        message: 'Please enter your GitHub username. (Required)',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please enter your GitHub username!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'repo',
        message: 'Please enter the name of your repo. (Required)',
        validate: repoInput => {
            if (repoInput) {
                return true;
            } else {
                console.log('Please enter the name of your repo!')
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a description of your project. (Required)',
        validate: descInput => {
            if (descInput) {
                return true;
            } else {
                console.log('Please enter a description!');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Please provide information for using your project. (Required)',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('Please provide information for using your project!');
                return false;
            }
        }
    },
    {
        type: 'list',
        name: 'license',
        message: 'Please provide license information.',
        choices: ['MIT', 'GNU', 'Apache 2.0', 'ISC'],
        validate: licenseInput => {
            console.log(licenseInput);
            if (licenseInput) {
                return true;
            } else {
                console.log('Please provide license information!');
                return false;
            }
        },
    }, 
    {
        type: 'checkbox',
        name: 'tech',
        message: 'Please select the technologies that your project was built with.',
        choices: ['HTML', 'CSS', 'SASS', 'TypeScript', 'Java', 'Python', 'GO-Lang', 'JavaScript', 'Node.js', 'Express.js'],
        validate: techInput => {
            if (techInput) {
                return true;
            } else {
                console.log('Please provide technologies of your project');
                return false;
            }
        },
    },
];

inquirer.prompt(questions)
    .then(async (response) => {
        const generatedMD = await generateMD(templateMD, response);
        await writeFile("./dist/README.md", generatedMD);
        process.exit(1);
    });
   
function writeFile(path, data) {
    console.log("Successfully created README.md as", path);
    return fs.writeFileSync(path, data);
}