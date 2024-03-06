import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';

// App.js

function App() {
  const [books, setBooks] = useState([]);

  // Reading DATA
  const fetchBooks = useCallback(async () => {
    try {
      const response = await axios.get(
        'https://theapi-yeqa.onrender.com/books'
      );
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  // Create DATA {BOOKS}
  const createBook = async (title) => {
    try {
      const response = await axios.post(
        'https://theapi-yeqa.onrender.com/books',
        {
          title
        }
      );
      setBooks([...books, response.data]);
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  const deleteBookById = async (_id) => {
    console.log('Deleting book with ID:', _id); // Add this logging statement
    try {
      await axios.delete(`https://theapi-yeqa.onrender.com/books/${_id}`);
      setBooks(books.filter((book) => book._id !== _id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  // EDIT DATA {BOOKS}
  const editBookById = async (_id, newTitle) => {
    console.log('Editing book with ID:', _id); // Add this logging statement
    try {
      const response = await axios.put(
        `https://theapi-yeqa.onrender.com/books/${_id}`,
        {
          title: newTitle
        }
      );

      const updatedBooks = books.map((book) => {
        if (_id === book._id) {
          return { ...book, ...response.data };
        }
        return book;
      });
      setBooks(updatedBooks);
    } catch (error) {
      console.error('Error editing book:', error);
    }
  };

  // JSX
  return (
    <div className="app">
      <h1>Reading List</h1>
      <BookList books={books} onDelete={deleteBookById} onEdit={editBookById} />
      <BookCreate onCreate={createBook} />
    </div>
  );
}

export default App;
