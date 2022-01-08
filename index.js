const fs = require('fs');
const inquirer = require('inquirer');
const { listenerCount } = require('process');

const promptUser = () => 
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'Enter your GitHub Username (Required)',
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
      name: 'email',
      message: 'Enter your email address (Required)',
      validate: emailInput => {
        if (emailInput) {
          return true;
        } else {
          console.log('Please enter your email address!');
          return false;
        }
      }
    },
    
    {
      type: 'input',
      name: 'title',
      message: 'What it the title of your project?',
      validate: titleInput => {
        if (titleInput) {
          return true;
        } else {
          console.log('Please enter the title of your project!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'desc',
      message: 'Enter the description of your project?',
      validate: descInput => {
        if (descInput) {
          return true;
        } else {
          console.log('Please enter the description of your project!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'repos',
      message: 'Enter the GitHub repository of your project.',
      validate: reposInput => {
        if (reposInput) {
          return true;
        } else {
          console.log('Please enter GitHub repository of your project!');
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'install',
      message: 'Enter installation instructions for your project.'
    },
    {
      type: 'input',
      name: 'usage',
      message: 'Provide instructions and examples for use of your project.'
    },
    {
      type: 'input',
      name: 'contribute',
      message: 'Enter how to contribute to your project.'
    },
    {
      type: 'input',
      name: 'test',
      message: 'Provide examples on how to run tests for your application, if any.'
    },
    {
      type: 'list',
      name: 'license',
      message: 'Select a license for your project,if any.',
      choices: ['MIT','Apache 2.0','GNU GPL v2', 'Other']
    }          
  ]);



function generateREADME(data) {
  var licenseCode = '';
  var licenseColor = '';
  
  console.log(data.license);

  if ((data.license) === 'MIT') { 
      licenseCode = 'MIT';
      licenseColor = 'MIT-yellow';
    }
    else if ((data.license) === 'Apache 2.0') {
      licenseCode = 'Apache-2.0';
      licenseColor = 'Apache-2.0-blue';
    }
    else if ((data.license) === 'GNU GPL v2') {
      licenseCode = 'gpl-2.0.en.html';
      licenseColor = 'GPL_v2-blue';
    }
    else {
      return;
    };   

  console.log(licenseCode, licenseColor);

  // console.log(data.name);
  // console.log(data.license);
  // console.log(data);
  

  return`
# ${data.title}
${licenseCode}
${licenseColor}

## Description
${data.desc}
The link to the deployed application is here:

[Repository for this Project](${data.repos})

Example of finished product:
![Finished Mock Up](./assets/images/testscreenshot.png)

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Tests](#tests)
* [Credits](#credits)
* [License](#license)
* [Questions](#questions)

## Installation
${data.install}

## Usage
${data.usage}

## Contributing
${data.contribute}
    
## Tests
${data.tests}
    
## Credits
${data.credit}
    
## License
${data.license}
    
## Badges

## Features

## Questions

GitHub Username:
${data.github}
Additional Questions?  Contact me at:
${data.email}

`
};

promptUser()
  .then((data) => { 
    
    fs.writeFile('./README.md', generateREADME(data), err => {
      if (err) throw new Error(err);

      console.log('Page Created!  Check out README.md in this directory.');
    });
  });
  
