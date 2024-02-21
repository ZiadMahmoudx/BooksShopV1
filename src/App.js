import { useState } from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';
function App() {
  const [books, setBooks] = useState([]);

  const deleteBookById = (id) => {
    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });
    setBooks(updatedBooks);
  };

  const editBookById = (id, newTitle) => {
    const updatedBooks = books.map((book) => {
      if (id === book.id) {
        return { ...book, title: newTitle };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  const creatBook = (title) => {
    const updateBooks = [
      ...books,
      {
        id: Math.round(Math.random() * 9999),
        title
      }
    ];

    setBooks(updateBooks);
  };
  return (
    <div className="app">
      <h1>Reading List </h1>
      <BookList books={books} onDelete={deleteBookById} onEdit={editBookById} />
      <BookCreate onCreate={creatBook} />
    </div>
  );
}

export default App;
