import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";
import { BooksContext } from "./context/BookContext";
import { useState } from "react";
import type { Book } from "./types/book.type";

const App: React.FC = () => {
  const [currBooks, setCurrBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <BooksContext.Provider
      value={{
        currBooks,
        setCurrBooks,
        selectedBook,
        setSelectedBook,
        isModalOpen,
        setIsModalOpen
      }}
    >
      <Router>
        <Navbar />

        <ToastContainer position="top-right" autoClose={3000} theme="dark" />
        <AppRouter />
      </Router>
    </BooksContext.Provider>
  );
};

export default App;
