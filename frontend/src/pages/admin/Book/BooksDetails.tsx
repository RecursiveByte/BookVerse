import {  useState, useContext } from "react";
import { Plus } from "lucide-react";
import Books from "@/components/common/book/Book";
import BookDetailModal from "@/components/common/book/Bookdetailmodal";
// import { getBooksWithReviews } from "@/services/book.service";
// import { showError } from "@/utils/toast";
// import type { Book } from "@/types/book.type";
import type { User } from "@/types/user.type";
import { BooksContext } from "@/context/BookContext";
import AddBooksModal from "./AddBook";

const BooksDetails = ({ user }: { user: User }) => {
  // const [books, setBooks] = useState<Book[]>([]);
  const [addModalOpen, setAddModalOpen] = useState(false);

  const { setSelectedBook, isModalOpen, setIsModalOpen } = useContext(BooksContext);

  // useEffect(() => {
    // const fetchBooks = async () => {
      // try {
        // const res = await getBooksWithReviews(1);
        // setBooks(res.data.books);
      // } catch (error) {
        // showError("Failed to fetch books");
      // }
    // };
    // fetchBooks();
  // }, []);

  return (
    <div className="flex flex-col gap-6 w-full">

      <div className="flex items-center justify-between px-6 pt-6">
        <div>
          <h2 className="text-xl font-bold text-[hsl(var(--foreground))]">Books</h2>
          {/* <p className="text-sm text-[hsl(var(--muted-foreground))]">{books.length} total books</p> */}
        </div>
        <button
          onClick={() => setAddModalOpen(true)}
          className="flex items-center gap-2 z-50 px-4 py-2 rounded-md bg-[hsl(var(--primary)/0.15)] text-[hsl(var(--primary))] border border-[hsl(var(--primary)/0.3)] hover:shadow-[0_0_12px_hsl(var(--primary)/0.3)] text-sm font-medium transition-all duration-200">
          <Plus className="w-4 h-4" />
          Add Book
        </button>
      </div>

      <Books
        // onBookClick={() => setIsModalOpen(true)}
      />

      {isModalOpen && (
        <BookDetailModal
          onClose={() => {
            setIsModalOpen(false);
            setSelectedBook(null);
          }}
          isAdmin={true}
          currentUserId={user?.id}
        />
      )}

      {addModalOpen && <AddBooksModal
        onClose={() => setAddModalOpen(false)}
      />}

    </div>
  );
};

export default BooksDetails;