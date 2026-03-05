import type { FC } from "react";
import Books from "@/components/common/book/Book";
import type { Book } from "@/types/book.type";

const UserDashboard: FC = () => {

  const handleBookClick = (book: Book) => {
    console.log("Clicked book:", book);
  };

  return (
    <div>
      <Books onBookClick={handleBookClick} />
    </div>
  );
};

export default UserDashboard;