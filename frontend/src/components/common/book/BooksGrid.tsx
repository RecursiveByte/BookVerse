import BookCard from "@/components/common/book/BookCard";
import type { Book } from "@/types/book.type";

interface Props {
  books: Book[];
  isAdmin: boolean;
}

const BooksGrid = ({ books }: Props) => {
  
  return (

    <div className="grid  grid-cols-1 justify-items-center  sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
      {books.map((book) => (
        <div key={book.id} className="relative   group">
          <BookCard book={book}  />
        </div>
      ))}
    </div>
  );
};

export default BooksGrid;