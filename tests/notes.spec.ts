import {expect} from 'chai';
import 'mocha';
import {Notes} from '../src/notes';

const notesInstance = Notes.getNotesInstance();

describe('Notes class tests', () => {
  describe('Notes getter function tests', () => {
    it('Notes.getNotesInstance() should be an object', () => {
      expect(Notes.getNotesInstance()).to.be.an('object');
    });
  });
  describe('addNote function tests', () => {
    it(`notesInstance.addNote('danae',
          'Red note',
          'This is danae note and it is red',
          'Red') should equal "New note added!"`, () => {
      expect(notesInstance.addNote('danae',
          'Red note',
          'This is danae note and it is red',
          'Red')).to.equal("New note added!");
    });
    notesInstance.removeNote('danae', 'Red note')
    it(`notesInstance.addNote('not-nestor',
          'Blue note',
          'This is not-nestor note and it is blue',
          'Blue') should equal "New note added!"`, () => {
      expect(notesInstance.addNote('not-nestor',
          'Blue note',
          'This is not-nestor note and it is blue',
          'Blue')).to.equal("New note added!");
      notesInstance.removeNote('not-nestor', 'Blue note');
    });
  });
  describe('removeNote function tests', () => {
    it(`notesInstance.removeNote('danae', 'Red note') 
    should equal "Note removed!"`, () => {
      notesInstance.addNote('danae',
          'Red note',
          'This is danae note and it is red',
          'Red');
      expect(notesInstance.removeNote('danae', 'Red note'))
          .to.equal("Note removed!");
      ;
    });
    it(`notesInstance.removeNote('not-nestor', 'Blue note')
     should equal "Note removed!"`, () => {
      notesInstance.addNote('not-nestor',
          'Blue note',
          'This is not-nestor note and it is blue',
          'Blue');
      expect(notesInstance.removeNote('not-nestor', 'Blue note'))
          .to.equal("Note removed!");
    });
  });
  describe('modifyNote function tests', () => {
    it(`notesInstance.modifyNote('danae', 'Red note', 'This is a red note') 
    should equal "Note modified succesfully!"`, () => {
      notesInstance.addNote('danae',
          'Red note',
          'This is danae note and it is red',
          'Red');
      expect(notesInstance.modifyNote('danae', 'Red note',
          'This is a red note')).to.equal("Note modified succesfully!");
      notesInstance.removeNote('danae', 'Red note');
    });
    it(`notesInstance.modifyNote('not-nestor', 'Blue note')
     should equal "Note modified succesfully!"`, () => {
      notesInstance.addNote('not-nestor',
          'Blue note',
          'This is not-nestor note and it is blue',
          'Blue');
      expect(notesInstance.modifyNote('not-nestor', 'Blue note'))
          .to.equal("Note modified succesfully!");
      notesInstance.removeNote('not-nestor', 'Blue note');
    });
  });
  describe('listNotes function tests', () => {
    it(`notesInstance.listNotes('not-nestor') 
    should equal "Your notes"`, () => {
      expect(notesInstance.listNotes('not-nestor')).to.equal("Your notes");
    });
    it(`notesInstance.listNotes('nestor')
     should equal "Your notes\u001b[31m\u001b[39m\n\u001b[31mRed note\u001b[39m"`, () => {
      expect(notesInstance.listNotes('nestor'))
          .to.equal("Your notes\u001b[31m\u001b[39m\n\u001b[31mRed note\u001b[39m");
    });
  });
  describe('readNote function tests', () => {
    it(`notesInstance.readNote('not-nestor', 'Red note')
    should equal "Your notes"`, () => {
      expect(notesInstance.readNote('not-nestor', 'Red note'))
        .to.equal("\u001b[31mNote not found!\u001b[39m");
    });
    it(`notesInstance.readNote('nestor', 'Red note')
     should equal "Red note\n\u001b[31mThis is a red note\u001b[39m"`, () => {
      expect(notesInstance.readNote('nestor', 'Red note'))
          .to.equal("Red note\n\u001b[31mThis is a red note\u001b[39m");
    });
  });
});
