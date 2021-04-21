import * as yargs from 'yargs';
import {note} from './helpers';
import {Notes} from './notes';

const notesInstance = Notes.getUserNotesInstance();

yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    user: {
      describe: 'Note owner',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
    color: {
      describe: 'Note color',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string') {
      // Required logic to add a new note
      const newNote: note = {
        user: argv.user as string,
        title: argv.title as string,
        body: argv.body as string,
        color: argv.color as string,
      };

      notesInstance.addNote(
          newNote.user,
          newNote.title,
          newNote.body,
          newNote.color);
    }
  },
});
yargs.command({
  command: 'modify',
  describe: 'Modifies an existing note',
  builder: {
    user: {
      describe: 'Note owner',
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'New body',
      demandOption: false,
      type: 'string',
    },
    color: {
      describe: 'New color',
      demandOption: false,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.title === 'string') {
      // Required logic to add a new note
      const newNote: note = {
        user: argv.user as string,
        title: argv.title as string,
        body: argv.body as string,
        color: argv.color as string,
      };

      notesInstance.modifyNote(
          newNote.user,
          newNote.title,
          newNote.body,
          newNote.color);
    }
  },
});
yargs.command({
  command: 'delete',
  describe: 'Delete a note',
  builder: {
    user: {
      describe: `Note's list owner`,
      demandOption: true,
      type: 'string',
    },
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string' && typeof argv.title === 'string') {
      notesInstance.deleteNote(argv.user, argv.title);
    }
  },
});
yargs.command({
  command: 'list',
  describe: 'Lists all the user notes',
  builder: {
    user: {
      describe: `Note's list owner`,
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    if (typeof argv.user === 'string') {
      notesInstance.listNotes(argv.user);
    }
  },
});
yargs.parse();
