import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import BestBooks from './BestBooks';
import AddBook from './AddBook';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Profile from './About';

const App = () => {
  const [showAddBookForm, setShowAddBookForm] = useState(false);
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
                <BestBooks books={books} setBooks={setBooks} />
                <button onClick={() => setShowAddBookForm(true)}>Add Book</button>
                {showAddBookForm && <AddBook setShowAddBookForm={setShowAddBookForm} updateBooks={updateBooks} />}
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
