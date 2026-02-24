import { Router } from "express";
import {
  uploadBooksFromCSV,
  editBook,
  deleteBook,
} from "../controllers/admin.controller";
import { upload } from "../middlewares/multer";
import { authenticateUser } from "../middlewares/auth.middleware";

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
