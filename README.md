# What is this project?
Its basically trivia quiz for Arkinghts, test your knowledge of operators. For more in depth explanation go to "Game rules" section. For now I am doing operators, but I plan to expand it to skills and talents.
For progress status go to "./TODO.md".

# Getting Started
## Node.js
Install [Node.js](https://nodejs.org/en/download) you need it in order to run the app, if you already have it then go to the next step.

## Dependencies
Install all dependencies using ```npm install``` inside project main directory, it may take a while.

## Run app
Start dev server using ```npm run dev``` inside project main directory. After dev server is up and ready go to ```localhost:3000``` inside you browser. App is based on Next.js so first visit to the app may take time in order to pre-render all things needed.

## Game rules 
### Operator quiz
Try to guess the operator with as little guesses as possible. You will get indicator if you have right, wrong or partial thing in each column.
To make a guess write the name of operator inside input field at the top of screen, you can click operators that satisfy name writen inside input field to auto complete that operator name. After that click button with caption "Guess" to check if you got the right one.
Game ends when correct operatos was guessed, in that case whole row will be green.

### Skill quiz
Try to guess whos skill is displayed. You will get indicator if you got it wrong (red) or right (green). Searching and selecting operator works as same as in "Operator quiz".
Game ends when correct operatos was guessed, in that case row will be green.

#### Important
Game operates on one per day basis, so if you open app again during the same day then operator won't change. Game uses you local day, month and year to determine that day's operator.