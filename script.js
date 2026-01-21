//Library Array
const myLibrary = [];

//main container
const container = document.querySelector('.container');
const con1 = document.createElement('div');
con1.classList.add('con1');
container.appendChild(con1);

const con2 = document.createElement('div');
con2.classList.add('con2');
container.appendChild(con2);


//Addbook button
const addBook = document.querySelector('button');
addBook.textContent = ('Add Book');

//AddBook form instancing logic
addBook.addEventListener('click', () => {
    

    //form container DOM
    const formContainer = document.createElement('div');
    formContainer.classList.add('formContainer')
    con2.appendChild(formContainer);

    //form DOM
    const newBookForm = document.createElement('form');
    
    //title label+input
    const labelTitle = document.createElement('label');
    labelTitle.setAttribute('for', 'book_title');
    labelTitle.textContent= 'Book Title:';
    newBookForm.appendChild(labelTitle);

    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('id', 'book_title');
    newBookForm.appendChild(titleInput);

    //author label+input
    const labelAuthor = document.createElement('label');
    labelAuthor.setAttribute('for', 'book_author');
    labelAuthor.textContent= 'Book Author:';
    newBookForm.appendChild(labelAuthor);

    const authorInput = document.createElement('input');
    authorInput.setAttribute('type', 'text');
    authorInput.setAttribute('id', 'book_author');
    newBookForm.appendChild(authorInput);

    //pages label+input
    const labelPages = document.createElement('label');
    labelPages.setAttribute('for', 'book_pages');
    labelPages.textContent= 'Number of pages:';
    newBookForm.appendChild(labelPages);

    const pagesInput = document.createElement('input');
    pagesInput.setAttribute('type', 'number');
    pagesInput.setAttribute('id', 'book_pages');
    newBookForm.appendChild(pagesInput);

    //year label+input
    const labelYear = document.createElement('label');
    labelYear.setAttribute('for', 'book_year');
    labelYear.textContent= 'Year of publication:';
    newBookForm.appendChild(labelYear);

    const yearInput = document.createElement('input');
    yearInput.setAttribute('type', 'number');
    yearInput.setAttribute('id', 'book_year');
    newBookForm.appendChild(yearInput);

    //Read label
    const labelRead = document.createElement('label');
    labelRead.setAttribute('for', 'book_read');
    labelRead.textContent = 'Read?';
    newBookForm.appendChild(labelRead);

    //Read checkbox input
    const readInput = document.createElement('input');
    readInput.setAttribute('type', 'checkbox');
    readInput.setAttribute('id', 'book_read');
    newBookForm.appendChild(readInput);


    //Submit button DOM
    const submit = document.createElement('button');
    submit.setAttribute('type', 'submit');
    submit.textContent = 'Submit New Book';
    submit.classList.add('submit');
    newBookForm.appendChild(submit);

            //Submit button logic
            submit.addEventListener('click', (event) => {
                event.preventDefault();
                
                //UI field values
                const newTitle = document.getElementById('book_title').value;

                const newAuthor = document.getElementById('book_author').value;

                const newPages = document.getElementById('book_pages').value;

                const newYear = document.getElementById('book_year').value;


                const newRead = document.getElementById('book_read').checked;

                //call to check for duplicates
                verifyBook (newTitle, newAuthor, newPages, newYear, newRead);

                //removes form after submit
                newBookForm.remove();
                
            })
    
    formContainer.appendChild(newBookForm);
})

// //sample book
const hobbit = verifyBook ('The Hobbit', 'J.R.R. Tolkien', 950, 1933, true);

const neuromancer = verifyBook ('Neuromancer', 'William Gibson', 350, 1984, true);

//Validation

function verifyBook(title, author, pages, year, read){

    //some method to match author/title combo
    const isDuplicate = myLibrary.some(book => {
        return book.title === title && book.author === author;
    });

    if (isDuplicate) {
        alert('duplicate');
        return;
    }

    //pushes validated entry into contructor
    const newBook = new Book(title, author, pages, year, read);

    //pushes constructed book object to myLibrary Array
    myLibrary.push(newBook);

    //pushes a reference of same object to UI renderer 
    renderOneBook(newBook);
   
};



//Book Constructor
function Book (title, author, pages, year, read) {

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.read = read;
    this.id = self.crypto.randomUUID()

}

//protoype method to update book based on UI interaction
Book.prototype.toggleRead = function(newValue){
    this.read = newValue;
}

  //Single book card UI render logic
    function renderOneBook (book) {

            const newCard = document.createElement('div');
                newCard.classList.add('newCard');
                newCard.setAttribute('data-id', book.id)
                con1.appendChild(newCard);

                const bookTitle = document.createElement('div');
                bookTitle.classList.add('bookTitle');
                bookTitle.textContent = book.title;
                newCard.appendChild(bookTitle);

                //author
                const bookAuthor = document.createElement('div');
                bookAuthor.classList.add('bookAuthor');
                bookAuthor.textContent = book.author;
                bookTitle.appendChild(bookAuthor);

                //pages
                const bookPages = document.createElement('div');
                bookPages.classList.add('bookPages');
                bookPages.textContent = book.pages;
                bookAuthor.appendChild(bookPages);

                //year
                const bookYear = document.createElement('div');
                bookYear.classList.add('bookYear');
                bookYear.textContent = book.year ;
                bookPages.appendChild(bookYear);

                //Read status checkbox label
                const readDiv = document.createElement('div');
                bookYear.appendChild(readDiv);

                const readLabel = document.createElement('label');
                readLabel.setAttribute('for', 'read_label');
                readLabel.textContent='Read?';
                readDiv.appendChild(readLabel);

                //Read status checkbox input
                const bookRead = document.createElement('input');
                bookRead.setAttribute('type', 'checkbox');
                bookRead.setAttribute('name', 'read_label')
            
                //Checkbox state property
                bookRead.checked = book.read; 

                bookRead.addEventListener('change', () =>{
                    // book.read = bookRead.checked;
                    book.toggleRead(bookRead.checked)
                    
                })

                readLabel.appendChild(bookRead);
                
                //remove button
                const removeButton = document.createElement('button');
                removeButton.textContent='Remove';

                //remove logic
                removeButton.addEventListener('click', ()=> {

                //  console.log(newCard.dataset.id);
                 
                 const index = myLibrary.findIndex(book =>
                    
                    book.id === newCard.dataset.id);
                    
                if (index !== -1) {
                    myLibrary.splice(index, 1);
                }

                newCard.remove();
                 

                });


                readDiv.appendChild(removeButton)
                


    }  