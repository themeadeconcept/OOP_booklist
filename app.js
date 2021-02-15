// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI Constructor

function UI() {}

//Add book to list
UI.prototype.addBookToList = function (book) {
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
};

// Show Alert box
UI.prototype.showAlert = function (message, className) {
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
};

// Delete a book
UI.prototype.deleteBook = function (target) {
  if (target.className === "delete") {
    // traverses up two, and removes the entire row from the DOM using event delegation
    target.parentElement.parentElement.remove();
  }
};

// clears the input fields
UI.prototype.clearFields = function () {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
};

// Event Listeners for adding a book
document.getElementById("book-form").addEventListener("submit", function (e) {
  // Get form values
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  //Instantiating new book object
  const book = new Book(title, author, isbn);

  // Instantiate new UI Object
  const ui = new UI();

  // Validation
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill in all fields", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

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

  ui.deleteBook(e.target);

  // Show Message
  ui.showAlert("Book removed", "success");

  e.preventDefault();
});
