import express from 'express';
import session from 'express-session';
import { LibraryService } from '../services/library';

const router = express.Router();
const service = new LibraryService();

router.use(session({ secret: 'library-secret', resave: false, saveUninitialized: true }));

router.post('/auth/login', (req, res) => {
  const { username, password } = req.body;
  const user = service.authenticateUser(username, password);
  if (user) {
    req.session.userId = user.id;
    res.json({ message: 'Logged in successfully' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

router.get('/user/profile', (req, res) => {
  if (req.session.userId) {
    const user = service.getUser(req.session.userId);
    res.json(user);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

router.post('/books/:id/borrow', (req, res) => {
  if (req.session.userId) {
    const bookId = parseInt(req.params.id);
    const result = service.borrowBook(bookId, req.session.userId);
    res.json(result);
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

export default router;
