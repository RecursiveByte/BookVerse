import { createContext } from "react";
import type { Book } from "@/types/book.type";
import type { Dispatch, SetStateAction } from "react";

interface BooksContextType {
  currBooks: Book[];
  setCurrBooks: Dispatch<SetStateAction<Book[]>>;

  selectedBook: Book | null;
  setSelectedBook: Dispatch<SetStateAction<Book | null>>;

  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const BooksContext = createContext<BooksContextType>({
  currBooks: [],
  setCurrBooks: () => {},

  selectedBook: null,
  setSelectedBook: () => {},

  isModalOpen: false,
  setIsModalOpen: () => {},
});