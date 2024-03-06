import { useState } from 'react';

function BookEdit({ book, onSubmit }) {
  const [title, setTitle] = useState(book.title);

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(book._id, title);
  };

  return (
    <form className="book-edit" onSubmit={handleSubmit}>
      <label htmlFor="edit">Title</label>
      <input
        value={title}
        onChange={handleChange}
        id="edit"
        className="input"
      />
      <button className="button in-primary">Save!</button>
    </form>
  );
}

export default BookEdit;
