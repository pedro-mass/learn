const fs = require('fs');

let originalNote = {
  title: 'Some title',
  body: 'Some body'
};
// originalNoteString
let originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync('notes.json', originalNoteString);

let noteString = fs.readFileSync('notes.json');
// note
let note = JSON.parse(noteString);
console.log(typeof note);
console.log(note.title);
