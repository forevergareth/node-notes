const fs = require('fs');

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('./storage/notes-storage.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('./storage/notes-storage.json', JSON.stringify(notes));
}

var addNote = (title, body) => {
  var notes = fetchNotes();
  var note = {
    title,
    body
  };
  var duplicateNotes = notes.filter((notes) => notes.title === title);

  if (duplicateNotes.length === 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
  
};

var getAll = () => {
  return fetchNotes();
};

var read = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((notes) => notes.title === title);
  return filteredNotes[0];
};

var remove = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((notes) => notes.title !== title);
  saveNotes(filteredNotes);
  return notes.length !== filteredNotes.length;
};

var logNote = (note) => {
  console.log('----');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
}
module.exports = {
  addNote,
  getAll,
  read,
  remove,
  logNote
};