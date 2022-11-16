const fs = require('fs')
// const book = {
//     title:'My book',
//     author: 'Mohit'
// }
// const bookJson = JSON.stringify(book);
// fs.writeFileSync('book.json', bookJson);

const bookJson = fs.readFileSync('book.json');
const bookObj = JSON.parse(bookJson);
console.log(bookObj);
