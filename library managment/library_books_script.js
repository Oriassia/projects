const url = "http://localhost:8001";

document.getElementById("add-book-form").onsubmit = async function (event) {
    event.preventDefault();
    await addBook();
  };

  document.getElementById("delete-book-form").onsubmit = async function (event) {
    event.preventDefault();
    await deleteBook();
  };

  async function addBook() {
    const booknameValue = document.getElementById("book-name-value").value;
    const authorValue = document.getElementById("author-value").value;
    const pagesValue = document.getElementById("pages-value").value;

    try {
      await axios.post(`${url}/books`, {
        bookname: booknameValue,
        author: authorValue,
        pages: pagesValue,
      });
      alert("Book added successfully!");
      document.getElementById("add-book-form").reset();
    } catch (error) {
      console.error("Error adding book:", error);
      alert("Failed to add book. Please try again.");
    }
  }

async function deleteBook(){
    const bookInputId = document.getElementById("book-id-value").value;

    try {
      const booksData = await axios.get(`${url}/books`);
      const booksArray = booksData.data;
      const bookIdToDelete = booksArray[Number(bookInputId)-1].id

      if (bookIdToDelete) {
        await axios.delete(`${url}/books/${bookIdToDelete}`);
        alert("Book deleted successfully!");
        document.getElementById("delete-book-form").reset();
      } else {
        alert("Book ID not found.");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book. Please try again.");
    }
}


async function printBooksTable() {
    try {
        const response = await axios.get(`${url}/books`);
        const books = response.data;

        // Clear the existing table rows
        const booksTableElem = document.getElementById("books-table")
        booksTableElem.innerHTML = "";

        // Create table header
        const headerRow = document.createElement("tr");
        headerRow.innerHTML = `
            <th>ID</th>
            <th>Name</th>
            <th>Author</th>
            <th>Pages</th>   
        `;
        // add bocks@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
        booksTableElem.appendChild(headerRow);

        // Append book data to the table
        books.forEach(book => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${books.indexOf(book)+1}</td>
                <td>${book.bookname}</td>
                <td>${book.author}</td>
                <td>${book.pages}</td>
            `;
            booksTableElem.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching books:", error);
    }
}