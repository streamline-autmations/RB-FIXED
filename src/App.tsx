import React, { useState } from 'react'; // Keep useState
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// --- ORIGINAL IMPORTS (KEEP ALL OF THESE) ---
import CompetitionModal from './components/ui/CompetitionModal';
// The old useCompetitionModal hook will be removed, as the CompetitionProvider will manage this.
// import { useCompetitionModal } from './hooks/useCompetitionModal'; // This line will be removed or commented out

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import GalleryPage from './pages/GalleryPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProductsPage from './pages/ProductsPage';
import TrackOrderPage from './pages/TrackOrderPage';

import allProducts from './data/productsData';

// All your existing product page imports
import RugbyKitsPage from './pages/products/RugbyKitsPage';
import RugbyJerseysPage from './pages/products/RugbyJerseysPage';
import RugbyShortsPage from './pages/products/RugbyShortsPage';
import RugbySocksPage from './pages/products/RugbySocksPage';
import RugbyWarmupShortPage from './pages/products/RugbyWarmupShortPage';
import RugbyWarmupLongPage from './pages/products/RugbyWarmupLongPage';

import NetballKitsPage from './pages/products/NetballKitsPage';
import NetballDressPage from './pages/products/NetballDressPage';
import NetballSocksPage from './pages/products/NetballSocksPage';
import NetballShortsPage from './pages/products/NetballShortsPage';
import NetballBibsPage from './pages/products/NetballBibsPage';
import NetballHotPantsPage from './pages/products/NetballHotPantsPage';
import NetballSkortPage from './pages/products/NetballSkortPage';
import NetballLadiesVestPage from './pages/products/NetballLadiesVestPage';

import HockeyKitsPage from './pages/products/HockeyKitsPage';
import HockeyShirtPage from './pages/products/HockeyShirtPage';
import HockeySocksPage from './pages/products/HockeySocksPage';
import HockeyDressPage from './pages/products/HockeyDressPage';
import HockeyShortsPage from './pages/products/HockeyShortsPage';
import HockeyTShirtShortPage from './pages/products/HockeyTShirtShortPage';
import HockeyTShirtLongPage from './pages/products/HockeyTShirtLongPage';
import HockeyMensVestPage from './pages/products/HockeyMensVestPage';
import HockeyLadiesVestPage from './pages/products/HockeyLadiesVestPage';

import SoccerKitsPage from './pages/products/SoccerKitsPage';
import SoccerJerseyPage from './pages/products/SoccerJerseyPage';
import SoccerShortsPage from './pages/products/SoccerShortsPage';
import SoccerSocksPage from './pages/products/SoccerSocksPage';
import CricketKitsPage from './pages/products/CricketKitsPage';
import CricketShirtPage from './pages/products/CricketShirtPage';
import CricketPantsPage from './pages/products/CricketPantsPage';
import CricketLongGolferPage from './pages/products/CricketLongGolferPage';

import AthleticsKitsPage from './pages/products/AthleticsKitsPage';
import AthleticsShortTShirtPage from './pages/products/AthleticsShortTShirtPage';
import AthleticsLongTShirtPage from './pages/products/AthleticsLongTShirtPage';
import AthleticsCropTopPage from './pages/products/AthleticsCropTopPage';
import AthleticsMensVestPage from './pages/products/AthleticsMensVestPage';
import AthleticsLadiesVestPage from './pages/products/AthleticsLadiesVestPage';
import AthleticsShortsPage from './pages/products/AthleticsShortsPage';
import AthleticsLeggingsPage from './pages/products/AthleticsLeggingsPage';

// Gym & Fitness Product Pages
import GymShirtPage from './pages/products/GymShirtPage';
import GymHoodiePage from './pages/products/GymHoodiePage';
import GymVestPage from './pages/products/GymVestPage';
import GymShortsPage from './pages/products/GymShortsPage';
import GymCropTopPage from './pages/products/GymCropTopPage';
import GymTShirtLongPage from './pages/products/GymTShirtLongPage';
import GymPufferJacketPage from './pages/products/GymPufferJacketPage';
import GymTracksuitPantsPage from './pages/products/GymTracksuitPantsPage';

// Schoolwear Product Pages
import SchoolHoodiePage from './pages/products/SchoolHoodiePage';
import SchoolPufferPage from './pages/products/SchoolPufferPage';
import SchoolSoftshellPage from './pages/products/SchoolSoftshellPage';
import SchoolTShirtShortPage from './pages/products/SchoolTShirtShortPage';
import SchoolTShirtLongPage from './pages/products/SchoolTShirtLongPage';
import SchoolGolferShortPage from './pages/products/SchoolGolferShortPage';
import SchoolGolferLongPage from './pages/products/SchoolGolferLongPage';
import SchoolTracksuitPantsPage from './pages/products/SchoolTracksuitPantsPage';

