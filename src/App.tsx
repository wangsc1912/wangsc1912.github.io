import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout";
import HomePage from "./components/Home/HomePage";
import PeoplePage from "./components/People/PeoplePage";
import PublicationsPage from "./components/Publications/PublicationsPage";
import TeachingPage from "./components/Teaching/TeachingPage";
import ServicePage from "./components/Service/ServicePage";

// App component: main application entry point
function App() {
  // Get current location object from React Router
  const location = useLocation();

  useEffect(() => {
    // Scroll to the top of the page on every route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/people" element={<PeoplePage />} />
        <Route path="/publications" element={<PublicationsPage />} />
        <Route path="/teaching" element={<TeachingPage />} />
        <Route path="/service" element={<ServicePage />} />
      </Routes>
    </Layout>
  );
}

// Wrap App with HashRouter to provide routing context
const AppWithRouter = () => (
  <HashRouter>
    <App />
  </HashRouter>
);

export default AppWithRouter;
