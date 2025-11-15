import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import HomeContent from "./Components/HomeContent/HomeContent";
import Footer from "./Components/Footer/Footer";
import Upload from "./Components/Upload/Upload";
import Login from "./Components/Login/Login";
import Contact from "./Components/Contact/Contact";
import Symptoms from "./Components/Symptoms/symptoms"; 
import Prevention from "./Components/Preventation/preventation";
import "./App.css";
import ResultPage from "./Components/Result/Result";




function App() {
  return (
    <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomeContent />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/Contact" element={<Contact />} />
         <Route path="/result" element={<ResultPage />} />

          <Route path="/login" element={<Login />} />
          < Route path="/symptoms" element={<Symptoms />} />
          < Route path="/prevention" element={<Prevention />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;