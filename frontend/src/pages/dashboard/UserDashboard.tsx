import { useEffect, useState } from "react";
import Books from "@/components/common/Books";
import { getBooksWithReviews } from "@/services/book.service";
import { showError } from "@/utils/toast";

const UserDashboard = () => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await getBooksWithReviews();
        setBooks(res.data.books);
      } catch (error) {
        showError("Failed to fetch books");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, []);

  
  if (isLoading) return <div>Loading...</div>;
  return (
    <div className=" w-screen h-screen">
      <Books books={books} onBookClick={() => {}} />
    </div>
  );
};

export default UserDashboard;