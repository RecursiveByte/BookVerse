import { Pencil, Trash2 } from "lucide-react";
import type { Book } from "@/types/book.type";

interface Props {
  book: Book;
  onEdit?: (book: Book) => void;
  onDelete?: (book: Book) => void;
}

const BookAdminActions = ({ book, onEdit, onDelete }: Props) => {
  return (
    <div className="absolute top-2 right-2 flex gap-2">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEdit?.(book);
        }}
        className="text-xs flex items-center gap-1"
      >
        <Pencil size={14} />
        Edit
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete?.(book);
        }}
        className="text-xs flex items-center gap-1 text-red-500"
      >
        <Trash2 size={14} />
        Delete
      </button>
    </div>
  );
};

export default BookAdminActions;