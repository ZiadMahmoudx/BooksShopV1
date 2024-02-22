import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';
function App() {
  const [books, setBooks] = useState([]);
  //Reading DATA
  const fetchBooks = useCallback(async () => {
    const response = await axios.get('http://localhost:3001/books');
    setBooks(response.data);
  }, []);
  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);
  // Create DATA {BOOKS}
  const creatBook = async (title) => {
    const response = await axios.post('http://localhost:3001/books', {
      title
    });

    const updateBooks = [...books, response.data];

    setBooks(updateBooks);
  };
  // DELTE DATA {BOOKS}
  const deleteBookById = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);
    const updatedBooks = books.filter((book) => {
      return book.id !== id;
    });
    setBooks(updatedBooks);
  };
  //EDIT DATA {BOOKS}
  const editBookById = async (id, newTitle) => {
    const response = await axios.put(`http://localhost:3001/books/${id}`, {
      title: newTitle
    });

    const updatedBooks = books.map((book) => {
      if (id === book.id) {
        return { ...book, ...response.data };
      }
      return book;
    });
    setBooks(updatedBooks);
  };
  // JSX
  return (
    <div className="app">
      <h1>Reading List </h1>
      <BookList books={books} onDelete={deleteBookById} onEdit={editBookById} />
      <BookCreate onCreate={creatBook} />
    </div>
  );
}

export default App;