import MatricJacketsPage from './pages/products/MatricJacketsPage';
import TracksuitsPage from './pages/products/TracksuitsPage';

import GolfApparelPage from './pages/products/GolfApparelPage';
import GolfShirtPage from './pages/products/GolfShirtPage';
import GolfDressPage from './pages/products/GolfDressPage';
import GolfZipTopPage from './pages/products/GolfZipTopPage';
import CyclingShirtPage from './pages/products/CyclingShirtPage';
import FishingHoodiePage from './pages/products/FishingHoodiePage';
import FishingTeeLongPage from './pages/products/FishingTeeLongPage';
import FishingTeeShortPage from './pages/products/FishingTeeShortPage';
import FishingZipTopPage from './pages/products/FishingZipTopPage';
import DartsShirtsPage from './pages/products/DartsShirtsPage';
import HuntingHoodiePage from './pages/products/HuntingHoodiePage';
import HuntingPufferLongPage from './pages/products/HuntingPufferLongPage';
import HuntingPufferShortPage from './pages/products/HuntingPufferShortPage';
import HuntingZipTopPage from './pages/products/HuntingZipTopPage';
import HuntingSoftshellPage from './pages/products/HuntingSoftshellPage';
import StaffUniformsPage from './pages/products/StaffUniformsPage';
import CorporateShirtPage from './pages/products/CorporateShirtPage';
import CorporatePufferShortPage from './pages/products/CorporatePufferShortPage';
import CorporatePufferLongPage from './pages/products/CorporatePufferLongPage';
import CorporateSoftshellPage from './pages/products/CorporateSoftshellPage';
import CorporateZipTopPage from './pages/products/CorporateZipTopPage';
import CapPage from './pages/products/CapPage';
import VisorCapPage from './pages/products/VisorCapPage';
import BackpackPage from './pages/products/BackpackPage';
import LeggingsPage from './pages/products/LeggingsPage';
import TabSocksPage from './pages/products/TabSocksPage';
import AnkletSocksPage from './pages/products/AnkletSocksPage';
import PremiumCrewSocksPage from './pages/products/PremiumCrewSocksPage';
import RibbedCrewSocksPage from './pages/products/RibbedCrewSocksPage';
import PromoCrewSocksPage from './pages/products/PromoCrewSocksPage';
import KneeHighSocksPage from './pages/products/KneeHighSocksPage';
import SweatbandsPage from './pages/products/SweatbandsPage';
import ArmSleevesPage from './pages/products/ArmSleevesPage';
import LegSleevesPage from './pages/products/LegSleevesPage';

// Category Pages
import CategoryPage from './pages/CategoryPage';
import SubcategoryPage from './pages/SubcategoryPage';
import GenericProductPage from './pages/products/GenericProductPage';

// Catalogue Pages - using simplified structure
import BaseCataloguePage from './components/shared/BaseCataloguePage';

// Simplified catalogue pages (keep these as they are)
const MainCataloguePage = () => (
  <BaseCataloguePage
    title="2025–2026 Catalogue"
    description="Explore our full collection of high-performance sportswear, uniforms, and branded apparel."
    previewImage="/rb-about.png"
    collectionName="2025–2026 Collection"
    collectionSubtitle="Complete product range and specifications"
    features={[
      'School & Team Sports Kits (Rugby, Netball, Cricket, Hockey, Athletics)',
      'Other Sports & Clubs (Soccer, Golf, Darts, Fishing, Cycling, Hunting)',
      'Gym & Fitness Apparel',
      'Schoolwear & Matric Apparel',
      'Corporate & Staff Uniforms',
      'Accessories & Branding (Socks, Caps, Bags, Branding Items)',
      'Sizing Charts & Customization Options'
    ]}
    pages="48 pages"
    fileSize="12.5 MB"
    ctaTitle="Need Custom Apparel?"
    downloadUrl="https://drive.google.com/uc?export=download&id=1-8T8g4HUj2lSZyai575Or66A5cTb0gWh"
    flipbookUrl="https://heyzine.com/flip-book/1f122372a4.html"
  />
);

