'use strict';
const inquirer = require('inquirer');

let numWrongAnswers = 0;
let numTotalWrongAnswers = 0;
let startTime;

const getRandomFromArray = genericResponses =>
  genericResponses[Math.floor(Math.random() * genericResponses.length)];

const genericResponses = [
  'Nope...have you considered asking Google for help?',
  "Wrong...I don't know how to help you anymore",
  "I don't think so...try harder",
  "Correct!...oh no, it's actually wrong",
  "No! that's not it",
  'Unfortunately not :/ any other ideas?',
  'Close!...but no cigar',
  "I think you're on to something...or not...who knows!?!",
  'NOT!...you could just give up...'
];

function getQuestion({ message, answer, responses, index }) {
  responses = responses || [];
  return {
    type: 'input',
    name: `question-${index}`,
    message: message,
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
      responses = responses || [];
      if (value) {
        numWrongAnswers++;
      }

      numTotalWrongAnswers++;
      return response || getRandomFromArray(genericResponses);
    }
  };
}

module.exports = steps => {
  const startTime = Date.now();
  const questions = steps.map((step, index) => getQuestion(step, index));

  console.log('----------------------------------------------------------');
  console.log('');
  console.log('GET READY!!!');
  console.log('');
  console.log('These are the rules');
  console.log(
    '  - The faster you complete the adventure, the higher your score will be.'
  );
  console.log(
    '  - Every time you answer a question incorrectly, it will cost you 10 seconds!'
  );
  console.log('');
  console.log('----------------------------------------------------------');

  questions.unshift(
    getQuestion({
      message: 'Type "I suck" to begin',
      answer: 'I suck',
      index: -1
    })
  );

  inquirer.prompt(questions).then(answers => {
    const timePenalty = numTotalWrongAnswers * 10;
    const endTime = Date.now();
    var timeDiff = (Math.abs(endTime - startTime) / 1000).toFixed(2);
    console.log('----------------------------------------------------------');
    console.log('Great Success!');
    console.log(`You completed the game ${timeDiff} seconds`);
    console.log(`You had ${numTotalWrongAnswers} wrong answer`);
    console.log(`That's a penalty of ${timePenalty} seconds`);
    console.log(
      `Leaving you with a total time of ${timeDiff + timePenalty} seconds`
    );
    console.log('----------------------------------------------------------');
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
    `);
  });
};
