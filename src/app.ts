import * as yargs from 'yargs';
import * as chalk from 'chalk';
import {note} from './helpers';
import {Notes} from './notes';

/**
 * @description Notes instance, used to work with all the notes
 */
const notesInstance = Notes.getNotesInstance();

/**
 * @description Yargs command snippet for the add option. This command expects
 * the user, title, body and color of the note. Then it calls the ```addNote```
 * method from ```Notes``` class passing all the arguments.
 */
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

      const result = chalk.green(notesInstance.addNote(
          newNote.user,
          newNote.title,
          newNote.body,
          newNote.color));
      console.log(result);
    }
  },
});
/**
 * @description Yargs command snippet for the read option. This command expects
 * the user and the title of the note. Then it calls the ```readNote```
 * method from ```Notes``` class passing all the arguments.
 */
yargs.command({
  command: 'read',
  describe: 'Reads a note',
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
      const result = notesInstance.readNote(argv.user, argv.title);
      console.log(result);
    }
  },
});
/**
 * @description Yargs command snippet for the modify option.
 * This command expects the user and title of the note.
 * The body and color of the note are optional parameters.
 * Then it calls the ```modifyNote``` method from ```Notes``` class passing
 * all the arguments.
 */
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

      const result = chalk.green(notesInstance.modifyNote(
          newNote.user,
          newNote.title,
          newNote.body,
          newNote.color));
      console.log(result);
    }
  },
});
/**
 * @description Yargs command snippet for the remove option.
 * This command expects the user and title of the note.
 * Then it calls the ```removeNote``` method from ```Notes``` class passing
 * all the arguments.
 */
yargs.command({
  command: 'remove',
  describe: 'Removes a note',
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
      const result = chalk.green(notesInstance
          .removeNote(argv.user, argv.title));
      console.log(result);
    }
  },
});
/**
 * @description Yargs command snippet for the list option. This command expects
 * the user. Then it calls the ```listNotes``` method from ```Notes``` class
 * passing all the arguments.
 */
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
      console.log(notesInstance.listNotes(argv.user));
    }
  },
});

yargs.parse();
