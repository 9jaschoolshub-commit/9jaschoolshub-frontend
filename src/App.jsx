import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CourseSearch from "./pages/CourseSearch";
import UniversityDetails from "./pages/UniversityDetails";
import UniversityFinder from "./pages/UniversityFinder";
import Dashboard from "./pages/Dashboard";
import UniFooter from "./components/UniFooter";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UniNarbar from "./components/UniNavbar";

const AppContent = () => {
  const location = useLocation();

  return (
    <>
      {!location.pathname.startsWith("/university/") ? (
        <Navbar />
      ) : (
        <UniNarbar />
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CourseSearch />} />
        <Route path="/universities" element={<UniversityFinder />} />
        <Route path="/University/:id" element={<UniversityDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>

      {location.pathname.startsWith(
        "/courses"
      ) ? null : location.pathname.startsWith("/university/") ? (
        <UniFooter />
      ) : (
        <Footer />
      )}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
