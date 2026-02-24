import { Router } from 'express';
const router = Router();
import { getBooksWithReviews } from '../controllers/book.controller';
import { authenticateUser } from '../middlewares/auth.middleware';

router.get("/bookReviews", getBooksWithReviews);

export default router;