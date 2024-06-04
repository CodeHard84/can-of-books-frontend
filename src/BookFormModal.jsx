import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const BookFormModal = ({ show, handleClose, updateBooks }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${SERVER_URL}/books`, {
        title,
        description,
        status
      });
      console.log('Book added:', response.data);
      updateBooks(response.data);
      handleClose();
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formStatus">
            <Form.Label>Status</Form.Label>
            <Form.Control
              type="text"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
            Add Book
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default BookFormModal;
