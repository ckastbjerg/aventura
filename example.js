const chatbot = require('./index');

const questions = [
  {
    message: 'Hello, what is the capital of Denmark?',
    answer: 'Copenhagen',
    responses: ['Nope, try again...', 'You could just Google it...']
  },
  {
    message: 'What is 2 + 2?',
    answer: a => parseInt(a, 10) === 4,
    responses: ['Try again...', 'Jeez...how hard can it be?']
  }
];

chatbot(questions);
