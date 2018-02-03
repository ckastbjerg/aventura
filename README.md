# Aventura

A tiny library for creating CLI adventures.

 ▄▄▄    ██▒   █▓▓█████  ███▄    █ ▄▄▄█████▓ █    ██  ██▀███   ▄▄▄      
▒████▄ ▓██░   █▒▓█   ▀  ██ ▀█   █ ▓  ██▒ ▓▒ ██  ▓██▒▓██ ▒ ██▒▒████▄    
▒██  ▀█▄▓██  █▒░▒███   ▓██  ▀█ ██▒▒ ▓██░ ▒░▓██  ▒██░▓██ ░▄█ ▒▒██  ▀█▄  
░██▄▄▄▄██▒██ █░░▒▓█  ▄ ▓██▒  ▐▌██▒░ ▓██▓ ░ ▓▓█  ░██░▒██▀▀█▄  ░██▄▄▄▄██ 
 ▓█   ▓██▒▒▀█░  ░▒████▒▒██░   ▓██░  ▒██▒ ░ ▒▒█████▓ ░██▓ ▒██▒ ▓█   ▓██▒
 ▒▒   ▓▒█░░ ▐░  ░░ ▒░ ░░ ▒░   ▒ ▒   ▒ ░░   ░▒▓▒ ▒ ▒ ░ ▒▓ ░▒▓░ ▒▒   ▓▒█░
  ▒   ▒▒ ░░ ░░   ░ ░  ░░ ░░   ░ ▒░    ░    ░░▒░ ░ ░   ░▒ ░ ▒░  ▒   ▒▒ ░
  ░   ▒     ░░     ░      ░   ░ ░   ░       ░░░ ░ ░   ░░   ░   ░   ▒   
      ░  ░   ░     ░  ░         ░             ░        ░           ░  ░
            ░                                                          

## Installation

Using Yarn

```
yarn add aventura
```

Or using NPM

```
npm install aventura
```

## Usage

Import the library.

```javascript
const aventura = require('aventura');
```

Author your adventure...

```javascript
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
```

Start the adventure!

```javascript
aventura(questions);
```

## API

* `message: [string] (required)` - The prompting message of
* `answer: [func|string] (required)` - Input from the player will be matched against this to see if he/she is allowed to move on to the next question
* `responses [array] (optional)` - Any number of clues for the current question. If not supplied, Aventura will provide generic responses.