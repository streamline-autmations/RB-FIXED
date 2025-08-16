import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CompetitionProvider, useCompetition } from './context/CompetitionProvider';

// --- Keep all your existing page and component imports ---
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
// ... (all your other numerous page imports)
import CompetitionModal from './components/ui/CompetitionModal';
import ToastNotification from './common/ToastNotification';
import CompetitionTsAndCsPage from './pages/CompetitionTsAndCsPage';


const AppContent: React.FC = () => {
  // --- UPDATED: Using new state from the provider ---
  const { 
    isLoading,
    isRegistered,
    toastMessage, 
    showCongratsModal, 
    isRegistrationModalOpen,
    setRegistrationModalOpen,
  } = useCompetition();

  // --- UPDATED: Timer to open the modal for non-registered users ---
  useEffect(() => {
    // Only run the timer if loading is finished and the user is not yet registered
    if (!isLoading && !isRegistered) {
      const timer = setTimeout(() => {
        setRegistrationModalOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isLoading, isRegistered, setRegistrationModalOpen]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <AnimatePresence mode="wait">
          <Routes>
            {/* All your existing routes are preserved */}
            <Route path="/" element={<HomePage />} />
            {/* ... (all your other numerous routes) */}
            <Route path="/competition-rules" element={<CompetitionTsAndCsPage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />

      {/* --- This logic remains mostly the same --- */}
      <CompetitionModal
        isOpen={isRegistrationModalOpen}
        onClose={() => setRegistrationModalOpen(false)}
        showCongrats={showCongratsModal}
        onCloseCongrats={() => { /* This might need a function in the provider if used */}}
      />
      <ToastNotification message={toastMessage} />
    </div>
  );
};

// Your main App component structure is perfect and does not need to change.
function App() {
  return (
    <Router>
      <CompetitionProvider>
        <AppContent />
      </CompetitionProvider>
    </Router>
  );
}

export default App;
