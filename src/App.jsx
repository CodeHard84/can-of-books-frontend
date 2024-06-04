import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import BookFormModal from './BookFormModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Profile from './About';

const App = () => {
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const [books, setBooks] = useState([]);

  const updateBooks = (newBook) => {
    setBooks([...books, newBook]);
  };

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route 
            exact path="/"
            element={
              <>
                <button onClick={() => setShowAddBookModal(true)}>Add Book</button>
                <BookFormModal
                  show={showAddBookModal}
                  handleClose={() => setShowAddBookModal(false)}
                  updateBooks={updateBooks}
                />
                <BestBooks books={books} setBooks={setBooks} />
              </>
            }
          />
          <Route path="/about" element={<Profile />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
