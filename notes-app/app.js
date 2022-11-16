const yargs = require('yargs');
const notes = require('./notes.js');

yargs.version('1.1.1')

//add,remove,read,list
//add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note Title.',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body.',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
});

//remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note Title.',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
});

//list command
yargs.command({
    command: 'list',
    describe: 'List a note',
    handler() {
        notes.listNote();
    }
});

//read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'Note Title.',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
});

yargs.parse();
// console.log(yargs.argv);

// console.log(process.argv);

// const command = process.argv[2];

// if(command === 'add') {
//     console.log('Adding Notes');
// } else if(command === 'remove') {
//     console.log('Removing Notes');
// }

// const validator = require('validator');
// const chalk = require('chalk');
// const getNotes = require('./notes.js');

// const msg = getNotes();
// console.log(process.argv[2],msg);
// console.log(validator.isEmail('mohit@gmail.in'));
// console.log(validator.isURL('http://localhost:4200'));
// console.log(chalk.bgBlue('Success!'));