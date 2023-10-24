
// Book Class:
class Book {
  constructor(title, auther, isbn) {
    this.title = title;
    this.auther = auther;
    this.isbn = isbn;
  }
}

// UI class:

class UI {
  static displayBooks() {
    const storebooks = store.getBooks();

    storebooks.forEach(book => UI.addBookToList(book))
  }

  static addBookToList(book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.className = "my-4 bg-slate-200 hover:bg-slate-300 flex justify-between items-center my-1 px-2 rounded-md"

    row.innerHTML = `
    <td>${book.title}</td>
    <td class=" m-3">${book.auther}</td>
    <td class=" m-3">${book.isbn}</td>
    <td><a href="#" class="text-center leading-8 h-8 w-8 block  bg-red-600 hover:bg-red-900 text-red-50 delete rounded-full">X</a></td>
    `;

    list.appendChild(row)
  }
  static delete(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove()
    }
  }
  static showAlert(Massage, className) {
    let div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(Massage));
    let container = document.querySelector('.container')
    let form = document.querySelector('#book-form')
    container.insertBefore(div, form)

    setTimeout(() => document.querySelector('.alert').remove(), 3000)
  }
  static clearText() {
    document.getElementById('title').value = '';
    document.getElementById('auther').value = '';
    document.getElementById('isbn').value = '';
  }
}

// store class:

class store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books= []
    } else {
      books = JSON.parse(localStorage.getItem('books'))
    }
    return books
  }
  static addBooks(book) {
    let books = store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books))
  }
  static removeBooks(re) {
    let books = store.getBooks();
    books.forEach((book, ind) => {
      if (book.isbn === re) {
        books.splice(ind, 1)
      }
    })
    localStorage.setItem('books', JSON.stringify(books))
  }
}

// Event class: Display book

document.addEventListener('DOMContentLoaded', UI.displayBooks)
// Event class: Add a book

document.getElementById('book-form').addEventListener('submit', e => {
  e.preventDefault();
  let title = document.getElementById('title').value;
  let auther = document.getElementById('auther').value;
  let isbn = document.getElementById('isbn').value;

  if (title === '' || auther === '' || isbn === '') {
    UI.showAlert("Please Fill In All Fields", 'bg-red-600 text-white mt-6 w-96 py-1 pl-3 mx-auto rounded-md')
  } else {
    let book = new Book(title, auther, isbn);

    UI.addBookToList(book)
    store.addBooks(book)
    UI.showAlert('Book Added', 'bg-green-600 text-white mt-6 w-96 py-1 pl-3 mx-auto rounded-md')
    UI.clearText(book)
  }

})
// Event class: Remove a book

document.querySelector('#book-list').addEventListener('click', e => {
  UI.delete(e.target)
  store.removeBooks(e.target.parentElement.previousElementSibling.textContent)
  UI.showAlert('Book Removed', 'bg-red-700 text-white mt-6 w-96 py-1 pl-3 mx-auto rounded-md')
})
