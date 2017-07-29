console.log('starting app');

const fs = require('fs');
const os = require('os');
const notes = require('./notes.js');

console.log(notes.add(1, 3));

// const { username } = os.userInfo();
//
// fs.appendFileSync('greetings.txt', `Hello ${username}!\n`);
