const _ = require('lodash');
const fs = require('fs');
const yargs = require('yargs');

const notes = require('./notes.js');

// get the command
const commandOptions = {
  title: {
    describe: 'Title of note',
    demand: true,
    alias: 't'
  },
  body: {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
  }
};
const argv = yargs
  .command('add', 'Add a new note', {
    title: commandOptions.title,
    body: commandOptions.body
  })
  .command('list', 'List all  note')
  .command('read', 'Read a note', {
    title: commandOptions.title
  })
  .command('remove', 'Remove a note', {
    title: commandOptions.title
  })
  .help().argv;
const command = argv._[0];
const { title, body } = argv;

// switch over the command
let note = {};
switch (command) {
  case 'add':
    note = notes.add(title, body);

    if (!note) {
      console.log('Note title taken');
    } else {
      console.log('Note addded!');
      notes.logNote(note);
    }

    break;
  case 'list':
    let allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach(note => notes.logNote(note));
    break;
  case 'read':
    note = notes.get(title);

    if (note) {
      console.log('Note Found!');
      notes.logNote(note);
    } else {
      console.log('Note not found');
    }

    break;
  case 'remove':
    let noteRemoved = notes.remove(title);
    let message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
    break;
  default:
    console.log('Command not recognized');
    break;
}
