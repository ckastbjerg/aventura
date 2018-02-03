'use strict';
const inquirer = require('inquirer');
let numWrongAnswers = 0;
let startTime;

module.exports = steps => {
  const startTime = Date.now();
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
    const endTime = Date.now();
    var timeDiff = (Math.abs(endTime- startTime) / 1000).toFixed(2);
    console.log(`Success! You completed the game ${timeDiff} seconds`);
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
