import { useState, type JSX } from "react"
import Overview from "./Overview"
import Sidebar from "./SideBar"
import BooksDetails from "./BooksDetails"
import UserDetails from "./UserDetails"
import ReviewsDetails from "./ReviewsDetails"

const pages: Record<string, JSX.Element> = {
  overview: <Overview />,
  books: <BooksDetails />,
  reviews: <ReviewsDetails />,
  users: <UserDetails />,
}

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState("overview")

  return (
    <div className="flex pt-15 h-screen w-screen overflow-hidden">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />
      <main className="flex-1 overflow-y-auto">
        {pages[activePage]}
      </main>
    </div>
  )
}

export default AdminDashboard