// Do your work here...
// console.log('Hello, world!');


// form book
const bookshelfKey = 'BOOKSHELF_APPS';

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem(bookshelfKey)) {
        renderBookshelf();
    }

    document.getElementById('bookForm').addEventListener('submit', (event) => {
        event.preventDefault();
        addBook();
    });

    document.getElementById('searchBook').addEventListener('submit', (event) => {
        event.preventDefault();
        searchBook();
    });
});

// tambah book
function addBook() {
    const title = document.getElementById('bookFormTitle').value;
    const author = document.getElementById('bookFormAuthor').value;
    const year = Number(document.getElementById('bookFormYear').value);


    // const year = document.getElementById('bookFormYear').value;
    const isComplete = document.getElementById('bookFormIsComplete').checked;

    const bookId = +new Date();
    const newBook = {
        id: bookId,
        title,
        author,
        year,
        isComplete
    };

    saveBook(newBook);
    renderBookshelf();
}



// simpan book
function saveBook(book) {
    const books = getBooks();
    books.push(book);
    localStorage.setItem(bookshelfKey, JSON.stringify(books));
}

function getBooks() {
    return JSON.parse(localStorage.getItem(bookshelfKey)) || [];
}

function renderBookshelf() {
    const incompleteBookList = document.getElementById('incompleteBookList');
    const completeBookList = document.getElementById('completeBookList');
    incompleteBookList.innerHTML = '';
    completeBookList.innerHTML = '';

    const books = getBooks();
    books.forEach(book => {
        const bookElement = createBookElement(book);
        if (book.isComplete) {
            completeBookList.appendChild(bookElement);
        } else {
            incompleteBookList.appendChild(bookElement);
        }
    });
}


// membuat book
function createBookElement(book) {
    const bookContainer = document.createElement('div');
    bookContainer.setAttribute('data-bookid', book.id);
    bookContainer.setAttribute('data-testid', 'bookItem');

    const bookTitle = document.createElement('h3');
    bookTitle.setAttribute('data-testid', 'bookItemTitle');
    bookTitle.textContent = book.title;

    const bookAuthor = document.createElement('p');
    bookAuthor.setAttribute('data-testid', 'bookItemAuthor');
    bookAuthor.textContent = `Penulis: ${book.author}`;

    const bookYear = document.createElement('p');
    bookYear.setAttribute('data-testid', 'bookItemYear');
    bookYear.textContent = `Tahun: ${book.year}`;

    const actionContainer = document.createElement('div');
    const completeButton = document.createElement('button');
    completeButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
    completeButton.textContent = book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca';
    completeButton.addEventListener('click', () => toggleBookCompletion(book.id));

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('data-testid', 'bookItemDeleteButton');
    deleteButton.textContent = 'Hapus Buku';
    deleteButton.addEventListener('click', () => deleteBook(book.id));

    const editButton = document.createElement('button');
    editButton.setAttribute('data-testid', 'bookItemEditButton');
    editButton.textContent = 'Edit Buku';
    // Implement edit functionality here if needed
    // editButton.addEventListener('click', () => editBook(book.id));

    actionContainer.appendChild(completeButton);
    actionContainer.appendChild(deleteButton);
    actionContainer.appendChild(editButton);

    bookContainer.appendChild(bookTitle);
    bookContainer.appendChild(bookAuthor);
    bookContainer.appendChild(bookYear);
    bookContainer.appendChild(actionContainer);

    return bookContainer;
}

function toggleBookCompletion(bookId) {
    const books = getBooks();
    const bookIndex = books.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
        books[bookIndex].isComplete = !books[bookIndex].isComplete;
        localStorage.setItem(bookshelfKey, JSON.stringify(books));
        renderBookshelf();
    }
}


// hapus book
function deleteBook(bookId) {
    let books = getBooks();
    books = books.filter(book => book.id !== bookId);
    localStorage.setItem(bookshelfKey, JSON.stringify(books));
    renderBookshelf();
}


// cari book
function searchBook() {
    const searchTitle = document.getElementById('searchBookTitle').value.toLowerCase();
    const books = getBooks();
    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTitle));

    renderFilteredBooks(filteredBooks);
}

// selesai baca
function renderFilteredBooks(filteredBooks) {
    const incompleteBookList = document.getElementById('incompleteBookList');
    const completeBookList = document.getElementById('completeBookList');
    incompleteBookList.innerHTML = '';
    completeBookList.innerHTML = '';

    filteredBooks.forEach(book => {
        const bookElement = createBookElement(book);
        if (book.isComplete) {
            completeBookList.appendChild(bookElement);
        } else {
            incompleteBookList.appendChild(bookElement);
        }
    });
}
