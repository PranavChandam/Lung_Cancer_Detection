import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import HomeContent from "./Components/HomeContent/HomeContent";
import Footer from "./Components/Footer/Footer";
import Upload from "./Components/Upload/Upload";
import Login from "./Components/Login/Login";
import Contact from "./Components/Contact/Contact";
import Symptoms from "./Components/Symptoms/symptoms";
import Prevention from "./Components/Preventation/preventation";
import Research from "./Components/Research/Research";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import Result from "./Components/Result/Result";   
import "./App.css";

function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/upload"
            element={
              <ProtectedRoute>
                <Upload />
              </ProtectedRoute>
            }
          />

          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <Contact />
              </ProtectedRoute>
            }
          />

          <Route path="/symptoms" element={<Symptoms />} />
          <Route path="/prevention" element={<Prevention />} />
          <Route path="/research" element={<Research />} />

          
          <Route path="/result" element={<Result />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
