import arg from 'arg';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { createProject } from './main_ref';
import execa from 'execa';

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {// expected arguments
      '--git': Boolean, // arg
      '--yes': Boolean,
      '--install': Boolean,
      '--help': Boolean,
      '--path': String,
      //'--array': [String],
      // 'start': Boolean,
      '-g': '--git', // alias
      '-y': '--yes',
      '-i': '--install',
      '-h': '--help',
      '-p': '--path',
      //'-a': '--array',
    },
    {//arguments we want to use
      argv: rawArgs.slice(2), // the arguments we want to use (i.e. from the 3rd arg onward)
    }
  );
  // var tp = {... args._}
  var commands = args._.reduce((a, v) => ({ ...a, [v]: true}), {}) 
  return {// return some options in an object
    skipPrompts: args['--yes'] || false,
    git: args['--git'] || false,
    template: args._[0],
    runInstall: args['--install'] || false,
    showHelp: args['--help'] || false,
    path: args['--path'],
    commands: commands,
    // array: args['--array'],
    // rest: args,
    // tp: tp,
  };
}

// function myHandler(value, argName, previousValue) {
// 	/* `value` is always `true` */
// 	return 'na ' + (previousValue || 'batman!');
// }

async function promptForMissingOptions(options) {
  const defaultTemplate = 'javascript';
  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
    };
  }

  const questions = [];
  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Please choose which project template to use',
      choices: ['javascript', 'typescript'],
      default: defaultTemplate,
    });
  }

  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Should a git be initialized?',
      default: false,
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
  };
}

async function handleOptions(options){
  if(options.showHelp){
    // console.log('%s Project ready', chalk.green.bold('DONE'));
    console.log("Server Spinner help:\n");
    console.log("--git: some git stuff");
    console.log("--yes: some yes stuff");
    console.log("--install: some install stuff");
  }

  if(options.commands.start){
    const path = options.path;// || process.cwd(),
    const result = await execa('electron', [path], {
      cwd: process.cwd(),
    });
  }
}


export async function cli(args) {
  console.log(args);

  let options = parseArgumentsIntoOptions(args);
  console.log(options);
  // options = await promptForMissingOptions(options);
  // await createProject(options);

  await handleOptions(options);
  console.log("after handle");
  return;
}

// ...
