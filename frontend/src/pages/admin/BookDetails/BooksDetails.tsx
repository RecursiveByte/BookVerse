import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import Books from "@/components/common/book/Books";
import BookDetailModal from "@/components/common/book/Bookdetailmodal";
import { getBooksWithReviews } from "@/services/book.service";
import { showError,showSuccess } from "@/utils/toast";
import { deleteBook } from "@/services/admin.service";
import type { Book } from "@/types/book.type";
import type { User } from "@/types/user.type";

const BooksDetails = ({ user }: { user: User }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await getBooksWithReviews(1);
        setBooks(res.data.books);
      } catch (error) {
        showError("Failed to fetch books");
      }
    };
    fetchBooks();
  }, []);

  
  const handleDeleteBook = async () => {
    if (!selectedBook) return;
    try {
      await deleteBook(selectedBook.id);
      showSuccess("Book deleted successfully");
      setIsModalOpen(false);
      setSelectedBook(null);
      // fetchBooks();
    } catch (error) {
      showError("Failed to delete book");
    }
  };

  // const handleEditReview = (reviewId: number) => {
    // console.log("Edit review:", reviewId);
  // };
  // 
  // const handleDeleteReview = (reviewId: number) => {
    // console.log("Delete review:", reviewId);
  // };

  return (
    <div className="flex flex-col gap-6 w-full">

      <div className="flex items-center justify-between px-6 pt-6">
        <div>
          <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">Books</h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">{books.length} total books</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-md bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary))] border border-[hsl(var(--primary)/0.3)] hover:shadow-[0_0_12px_hsl(var(--primary)/0.3)] text-sm font-medium transition-all duration-200">
          <Plus className="w-4 h-4" />
          Add Book
        </button>
      </div>

      <Books
        books={books}
        onBookClick={(book) => {
          setSelectedBook(book);
          setIsModalOpen(true);
        }}
      />

      {isModalOpen && (
        <BookDetailModal
          onClose={() => {
            setIsModalOpen(false);
            setSelectedBook(null);
          }}
          selectedBook={selectedBook}
          isAdmin={true}
          onDeleteBook={handleDeleteBook}
          currentUserId={user?.id}
          // onEditReview={handleEditReview}
          // onDeleteReview={handleDeleteReview}
        />
      )}

    </div>
  );
};

export default BooksDetails;