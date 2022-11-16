const fs = require('fs')

let addNote = (title, body) => {
    const notes = loadNotes();
    const duplicate = notes.find((note) => note.title == title)
    
    if (!duplicate) {
        notes.push({
            "title": title,
            "body": body
        })
        saveNotes(notes);
        console.log('New Note Added');
    } else {
        console.log('Title alreay exits');
    }
}

let removeNote = (title) => {
    const notes = loadNotes();
    var i = null;
    notes.forEach((x, index) => {
        if (x.title === title) {
            i = index;
        }
    });
    if (i == null) {
        console.log('Note not exits');
    } else {
        notes.splice(i, 1);
        saveNotes(notes);
        console.log('Note Removed.');
    }
}

let listNote = () => {
    let notes = loadNotes();
    notes.forEach((note) => {
        console.log(note.title);
    })
}

let readNote = (title) => {
    let notes = loadNotes();
    const note = notes.find((note) => note.title === title)
    if (note) {
        console.log(note.title);
        console.log(note.body);
    } else {
        console.log('no note Found');
    }
}


let saveNotes = (arr) => {
    const JsonData = JSON.stringify(arr);
    fs.writeFileSync('notes.json', JsonData)
}

let loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = JSON.parse(dataBuffer)
        return dataJSON;
    } catch (e) {
        return [];
    }
}

module.exports = {
    'addNote': addNote,
    'removeNote': removeNote,
    'listNote': listNote,
    'readNote': readNote
};

