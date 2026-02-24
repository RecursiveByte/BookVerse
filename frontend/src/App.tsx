import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "@/components/common/Navbar";
import AppRouter from "./routes/AppRouter";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      
      <ToastContainer 
      position="top-right"
      autoClose={3000}
      theme="dark"
    
      />
      <AppRouter />
    </Router>
  );
};

export default App;