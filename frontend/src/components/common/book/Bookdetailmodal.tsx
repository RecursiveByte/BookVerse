import { useContext, useState } from "react";
import { X } from "lucide-react";
import BookSidebar from "./BookSidebar";
import ReviewsSection from "../review/ReviewsSection";
import EditBookModal from "@/pages/admin/Book/EditBookModal";
import { deleteBook } from "@/services/admin.service";
import { showError } from "@/utils/toast";
import { BooksContext } from "@/context/BookContext";

const BookDetailModal = ({
  onClose,
  isAdmin = false,
  // onEditReview,
  // onDeleteReview,
}: {
  onClose: () => void;
  isAdmin?: boolean;
  currentUserId?: string | null;
}) => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  

  const {selectedBook,setCurrBooks} = useContext(BooksContext)

  const handleDeleteBook = async () => {
    if (!selectedBook) return;
  
    try {
      await deleteBook(selectedBook.id);
      setCurrBooks(prev=>prev.filter(ele => ele.id != selectedBook.id))

      onClose(); 
    } catch (err) {
      showError("Failed to delete book ");
    }
  };

  if (!selectedBook) return null;

  const avgRating = selectedBook.reviews.length
    ? selectedBook.reviews.reduce((sum, r) => sum + r.rating, 0) /
      selectedBook.reviews.length
    : 0;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
        
        <div className="relative w-[95%] h-[95%] bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-2xl shadow-[0_0_60px_hsl(var(--primary)/0.15)] flex flex-col sm:flex-row ">

          <BookSidebar
            book={selectedBook}
            avgRating={avgRating}
            isAdmin={isAdmin}
            onEdit={() => setIsEditOpen(true)}
            onDelete={handleDeleteBook}
          />

          <ReviewsSection
            reviews={selectedBook.reviews}
            totalReviews={selectedBook.totalReviews}
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