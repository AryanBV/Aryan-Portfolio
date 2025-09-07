import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import LoadingScreen from "./components/common/LoadingScreen";
import CustomCursor from "./components/common/CustomCursor";
import ScrollProgress from "./components/common/ScrollProgress";
import BackToTop from "./components/common/BackToTop";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading time for assets
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen />}
      
      {/* Custom Cursor - only on desktop */}
      <CustomCursor />
      
      {/* Scroll Progress Indicator */}
      <ScrollProgress />
      
      {/* Back to Top Button */}
      <BackToTop />
      
      {/* Main App */}
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;