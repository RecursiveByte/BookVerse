import { useState, type JSX } from "react";
import Overview from "./Overview";
import Sidebar from "./Sidebar";
import BooksDetails from "./BookDetails/BooksDetails";
import UserDetails from "./UserDetails";
import ReviewsDetails from "./ReviewsDetails";
import { Navigate, useOutletContext } from "react-router-dom";
import type { User } from "@/types/user.type";
import { showWarn } from "@/utils/toast";


const AdminDashboard = () => {

  const [activePage, setActivePage] = useState("overview");
  const context = useOutletContext<{ user: User } | null>();

  if (!context){
      showWarn("You are not authorized to access this page.");
    return <Navigate to="/userLogin"/>; 
  } 

    
  const { user } = context;
  const pages: Record<string, JSX.Element> = {
    overview: <Overview />,
    books: <BooksDetails user={user} />,
    reviews: <ReviewsDetails />,
    users: <UserDetails />,
  };

  return (
    <div className="flex pt-15 h-screen w-screen overflow-hidden">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 overflow-y-auto">{pages[activePage]}</main>
    </div>
  );
};

export default AdminDashboard;
