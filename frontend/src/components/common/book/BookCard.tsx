import { useContext, type FC } from "react";
import type { Book } from "@/types/book.type";
import { BooksContext } from "@/context/BookContext";

interface BookCardProps {
  book: Book;
}

const BookCard: FC<BookCardProps> = ({ book }) => {

  const {setSelectedBook,setIsModalOpen} = useContext(BooksContext)

  return (
    <div
      onClick={() =>{ 
        setIsModalOpen(true);
        setSelectedBook(book);
      }}
      
      className="group relative flex flex-col w-45 rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] overflow-hidden cursor-pointer transition-all duration-300 hover:border-[hsl(var(--primary)/0.5)] hover:shadow-[0_0_24px_hsl(var(--primary)/0.1)] hover:-translate-y-1"
    >
      <div className="relative w-full h-55 overflow-hidden bg-[hsl(var(--input))]">
        <img
          src={book.image_url}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />        
      
        <div className="absolute inset-0 bg-[hsl(var(--primary)/0)] group-hover:bg-[hsl(var(--primary)/0.05)] transition-colors duration-300" />
      </div>

      <div className="flex flex-col gap-1 p-2 flex-1">
        <h3 className="text-[hsl(var(--foreground))] font-bold text-xs leading-snug line-clamp-2 group-hover:text-[hsl(var(--primary))] transition-colors duration-200">
          {book.title}
        </h3>
        <p className="text-[hsl(var(--muted-foreground))] text-[10px] font-medium truncate">
          {book.author}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[hsl(var(--primary))] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  );
};

export default BookCard;