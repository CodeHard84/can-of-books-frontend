import React, { useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const BestBooks = ({ books, setBooks }) => {
  useEffect(() => {
    axios.get(`${SERVER_URL}/books`)
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, [setBooks]); // <-- GPT helped here.

  return (
    <>
      <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>

      {books.length ? (
        <Carousel>
          {books.map((book, index) => (
            <Carousel.Item key={index}>
              <p>{book.title}</p>
              <p>{book.description}</p>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <h3>No Books Found :(</h3>
      )}
    </>
  );
}

export default BestBooks;
