/**
 * @description Interface used to parse the arguments received from the yargs
 * commands
 */
export interface note {
  user: string,
  title: string,
  body: string,
  color: string
}
/**
 * @description Object used to manage the colors that i will use with chalk
 */
export const color = {
  red: "Red",
  yellow: "Yellow",
  green: "Green",
  blue: "Blue",
};