const MatricCataloguePage = () => (
  <BaseCataloguePage
    title="Matric Apparel Catalogue"
    description="Celebrate your matriculation with our premium custom matric jackets and apparel"
    previewImage="https://images.pexels.com/photos/6311475/pexels-photo-6311475.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=2"
    collectionName="2025–2026 Matric Collection"
    collectionSubtitle="Premium jackets and customization options"
    features={['Standard Matric Jackets', 'Premium Matric Jackets', 'Embroidery Options', 'Color Combinations', 'Sizing Guide', 'Ordering Process']}
    pages="32 pages"
    fileSize="8.2 MB"
    ctaTitle="Ready to Order Your Matric Jackets?"
    downloadUrl="https://drive.google.com/uc?export=download&id=1-8T8g4HUj2lSZyai575Or66A5cTb0gWh"
    flipbookUrl="https://heyzine.com/flip-book/1f122372a4.html"
  />
);

// --- NEW IMPORTS FOR COMPETITION ---
import ToastNotification from './components/common/ToastNotification'; // New component
import { CompetitionProvider, useCompetition } from './context/CompetitionProvider'; // New context
// --- END NEW IMPORTS ---


// The main App component will now wrap the Router and CompetitionProvider
function App() {
  return (
    <Router>
      <CompetitionProvider> {/* Wrap the entire application with CompetitionProvider */}
        <AppContent /> {/* All your main app content will be in AppContent */}
      </CompetitionProvider>
    </Router>
  );
}

