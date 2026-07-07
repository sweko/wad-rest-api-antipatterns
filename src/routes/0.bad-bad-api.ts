import express from 'express';
import {LibraryService} from '../services/library';
import { ErrorCodes } from '../models/error-codes';

const router = express.Router();
const service = new LibraryService();

router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

router.get('/books', (req, res) => {
  res.json(service.getBooks());
});

router.get('/books/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const book = service.getBook(id);
  if (!book) {
    return res.json({ error: 'Book not found' });
  }
  res.json(book);
});

router.post('/book', (req, res) => {
  const book = req.body;
  const newBook = service.createBook(book);
  res.status(200).json(newBook);
});

router.post('/book/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const book = req.body;
    const updatedBook = service.updateBook(book);
    if (!updatedBook) {
      return res.status(200).json({ error: {
        code: ErrorCodes.NotFound,
        message: `Book with id ${id} not found`,
      }});
    }
    res.status(200).json(updatedBook);
  }
  catch (error) {
    res.status(500).json({ error: { 
      code: ErrorCodes.InternalServerError, 
      message: 'Failed to update book' 
    }});
  }
});

router.post('/delete-book/', (req, res) => {
  const book = req.body;
  const deletedBook = service.deleteBook(book);
  if (!deletedBook) {
    return res.status(200).json({ error: {
      code: ErrorCodes.NotFound,
      message: `Book with id ${book.id} not found`,
    } });
  }
  res.status(200).json(deletedBook);
});

export default router;