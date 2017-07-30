const fs = require('fs');

const fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

const saveNotes = notes => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

const add = (title, body) => {
  let notes = fetchNotes();
  let note = {
    title,
    body
  };

  // check for dupe
  var duplicateNotes = notes.filter(note => note.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);

    return note;
  }
};

const getAll = () => {
  return fetchNotes();
};

const get = title => {
  let notes = fetchNotes();

  return notes.filter(note => note.title === title)[0];
};

const remove = title => {
  let notes = fetchNotes();

  // remove note
  let filteredNotes = notes.filter(note => note.title !== title);

  saveNotes(filteredNotes);

  return notes.length !== filteredNotes.length;
};

const logNote = note => {
  console.log('--');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  add,
  get,
  getAll,
  remove,
  logNote
};
