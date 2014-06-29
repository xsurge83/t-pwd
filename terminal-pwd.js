#!/usr/bin/env node
/*
 t-pwd key
 */
var program = require('commander');
var promptly = require('promptly');
var chalk = require('chalk');

var TextRepo = require('./repo/textRepo')

program
  .version('0.0.1')
  .usage('[options] <keywords>')
  .option('-o, --owner [name]', 'Filter by the repositories owner')
  .option('-l, --language [language]', 'Filter by the repositories language')
  .option('-f, --full', 'Full output without any styling')
  .parse(process.argv);

if(!program.args.length) {
  program.help();
} else {
  var result,
    key = program.args[0],
    textRepo = new TextRepo('./data/storage.txt');

  result = textRepo.queryByKey(key);
  if(result!==TextRepo.NOT_FOUND){
    console.log(chalk.green.bold(result));
    process.stdin.on('data', function(text){
      process.stdout.write('\u001B[2J\u001B[0;0f');
      console.log(chalk.green.bold('done!'));
      process.exit(1);
    });
  } else {
    console.log(chalk.red.bold(result));
  }
}