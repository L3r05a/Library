//Library Array
const myLibrary = [];

//Book Constructor
function Book (title, author, year, pages) {

    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.id = self.crypto.randomUUID()
    
    addBookToLibrary(this);

}

//Adds book to Library
function addBookToLibrary(instance){

//Structures the insta book so the title is the Key and values the rest.
// let newBook = {[instance.title]:[[instance.author],[instance.year], [instance.pages], [instance.id]]};
   
myLibrary.push(instance);

};



const hobbit = new Book ('The Hobbit', 'J.R.R. Tolkien',1937, 295);
const neuromancer = new Book ('Neuromancer', 'William Gibson',1984, 330)
