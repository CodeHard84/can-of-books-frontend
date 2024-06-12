import React, { useState } from 'react';
import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const AddBook = ({ setShowAddBookForm, updateBooks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.post(`${SERVER_URL}/books`, {
  //       title,
  //       description,
  //       status
  //     });
  //     console.log('Book added:', response.data);
  //     updateBooks(response.data);
  //     setShowAddBookForm(false);
  //   } catch (error) {
  //     console.error('Error adding book:', error);
  //   }
  // };

  return (
    // <form onSubmit={handleSubmit}>
    //   <div>
    //     <label>
    //       Title:
    //       <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
    //     </label>
    //   </div>
    //   <div>
    //     <label>
    //       Description:
    //       <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
    //     </label>
    //   </div>
    //   <div>
    //     <label>
    //       Status:
    //       <input type="text" value={status} onChange={(e) => setStatus(e.target.value)} required />
    //     </label>
    //   </div>
    //   <button type="submit">Add Book</button>
    // </form>
  );
}

export default AddBook;
