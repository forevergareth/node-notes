const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

//Notes module
const notes = require('./notes');

//Yargs Command Setup
const argv = yargs
  .command('add', 'Add a new note', {
    title: {
      describe: 'Title of note',
      demand: true,
      alias: 't'
    },
    body: {
      describe: 'Body of your note',
      demand: true,
      alias: 'b'
    }
  })
  .command('read', 'Read a note', {
    title: {
      describe: 'Title of note',
      demand: true,
      alias: 't'
    }
  })
  .command('list', 'List all saved notes')
  .command('remove', 'Remove a stored note', {
    title: {
      describe: 'Title of note',
      demand: true,
      alias: 't'
    }
  })
  .help()
  .argv; 
var command = argv._[0];
//console.log('Command: ', command);
//console.log('Yargs: ', argv);

//User input filtering
if (command === 'add') {
  var note = notes.addNote(argv.title, argv.body);
  if (note) {
    console.log('Note Created');
    notes.logNote(note);
  } else {
    console.log('Title already taken!')
  }
} else if (command === 'list'){ 
  var allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s)`);
  allNotes.forEach((note) => notes.logNote(note));
} else if (command === 'remove'){ 
  var noteRemoved = notes.remove(argv.title);
  var message = noteRemoved ? 'Note Removed' : ' Note not Found';
  console.log(message);
} else if (command === 'read') {
  var note = notes.read(argv.title);
  if (note) {
    console.log('Note Found!');
    notes.logNote(note);
  } else {
    console.log('Title Not Found!')
  }
} else {
  console.log('command not recognized');
}