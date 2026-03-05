import { useState } from "react";
import { X } from "lucide-react";
import BookSidebar from "./BookSidebar";
import ReviewsSection from "../review/ReviewsSection";
import EditBookModal from "@/pages/admin/BookDetails/EditBookModal";
import type { Book } from "@/types/book.type";


const BookDetailModal = ({
  selectedBook,
  onClose,
  isAdmin = false,
  onDeleteBook,
  currentUserId,
  // onEditReview,
  // onDeleteReview,
}: {
  selectedBook: Book | null;
  onClose: () => void;
  isAdmin?: boolean;
  onDeleteBook?: () => void;
  currentUserId?: string | null;
  // onEditReview?: (reviewId: number) => void;
  // onDeleteReview?: (reviewId: number) => void;
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);

  if (!selectedBook) return null;

  const avgRating = selectedBook.reviews.length
    ? selectedBook.reviews.reduce((sum, r) => sum + r.rating, 0) /
      selectedBook.reviews.length
    : 0;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
        
        <div className="relative w-[95%] h-[95%] bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl shadow-[0_0_60px_hsl(var(--primary)/0.15)] flex flex-col sm:flex-row overflow-hidden">

          <BookSidebar
            book={selectedBook}
            avgRating={avgRating}
            isAdmin={isAdmin}
            onEdit={() => setIsEditOpen(true)}
            onDelete={onDeleteBook}
          />

          <ReviewsSection
            reviews={selectedBook.reviews}
            totalReviews={selectedBook.totalReviews}
            currentUserId={currentUserId}
            // onEditReview={onEditReview}
            // onDeleteReview={onDeleteReview}
          />

          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-md flex items-center justify-center border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary)/0.08)] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

        </div>
      </div>

      {isEditOpen && (
        <EditBookModal
          book={selectedBook}
          onClose={() => setIsEditOpen(false)}
        />
      )}
    </>
  );
};

export default BookDetailModal;