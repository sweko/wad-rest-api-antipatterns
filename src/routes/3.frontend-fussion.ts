import express from 'express';
import { LibraryService } from '../services/library-03';

const router = express.Router();
const service = new LibraryService();

router.get('/dashboard', (req, res) => {
  const recentBooks = service.getRecentBooks(5);
  const topAuthors = service.getTopAuthors(3);
  const popularSeries = service.getPopularSeries(3);
  res.json({ recentBooks, topAuthors, popularSeries });
});

router.get('/author-profile/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const author = service.getAuthor(id);
  const books = service.getBooksByAuthor(id);
  const relatedAuthors = service.getRelatedAuthors(id, 3);
  res.json({ author, books, relatedAuthors });
});

export default router;
