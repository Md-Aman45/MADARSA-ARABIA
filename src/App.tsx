// src/App.tsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LanguageProvider } from "./contexts/LanguageContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/pages/HomePage";
import AboutPage from "./components/pages/AboutPage";
import ProgramsPage from "./components/pages/ProgramsPage";
import ResourcesPage from "./components/pages/ResourcesPage";
import NoticePage from "./components/pages/NoticePage";
import ContactPage from "./components/pages/ContactPage";
import GalleryPage from "./components/pages/GalleryPage";
import "./i18n";

const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  in: { opacity: 1, y: 0, scale: 1 },
  out: { opacity: 0, y: -20, scale: 0.98 },
};

const pageTransition = { type: "tween", ease: "anticipate", duration: 0.6 };

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (mainRef.current) mainRef.current.scrollTop = 0;
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <HomePage onPageChange={setCurrentPage} />;
      case "about":
        return <AboutPage onPageChange={setCurrentPage} />;
      case "programs":
        return <ProgramsPage onPageChange={setCurrentPage} />;
      case "resources":
        return <ResourcesPage onPageChange={setCurrentPage} />;
      case "notice":
        return <NoticePage onPageChange={setCurrentPage} />;
      case "contact":
        return <ContactPage onPageChange={setCurrentPage} />;
      case 'gallery':
        return <GalleryPage />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col">
        <Header currentPage={currentPage} onPageChange={setCurrentPage} />
        <main ref={mainRef} className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer onPageChange={setCurrentPage} />
      </div>
    </LanguageProvider>
  );
}
