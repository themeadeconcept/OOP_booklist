class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("book-list");
    // Create table row element
    const row = document.createElement("tr");

    // Insert columns
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
  `;

    // Dynamically output tables tows into the book list
    list.appendChild(row);
  }

  showAlert(message, className) {
    // Create div
    const div = document.createElement("div");
    // Add classes
    div.className = `alert ${className}`;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get Parent
    const container = document.querySelector(".container");
    const form = document.querySelector("#book-form");

    //Insert alert
    // insert div(alert), and what we want to insert it before (the form)
    container.insertBefore(div, form);

    // Time out after 3 seconds
    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  deleteBook(target) {
    // THIS ONLY EXECUTES IF TARGET IS THE ELEMENT WITH CLASS "DELETE"
    if (target.className === "delete") {
      // traverses up two, and removes the entire row from the DOM using event delegation
      target.parentElement.parentElement.remove();
      // Show Message - MOVED SHOW ALERT HERE BECAUSE CLICKING THE WHOLE ROW WOULD SHOW THE MESSAGE.  THIS SHOWS AFTER ROW IS REMOVED AND CLICKED ON X
      this.showAlert("Book removed", "success");
    }
  }

  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

// Local Storage Class
class Store {
  static getBooks() {
    let books;
    //if there are no books in local storage / return an empty array
    if (localStorage.getItem("books") === null) {
      books = [];
    } else {
      //if storage has books then parse that into my array
      books = JSON.parse(localStorage.getItem("books"));
    }

    return books;
  }

  static displayBooks() {
    // Get books array
    const books = Store.getBooks();

    books.forEach(function (book) {
      // First instantiate class then you can use its methods
      const ui = new UI();

      //add book to UI
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    // Get books array
    const books = Store.getBooks();

    // push new book into books array
    books.push(book);

    // set local storage with the new books array named books
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    // Get books array
    const books = Store.getBooks();

    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem("books", JSON.stringify(books));
  }
}

// DOM Load Event
document.addEventListener("DOMContentLoaded", Store.displayBooks);

//Event Listener for adding a book
document.getElementById("book-form").addEventListener("submit", function (e) {
  // Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  //Instantiating new book object
  const book = new Book(title, author, isbn);

  // Instantiate new UI Object
  const ui = new UI();

  console.log(ui);

  // Validation
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

    // Add to local storage;
    Store.addBook(book);

    // Show successfully added book
    ui.showAlert("Book Added!", "success");

    // Clear input fields after book is submitted
    ui.clearFields();
  }

  e.preventDefault();
});

// Event Listener for deleting items
document.getElementById("book-list").addEventListener("click", function (e) {
  //Instantiate the UI
  const ui = new UI();

  // Delete the book
  ui.deleteBook(e.target);

  // Remove from local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  e.preventDefault();
});
