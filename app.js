const inquirer = require('inquirer');
// console.log(inquirer);
// const fs = require('fs');
const generateSite = require('./utils/generate-site.js');
const generatePage = require('./src/page-template.js');
const { writeFile, copyFile } = require('./utils/generate-site');


// const pageHTML = generatePage(mockData);

// fs.writeFile('./index.html', generatePage(name, github) , err => {
//   if (err) throw new Error(err);

//   console.log('Portfolio complete! Check out index.html to see the output!');
// });
const promptUser = () => {
    return inquirer.prompt ([
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
            message: 'Enter your github Username',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please Enter your github Username!')
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAbout',
            message: 'Would you like to enter some information about yourself for an "About" section?',
            default: true
        },
        {
            type: 'input',
            name: 'about',
            message: 'Provide some information about yourself:',
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
            
    ]);
};

// promptUser().then(answer => console.log(answer));

const promptProject = portfolioData => {
console.log(`
=================
Add a new Project
=================
`);

    // If there's no 'projects' array property, create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
    }

    return inquirer.prompt([
        {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project?',
        validate: nameInput => {
            if (nameInput){
            return true;
            } else {
                console.log('Please enter project name!')
                return false;   
            } 
        }
        },
        {
            type: 'input',
            name: "description",
            message: 'Provide a description of the project (Required)',
            validate: descriptionInput => {
                if (descriptionInput) {
                    return true;
                } else {
                    console.log('Please provide a description!');
                    return false;
                }
            }
        },
        {
            type: 'checkbox',
            name: 'languages',
            message: 'What did you build this project with? (Check all that apply)',
            choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'JQuery', 'Bootstrap', 'Node']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log('Please enter your Git link!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'feature',
            message: 'Would you like to feature this project?',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddProject',
            message: 'Would you like to enter another project?',
            default: false
        }
        
    ])
        .then(projectData => {
            portfolioData.projects.push(projectData);
            if (projectData.confirmAddProject) {
            return promptProject(portfolioData);
            } else {
            return portfolioData;
            }
        });


};


promptUser()
    .then(promptProject)
    .then(portfolioData => {
        return generatePage(portfolioData);
    })
    .then(pageHTML => {
        return writeFile(pageHTML);
    })
    .then(writeFileResponse => {
        console.log(writeFileResponse);
        return copyFile();
    })
    .then(copyFileResponse => {
        console.log(copyFileResponse);
    })
    .catch(err => {
        console.log(err);
    });

//     fs.writeFile('./dist/index.html', pageHTML, err => {
//         if (err) throw new Error(err);

//         console.log('Portfolio complete! Check out index.html to see the output!');
//     });

//     fs.copyFile('./src/style.css', './dist/style.css', err => {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log('Style sheet copied successfully!');
//     });
// ;



// const profileDataArgs = process.argv.slice(2);

// const [name, github] = profileDataArgs;

// console.log(profileDataArgs);
// const printProfileData = profileDataArr => {
//     for (let i = 0; i < profileDataArr.length; i += 1) {
//         console.log(profileDataArr[i]);
//     }

//     console.log('================')
//     // this method is better for arrays
//     profileDataArr.forEach(profileItem => console.log(profileItem))
// };

// printProfileData(profileDataArgs);