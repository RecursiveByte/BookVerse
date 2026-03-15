import BookCard from "@/components/common/book/BookCard";
import type { Book } from "@/types/book.type";

interface Props {
  books: Book[];
  isAdmin: boolean;
}

const BooksGrid = ({ books }: Props) => {
  if (books.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="hsl(150,10%,35%)" strokeWidth="1.5" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <p className="text-sm font-medium" style={{ color: "hsl(150,20%,60%)" }}>No books found</p>
        <p className="text-xs" style={{ color: "hsl(150,10%,40%)" }}>Try searching for something else</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 justify-items-center sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
      {books.map((book) => (
        <div key={book.id} className="relative group">
          <BookCard book={book} />
        </div>
      ))}
    </div>
  );
};

export default BooksGrid;