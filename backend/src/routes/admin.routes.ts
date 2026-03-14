import { Router } from "express";
import {
  editBook,
  deleteBook,
  uploadBooksFromCSV
} from "../controllers/admin.controller";
import { authenticateUser } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer";


const router = Router();

router.post(
  "/upload-books-csv",
  authenticateUser,
  upload.single("file"),
  uploadBooksFromCSV
);

router.put(
  "/edit-book",
  authenticateUser,
  editBook
);

router.delete(
  "/delete-book",
  authenticateUser,
  deleteBook
);

export default router;
