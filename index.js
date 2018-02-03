'use strict';
const inquirer = require('inquirer');
let numWrongAnswers = 0;

module.exports = steps => {
  const questions = steps.map(({ message, answer, responses }, index) => {
    return {
      type: 'input',
      name: `question-${index}`,
      message,
      validate: function(value) {
        const isCorrect =
          typeof answer === 'function'
            ? !!answer(value)
            : value.toLowerCase() === answer.toLowerCase();

        if (isCorrect) {
          numWrongAnswers = 0;
          return true;
        }

        const response = responses[numWrongAnswers];
        numWrongAnswers++;
        return response || `¯\_(ツ)_/¯`;
      }
    };
  });

  inquirer.prompt(questions).then(answers => {
    console.log('Success!');
    console.log('');
    console.log(`
    ▄████  ▄▄▄       ███▄ ▄███▓▓█████     ▒█████   ██▒   █▓▓█████  ██▀███  
    ██▒ ▀█▒▒████▄    ▓██▒▀█▀ ██▒▓█   ▀    ▒██▒  ██▒▓██░   █▒▓█   ▀ ▓██ ▒ ██▒
   ▒██░▄▄▄░▒██  ▀█▄  ▓██    ▓██░▒███      ▒██░  ██▒ ▓██  █▒░▒███   ▓██ ░▄█ ▒
   ░▓█  ██▓░██▄▄▄▄██ ▒██    ▒██ ▒▓█  ▄    ▒██   ██░  ▒██ █░░▒▓█  ▄ ▒██▀▀█▄  
   ░▒▓███▀▒ ▓█   ▓██▒▒██▒   ░██▒░▒████▒   ░ ████▓▒░   ▒▀█░  ░▒████▒░██▓ ▒██▒
    ░▒   ▒  ▒▒   ▓▒█░░ ▒░   ░  ░░░ ▒░ ░   ░ ▒░▒░▒░    ░ ▐░  ░░ ▒░ ░░ ▒▓ ░▒▓░
     ░   ░   ▒   ▒▒ ░░  ░      ░ ░ ░  ░     ░ ▒ ▒░    ░ ░░   ░ ░  ░  ░▒ ░ ▒░
   ░ ░   ░   ░   ▒   ░      ░      ░      ░ ░ ░ ▒       ░░     ░     ░░   ░ 
         ░       ░  ░       ░      ░  ░       ░ ░        ░     ░  ░   ░     
                                                        ░                   
    `)
  });
};
