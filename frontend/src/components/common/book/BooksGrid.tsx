import BookCard from "@/components/common/book/BookCard";
import type { Book } from "@/types/book.type";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  books: Book[];
  onBookClick?: (book: Book) => void;
  isAdmin: boolean;
  onEdit?: (book: Book) => void;
  onDelete?: (book: Book) => void;
}

const BooksGrid = ({ books, onBookClick, isAdmin, onEdit, onDelete }: Props) => {
  return (
    <div className="grid  grid-cols-1 justify-items-center  sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 mb-8 sm:mb-10">
      {books.map((book) => (
        <div key={book.id} className="relative   group">
          <BookCard book={book} onClick={onBookClick} />

          {isAdmin && (
            <div className="absolute top-2 right-2 flex gap-1.5 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit?.(book);
                }}
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-[hsl(var(--primary))] hover:bg-[hsl(var(--primary)/0.1)] text-[10px] font-medium transition-colors shadow-sm"
              >
                <Pencil className="w-3 h-3" /> Edit
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(book);
                }}
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-[hsl(var(--card))] border border-[hsl(var(--border))] text-red-400 hover:bg-red-500/10 text-[10px] font-medium transition-colors shadow-sm"
              >
                <Trash2 className="w-3 h-3" /> Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default BooksGrid;