// --- NEW: AppContent component to contain your main application structure ---
// This component will now consume the CompetitionContext
const AppContent: React.FC = () => {
  // Use the useCompetition hook to access competition state and functions
  const { toastMessage, showCongratsModal, setCongratsModalOpen } = useCompetition();

  // State to manage when to open the main competition registration modal
  const [isCompetitionModalOpen, setIsCompetitionModalOpen] = useState(false);

  // Function to open the main competition registration modal
  const openCompetitionModal = () => {
    setIsCompetitionModalOpen(true);
  };

  // Function to close the main competition registration modal
  const closeCompetitionModal = () => {
    setIsCompetitionModalOpen(false);
  };

  // This function will be passed to CompetitionModal to close the congrats modal
  const handleCloseCongratsModal = () => {
    setCongratsModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <AnimatePresence mode="wait">
          <Routes>
            {/* All your existing Route components go here, exactly as they were */}
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/track-order" element={<TrackOrderPage />} />
            <Route path="/products" element={<ProductsPage />} />
            
            <Route path="/products/:categorySlug" element={<CategoryPage />} />
            
            <Route path="/products/rugby" element={<SubcategoryPage />} />
            <Route path="/products/netball" element={<SubcategoryPage />} />
            <Route path="/products/cricket" element={<SubcategoryPage />} />
            <Route path="/products/hockey" element={<SubcategoryPage />} />
            <Route path="/products/athletics" element={<SubcategoryPage />} />
            <Route path="/products/soccer" element={<SubcategoryPage />} />
            <Route path="/products/golf" element={<SubcategoryPage />} />
            <Route path="/products/fishing" element={<SubcategoryPage />} />
            <Route path="/products/hunting" element={<HuntingHoodiePage />} />
            <Route path="/products/cycling" element={<SubcategoryPage />} />
            <Route path="/products/darts" element={<SubcategoryPage />} />
            <Route path="/products/corporate" element={<SubcategoryPage />} />
            <Route path="/products/fitness" element={<SubcategoryPage />} />
            <Route path="/products/tracksuits-hoodies" element={<SubcategoryPage />} />
            <Route path="/products/tshirts-golfers" element={<SubcategoryPage />} />
            <Route path="/products/school-jackets" element={<SubcategoryPage />} />
            <Route path="/products/female-apparel" element={<SubcategoryPage />} />
            <Route path="/products/socks" element={<SubcategoryPage />} />
            <Route path="/products/headwear" element={<SubcategoryPage />} />
            <Route path="/products/bags" element={<SubcategoryPage />} />
            <Route path="/products/warmup-training" element={<SubcategoryPage />} />
            <Route path="/products/sleeves-accessories" element={<SubcategoryPage />} />
            
            <Route path="/products/rugby-kits" element={<RugbyKitsPage />} />
            <Route path="/products/netball-kits" element={<NetballKitsPage />} />
            <Route path="/products/hockey-kits" element={<HockeyKitsPage />} />
            <Route path="/products/soccer-kits" element={<SoccerKitsPage />} />
            <Route path="/products/cricket-kits" element={<CricketKitsPage />} />
            <Route path="/products/athletics-kits" element={<AthleticsKitsPage />} />
            <Route path="/products/golf-apparel" element={<GolfApparelPage />} />
            <Route path="/products/staff-uniforms" element={<StaffUniformsPage />} />
            
            <Route path="/products/gym-shirt" element={<GymShirtPage />} />
            <Route path="/products/gym-hoodie" element={<GymHoodiePage />} />
            <Route path="/products/gym-vest" element={<GymVestPage />} />
            <Route path="/products/gym-shorts" element={<GymShortsPage />} />
            <Route path="/products/gym-crop-top" element={<GymCropTopPage />} />
            <Route path="/products/gym-tshirt-long" element={<GymTShirtLongPage />} />
            <Route path="/products/gym-puffer-jacket" element={<GymPufferJacketPage />} />
            <Route path="/products/gym-tracksuit-pants" element={<GymTracksuitPantsPage />} />
            
            <Route path="/products/school-hoodie" element={<SchoolHoodiePage />} />
            <Route path="/products/school-puffer" element={<SchoolPufferPage />} />
            <Route path="/products/school-softshell" element={<SchoolSoftshellPage />} />
            <Route path="/products/school-tshirt-short" element={<SchoolTShirtShortPage />} />
            <Route path="/products/school-tshirt-long" element={<SchoolTShirtLongPage />} />
            
            <Route path="/products/rugby-jerseys" element={<RugbyJerseysPage />} />
            <Route path="/products/rugby-shorts" element={<RugbyShortsPage />} />
            <Route path="/products/rugby-socks" element={<RugbySocksPage />} />
            <Route path="/products/netball-dress" element={<NetballDressPage />} />
            <Route path="/products/netball-socks" element={<NetballSocksPage />} />
            <Route path="/products/netball-shorts" element={<NetballShortsPage />} />
            <Route path="/products/netball-bibs" element={<NetballBibsPage />} />
            <Route path="/products/hockey-shirt" element={<HockeyShirtPage />} />
            <Route path="/products/hockey-socks" element={<HockeySocksPage />} />
            <Route path="/products/soccer-jersey" element={<SoccerJerseyPage />} />
            <Route path="/products/soccer-shorts" element={<SoccerShortsPage />} />
            <Route path="/products/soccer-socks" element={<SoccerSocksPage />} />
            <Route path="/products/golf-shirt" element={<GolfShirtPage />} />
            <Route path="/products/golf-dress" element={<GolfDressPage />} />
            <Route path="/products/golf-zip-top" element={<GolfZipTopPage />} />
            <Route path="/products/cycling-shirt" element={<CyclingShirtPage />} />
            <Route path="/products/fishing-hoodie" element={<FishingHoodiePage />} />
            <Route path="/products/fishing-tee-long" element={<FishingTeeLongPage />} />
            <Route path="/products/fishing-tee-short" element={<FishingTeeShortPage />} />
            <Route path="/products/fishing-zip-top" element={<FishingZipTopPage />} />
            <Route path="/products/darts-shirts" element={<DartsShirtsPage />} />
            <Route path="/products/hunting-hoodie" element={<HuntingHoodiePage />} />
            <Route path="/products/hunting-puffer-long" element={<HuntingPufferLongPage />} />
            <Route path="/products/hunting-puffer-short" element={<HuntingPufferShortPage />} />
            <Route path="/products/hunting-zip-top" element={<HuntingZipTopPage />} />
            <Route path="/products/hunting-softshell" element={<HuntingSoftshellPage />} />
            <Route path="/products/cricket-shirt" element={<CricketShirtPage />} />
            <Route path="/products/cricket-pants" element={<CricketPantsPage />} />
            <Route path="/products/tracksuits" element={<TracksuitsPage />} />
            
            <Route path="/products/gym-shirt" element={<GymShirtPage />} />
            <Route path="/products/gym-hoodie" element={<GymHoodiePage />} />
            <Route path="/products/gym-vest" element={<GymVestPage />} />
            <Route path="/products/gym-shorts" element={<GymShortsPage />} />
            <Route path="/products/gym-crop-top" element={<GymCropTopPage />} />
            <Route path="/products/gym-tshirt-long" element={<GymTShirtLongPage />} />
            <Route path="/products/gym-puffer-jacket" element={<GymPufferJacketPage />} />
            <Route path="/products/gym-tracksuit-pants" element={<GymTracksuitPantsPage />} />
            <Route path="/products/leggings" element={<LeggingsPage />} />
            <Route path="/products/corporate-shirt" element={<CorporateShirtPage />} />
            <Route path="/products/corporate-puffer-short" element={<CorporatePufferShortPage />} />
            <Route path="/products/corporate-puffer-long" element={<CorporatePufferLongPage />} />
            <Route path="/products/corporate-softshell" element={<CorporateSoftshellPage />} />
            <Route path="/products/corporate-zip-top" element={<CorporateZipTopPage />} />
            
            <Route path="/products/school-hoodie" element={<SchoolHoodiePage />} />
            <Route path="/products/school-puffer" element={<SchoolPufferPage />} />
            <Route path="/products/school-softshell" element={<SchoolSoftshellPage />} />
            <Route path="/products/school-tshirt-short" element={<SchoolTShirtShortPage />} />
            <Route path="/products/school-tshirt-long" element={<SchoolTShirtLongPage />} />
            <Route path="/products/school-golfer-short" element={<SchoolGolferShortPage />} />
            <Route path="/products/school-golfer-long" element={<SchoolGolferLongPage />} />
            <Route path="/products/school-tracksuit-pants" element={<SchoolTracksuitPantsPage />} />
            <Route path="/products/cap" element={<CapPage />} />
            <Route path="/products/visor-cap" element={<VisorCapPage />} />
            <Route path="/products/backpack" element={<BackpackPage />} />
            <Route path="/products/tab-socks" element={<TabSocksPage />} />
            <Route path="/products/anklet-socks" element={<AnkletSocksPage />} />
            <Route path="/products/premium-crew-socks" element={<PremiumCrewSocksPage />} />
            <Route path="/products/ribbed-crew-socks" element={<RibbedCrewSocksPage />} />
            <Route path="/products/promo-crew-socks" element={<PromoCrewSocksPage />} />
            <Route path="/products/knee-high-socks" element={<KneeHighSocksPage />} />
            <Route path="/products/sweatbands" element={<SweatbandsPage />} />
            <Route path="/products/arm-sleeves" element={<ArmSleevesPage />} />
            <Route path="/products/leg-sleeves" element={<LegSleevesPage />} />
            
            <Route path="/products/rugby-warmup-short" element={<RugbyWarmupShortPage />} />
            <Route path="/products/rugby-warmup-long" element={<RugbyWarmupLongPage />} />
            
            <Route path="/products/netball-hotpants" element={<NetballHotPantsPage />} />
            <Route path="/products/netball-skort" element={<NetballSkortPage />} />
            <Route path="/products/netball-vest-ladies" element={<NetballLadiesVestPage />} />
            
            <Route path="/products/cricket-golfer-long" element={<CricketLongGolferPage />} />
            
            <Route path="/products/hockey-dress" element={<HockeyDressPage />} />
            <Route path="/products/hockey-shorts" element={<HockeyShortsPage />} />
            <Route path="/products/hockey-tshirt-short" element={<HockeyTShirtShortPage />} />
            <Route path="/products/hockey-tshirt-long" element={<HockeyTShirtLongPage />} />
            <Route path="/products/hockey-vest-mens" element={<HockeyMensVestPage />} />
            <Route path="/products/hockey-vest-ladies" element={<HockeyLadiesVestPage />} />
            
            <Route path="/products/athletics-tshirt-short" element={<AthleticsShortTShirtPage />} />
            <Route path="/products/athletics-tshirt-long" element={<AthleticsLongTShirtPage />} />
            <Route path="/products/athletics-crop-top" element={<AthleticsCropTopPage />} />
            <Route path="/products/athletics-vest-mens" element={<AthleticsMensVestPage />} />
            <Route path="/products/athletics-vest-ladies" element={<AthleticsLadiesVestPage />} />
            <Route path="/products/athletics-shorts" element={<AthleticsShortsPage />} />
            <Route path="/products/athletics-leggings" element={<AthleticsLeggingsPage />} />
            
            <Route path="/catalogues/2025" element={<MainCataloguePage />} />
            <Route path="/catalogues/matric" element={<MatricCataloguePage />} />
            <Route path="/catalogues/*" element={<MainCataloguePage />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />

      {/* --- NEW: Competition Modals and Toast --- */}
      {/* Example button to open competition modal (for testing, you can remove this later) */}
      <button 
        onClick={openCompetitionModal} 
        className="fixed bottom-20 right-4 bg-yellow-500 text-black p-3 rounded-full shadow-lg z-50"
        style={{ zIndex: 1000 }} // Ensure it's above other content
      >
        Enter Comp
      </button>

      {/* Render the CompetitionModal */}
      <CompetitionModal
        isOpen={isCompetitionModalOpen}
        onClose={closeCompetitionModal}
        showCongrats={showCongratsModal} // Pass the state from context
        onCloseCongrats={handleCloseCongratsModal} // Pass the close handler
      />

      {/* Render the Toast Notification */}
      <ToastNotification message={toastMessage} />
      {/* --- END NEW --- */}
    </div>
  );
}

export default App;
