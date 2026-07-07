import express from 'express';
import { LibraryService } from '../services/library';

const router = express.Router();
const service = new LibraryService();

router.get('/authors/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const author = service.getAuthor(id);
  res.json(author);
});

router.get('/authors/:id/nationality', (req, res) => {
  const id = parseInt(req.params.id);
  const author = service.getAuthor(id);
  if (!author) {
    res.status(404).json({ message: 'Author not found' });
    return;
  }
  const nationality = service.getNationality(author.nationalityId);
  res.json(nationality);
});

router.get('/authors/:id/books', (req, res) => {
  const id = parseInt(req.params.id);
  const books = service.getBooksByAuthor(id);
  res.json(books);
});

router.get('/authors/:id/series', (req, res) => {
  const id = parseInt(req.params.id);
  const series = service.getSeriesByAuthor(id);
  res.json(series);
});

export default router;
