import { useContext, type FC } from "react";
import Books from "@/components/common/book/Book";
import BookDetailModal from "@/components/common/book/Bookdetailmodal";
// import type { Book } from "@/types/book.type";
import { useOutletContext } from "react-router-dom";
import type{ User } from "@/types/user.type";
import { Navigate } from "react-router-dom";
import { showWarn } from "@/utils/toast";
import { BooksContext } from "@/context/BookContext";

const UserDashboard: FC = () => {
  const context = useOutletContext<{ user: User } | null>();
if (!context){
    showWarn("You are not authorized to access this page.");
  return <Navigate to="/userLogin"/>; 
} 
const { user } = context;

 const {isModalOpen,setIsModalOpen} = useContext(BooksContext)

  return (
    <div>
      <Books />

      {isModalOpen && (
        <BookDetailModal
          onClose={() => {
            setIsModalOpen(false);
          }}
          currentUserId={user?.id}
          isAdmin={false}
        />
      )}
    </div>
  );
};

export default UserDashboard;