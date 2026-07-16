//Library Array
const myLibrary = [];

//book counter
const counter = document.querySelector('.counter')

//main container
const container = document.querySelector('.container');
const cardsContainer = document.createElement('div');
cardsContainer.classList.add('cardsContainer');
container.appendChild(cardsContainer);

const formPanel = document.createElement('div');
formPanel.classList.add('formPanel');
container.appendChild(formPanel);

//Addbook button
const addBook = document.querySelector('button');
addBook.textContent = ('Add Book');

//New book form  
addBook.addEventListener('click', () => {
    
    //if a newbook form already exists, return
    if(document.getElementsByClassName('formContainer').length !=0 ){
        
        return

    };
        
    //form container DOM
    const formContainer = document.createElement('div');
    formContainer.classList.add('formContainer')
    formPanel.appendChild(formContainer);

    //form DOM
    const newBookForm = document.createElement('form');
    newBookForm.setAttribute('novalidate', 'true');
    
    //title label+input
    const labelTitle = document.createElement('label');
    labelTitle.setAttribute('for', 'book_title');
    labelTitle.textContent= '*Book Title:';
    newBookForm.appendChild(labelTitle);

    const titleInput = document.createElement('input');
    titleInput.setAttribute('type', 'text');
    titleInput.setAttribute('id', 'book_title');
    titleInput.setAttribute('required', 'true');
    titleInput.setAttribute('minlength', '1');

    newBookForm.appendChild(titleInput);

    
    function validateTitle() {

    if (titleInput.validity.valueMissing) {
        titleInput.setCustomValidity("Enter a book title");
    } else {
        titleInput.setCustomValidity("");
    }

};
    //Validates title if user enters input
    titleInput.addEventListener('input', (validateTitle));
        
    //author label+input
    const labelAuthor = document.createElement('label');
    labelAuthor.setAttribute('for', 'book_author');
    labelAuthor.textContent= '*Book Author:';
    newBookForm.appendChild(labelAuthor);


    const authorInput = document.createElement('input');
    authorInput.setAttribute('type', 'text');
    authorInput.setAttribute('id', 'book_author');
    authorInput.setAttribute('required', 'true');
    authorInput.setAttribute('minlength', '1');
    newBookForm.appendChild(authorInput);

    function validateAuthor() {
     if (authorInput.validity.valueMissing) {
        authorInput.setCustomValidity("Enter author's name");
        } else {
        authorInput.setCustomValidity('');
    }};

    //Validates author if user enters input
    authorInput.addEventListener('input', (validateAuthor));    
    
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
    labelYear.textContent= '*Year of publication:';
    newBookForm.appendChild(labelYear);

    const yearInput = document.createElement('input');
    yearInput.setAttribute('type', 'number');
    yearInput.setAttribute('id', 'book_year');
    yearInput.setAttribute('required', 'true');
    newBookForm.appendChild(yearInput);

    function validateYear() {
     if (yearInput.validity.valueMissing) {
        yearInput.setCustomValidity("Enter publication date");
        } else {
        yearInput.setCustomValidity('');
    }};

    //Validates year if user enters input
    yearInput.addEventListener('input', (validateYear)); 



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
    

//validates title if user did not input anything
validateTitle();
//validates author if user did not input anything
validateAuthor();
//validates year if user did not input anything
validateYear();

function capitalizeFirstLetter(string)  {
  return [...string][0].toUpperCase() + [...string].slice(1).join('')
};

            //Submit button logic
            newBookForm.addEventListener('submit', (event) => {
                event.preventDefault();            
            
            if (!newBookForm.reportValidity()){
                return 
            } else {

                //UI field values
                const newTitle = capitalizeFirstLetter(titleInput.value);

                const newAuthor = capitalizeFirstLetter(authorInput.value);

                const newPages = pagesInput.value;

                const newYear = yearInput.value;

                const newRead = readInput.checked;

                //call to check for duplicates
                verifyBook (newTitle, newAuthor, newPages, newYear, newRead);

                //removes form after submit
                formContainer.remove();
            }    
            })
    
    formContainer.appendChild(newBookForm);
})

//Book Constructor
class Book {

    static count = 0;
    #read;

    constructor (title, author, pages, year, read) {

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.year = year;
    this.#read = read;
    this.id = self.crypto.randomUUID()
    Book.count++;

    }

    toggleRead (newValue) {
        this.#read = newValue;
    }

    static totalCount() {
       return  counter.textContent=(`You have ${Book.count} books.`)
        
    }
    
    static decreaseCount () {
        return Book.count--;
    }

    get readStatus(){
        return this.#read;
    }
}

//sample book
verifyBook ('The Hobbit', 'J.R.R. Tolkien', 950, 1933, true);

verifyBook ('Neuromancer', 'William Gibson', 350, 1984, true);




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

    // call book counter
    Book.totalCount();
   
};

  //Single book card UI render logic
    function renderOneBook (book) {

            const newCard = document.createElement('div');
                newCard.classList.add('newCard');
                newCard.setAttribute('data-id', book.id)
                cardsContainer.appendChild(newCard);

                const bookTitle = document.createElement('div');
                bookTitle.classList.add('bookTitle');
                bookTitle.textContent = book.title;
                newCard.appendChild(bookTitle);

                //author
                const bookAuthor = document.createElement('div');
                bookAuthor.classList.add('bookAuthor');
                bookAuthor.textContent = "Book author: ";
                newCard.appendChild(bookAuthor);
                const authorName = document.createElement('div');
                authorName.classList = 'authorName';
                authorName.textContent = book.author;
                newCard.appendChild(authorName);

                //pages
                const bookPages = document.createElement('div');
                bookPages.classList.add('bookPages');
                bookPages.textContent = book.pages;
                if(book.pages === '') {
                    bookPages.textContent = 'n/a'
                };
                
                newCard.appendChild(bookPages);

                //year
                const bookYear = document.createElement('div');
                bookYear.classList.add('bookYear');
                bookYear.textContent = book.year ;
                newCard.appendChild(bookYear);

                //Read status checkbox label
                const readDiv = document.createElement('div');
                readDiv.classList = 'readDiv';
                newCard.appendChild(readDiv);

                const readLabel = document.createElement('label');
                readLabel.setAttribute('for', 'read_label');
                readLabel.textContent='Read?';
                

                //Read status checkbox input
                const bookRead = document.createElement('input');
                bookRead.setAttribute('type', 'checkbox');
                bookRead.setAttribute('name', 'read_label')
            
                //Checkbox state property
                bookRead.checked = book.readStatus; 

                bookRead.addEventListener('change', () =>{
                    // book.read = bookRead.checked;
                    book.toggleRead(bookRead.checked)
                    // console.log(bookRead.checked)
                    
                })

                readDiv.appendChild(readLabel);
                readLabel.appendChild(bookRead);
                
                
                //remove button
                const removeButton = document.createElement('button');
                removeButton.classList.add('remove')
                removeButton.textContent='Remove';

                //remove logic
                removeButton.addEventListener('click', ()=> {

                //finds index of book instance
                 
                 const index = myLibrary.findIndex(book =>
                    
                    book.id === newCard.dataset.id);

                //if legit remove from array
                if (index !== -1) {
                    myLibrary.splice(index, 1);

                    //decrease counter
                    Book.decreaseCount();
                    //call counter
                    Book.totalCount();
                }

                newCard.remove();
                 

                });


                newCard.appendChild(removeButton)
                


    }  