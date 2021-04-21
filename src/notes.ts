import * as chalk from 'chalk';
import {existsSync} from 'fs';
import {mkdirSync} from 'fs';
import {writeFile} from 'fs';
import {readdirSync} from 'fs';
import {readFileSync} from 'fs';
import {rmSync} from 'fs';
import {color} from './helpers';

export class Notes {
  private static NotesInstance: Notes;

  constructor() {}

  public static getUserNotesInstance(): Notes {
    if (!Notes.NotesInstance) {
      Notes.NotesInstance = new Notes();
    }
    return Notes.NotesInstance;
  }

  public listNotes(user: string) {
    const dir = this.getRoute(user);
    let list = "Your notes\n";
    readdirSync(dir).forEach((file) => {
      const fileData = readFileSync(dir + file);
      const dataToJson = JSON.parse(fileData.toString());
      switch (dataToJson.color) {
        case color.blue:
          list += chalk.blue(dataToJson.title + "\n");
          break;
        case color.red:
          list += chalk.red(dataToJson.title + "\n");
          break;
        case color.yellow:
          list += chalk.yellow(dataToJson.title + "\n");
          break;
        case color.green:
          list += chalk.green(dataToJson.title + "\n");
          break;
        default:
          list += dataToJson.title + "\n";
          break;
      }
    });
    console.log(list);
    return list;
  }


  public addNote(user: string, title: string, body: string, color: string) {
    const data =
      `{ "title": "${title}", "body": "${body}", "color": "${color}" }`;
    const dir = this.getRoute(user);
    const fileRoute = dir + `${title}`;
    if (existsSync(fileRoute)) {
      process.stderr.write(chalk.red("Note title taken!\n"));
      process.exit(-1);
    }
    writeFile(fileRoute, data, () => {
      console.log("New note added!");
    });
    return "New note added!";
    // fs.readdirSync(dir).forEach((file) => {
    //   const fileData = fs.readFileSync(dir + file);
    //   const dataToJson = JSON.parse(fileData.toString());
    //   if (dataToJson.title === title) {
    //     process.stderr.write("Error! There is a note with that title.\n");
    //     process.exit(-1);
    //   }
    // });
    // const fileRoute = dir + `${title}`;
    // writeFile(fileRoute, data, () => {
    //   console.log("New note added!");
    // });
  }
  public modifyNote(user: string, title: string, body: string, color: string) {
    const data =
      `{ "title": "${title}", "body": "${body}", "color": "${color}" }`;
    const dir = this.getRoute(user);
    const fileRoute = dir + `${title}`;
    if (!existsSync(fileRoute)) {
      process.stderr.write(chalk.red("Can't modify unexisting note!\n"));
      process.exit(-1);
    }
    writeFile(fileRoute, data, () => {
      console.log("Note modified succesfully!");
    });
    return "Note modified succesfully!";
  }
  public deleteNote(user: string, title: string) {
    const dir = this.getRoute(user);
    const fileRoute = dir + `${title}`;
    if (!existsSync(fileRoute)) {
      process.stderr.write(chalk.red("Can't delete unexisting note!\n"));
      process.exit(-1);
    }
    rmSync(fileRoute);
    console.log("Note removed!");
    return "Note removed!";
  }
  /**
   * @description Getter method for checking if a route exists, creating it
   * if doesn't exist
   * @param user Consists of a string
   * @returns Returns a string
   */
  private getRoute(user: string) {
    const route = `./src/${user}/`;
    if (!existsSync(route)) {
      mkdirSync(route);
    }
    return route;
  }
}
