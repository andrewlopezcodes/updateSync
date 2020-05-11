#!/usr/bin/env node

const debounce = require('lodash.debounce');
const chokidar = require('chokidar');
const prog = require('caporal');
const fs = require('fs');



prog
  .version('0.0.1')
  .argument('[filename]', 'Name of file to execute')
  .action(async ({
    filename
  }) => {
    const name = filename || 'index.js';
    try {
      await fs.promises.access(name);
    } catch (err) {
      throw new Error(`ERROR !!!!!! Could not find the file ${name}`);
    }


    const start = debounce(() => {
      console.log('STARTING USERS PROGRAM')
    }, 100);


    chokidar.watch('.')
      .on('add', start)
      .on('change', () => start)
      .on('unlink', () => start);
  });

prog.parse(process.argv);