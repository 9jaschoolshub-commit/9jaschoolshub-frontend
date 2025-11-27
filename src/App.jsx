import HomePage from "./pages/HomePage";
import CourseSearch from "./pages/CourseSearch";
import UniversityDetails from "./pages/UniversityDetails";
import UniversityFinder from "./pages/UniversityFinder";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import Header from "./components/global/Header";
import Footer from "./components/global/Footer";
import ScrollManager from "./components/global/ScrollManager";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const AppContent = () => {
  return (
    <>
      <Header />
      <ScrollManager>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CourseSearch />} />
          <Route path="/universities" element={<UniversityFinder />} />
          <Route path="/University/:id" element={<UniversityDetails />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </ScrollManager>
      <Footer />
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
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppContent />
      </Router>
    </QueryClientProvider>
  );
};

export default App;
