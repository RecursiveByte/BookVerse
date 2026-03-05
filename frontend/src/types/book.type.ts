import type { Review } from "./review.type";

export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  image_url?: string;
  totalReviews: number;
  reviews: Review[];
}

export interface BookSidebarProps {
  book: Book;
  avgRating: number;
  isAdmin?: boolean;
  onEdit: () => void;
  onDelete?: () => void;
}

export interface BooksCountResponse {
  totalBooks: number;
  lastPage: number;
}
