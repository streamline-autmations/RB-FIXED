import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// --- UPDATED: Added MapPin icon ---
import { Phone, Mail, Facebook, Instagram, MapPin } from 'lucide-react';
import Logo from './Logo';
import { useCompetition } from '../../context/CompetitionProvider';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const { findLogo, foundLogosCount } = useCompetition();

  const [isLogo1Found, setIsLogo1Found] = useState(false);
  const [isLogo4Found, setIsLogo4Found] = useState(false);

  useEffect(() => {
    const foundLogos = JSON.parse(localStorage.getItem('recklessbear_found_logos') || '[]');
    setIsLogo1Found(foundLogos.includes('golden-logo-1'));
    setIsLogo4Found(foundLogos.includes('golden-logo-4'));
  }, [foundLogosCount]);

  const handleLogo1Click = () => {
    findLogo('golden-logo-1');
  };

  const handleLogo4Click = (e: React.MouseEvent) => {
    if (!isLogo4Found) {
      e.preventDefault();
      findLogo('golden-logo-4');
    }
  };

  const isOnHomepage = location.pathname === '/';
  const shouldRenderGoldenLogo1 = isOnHomepage && !isLogo1Found;
  
  const isOnContactPage = location.pathname === '/contact';
  const shouldRenderGoldenLogo4 = isOnContactPage && !isLogo4Found;

  return (
    <footer className="bg-rb-gray-900 pt-16 pb-8 border-t border-rb-gray-800 relative overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Logo and Tagline */}
          <div className="flex flex-col relative items-start"> 
            {shouldRenderGoldenLogo1 ? (
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleLogo1Click}>
                <img id="golden-logo-1" src="/Golden-Logo.png" alt="Hidden Golden Logo" className="golden-logo-image z-20" style={{ width: '40px', height: '40px' }} />
                <img src="/rb_text_f.png" alt="RECKLESSBEAR" style={{ height: '50px', marginLeft: '10px', pointerEvents: 'none' }} />
              </div>
            ) : (
              <Logo size="small" />
            )}
            <p className="mt-4 text-rb-gray-400">ELEVATE YOUR GAME. DO IT RECKLESS.</p>
            {/* --- UPDATED: Social Icons --- */}
            <div className="flex mt-6 space-x-4">
              <a 
                href="https://www.facebook.com/Recklessbearfitness01" 
                target="_blank" 
                rel="noopener noreferrer" 
                onClick={handleLogo4Click}
                className="bg-rb-gray-800 p-2 rounded-full text-rb-gray-400 hover:text-rb-white hover:bg-rb-red transition-all duration-300"
              >
                {shouldRenderGoldenLogo4 ? (
                  <img id="golden-logo-4" src="/Golden-Logo.png" alt="Hidden Golden Logo" className="golden-logo-image" style={{ width: '20px', height: '20px', opacity: 1 }} />
                ) : (
                  <Facebook size={20} />
                )}
              </a>
              <a href="https://www.instagram.com/recklessbearapparel/" target="_blank" rel="noopener noreferrer" className="bg-rb-gray-800 p-2 rounded-full text-rb-gray-400 hover:text-rb-white hover:bg-rb-red transition-colors duration-300">
                <Instagram size={20} />
              </a>
              {/* --- ADDED: Google Maps Icon --- */}
              <a href="https://www.google.com/maps/place/Johannesburg/" target="_blank" rel="noopener noreferrer" className="bg-rb-gray-800 p-2 rounded-full text-rb-gray-400 hover:text-rb-white hover:bg-rb-red transition-colors duration-300">
                <MapPin size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl mb-4 text-rb-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">Home</Link></li>
              <li><Link to="/products" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">Products</Link></li>
              <li><Link to="/catalogues/2025" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">Catalogues</Link></li>
              <li><Link to="/track-order" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">Track Order</Link></li>
              <li><Link to="/about" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">About Us</Link></li>
              <li><Link to="/contact" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">Contact Us</Link></li>
            </ul>
          </div>
          
          {/* Our Products */}
          <div>
            <h3 className="text-xl mb-4 text-rb-white">Our Products</h3>
            <ul className="space-y-2">
              <li><Link to="/products/school-team-sports" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">School & Team Sports</Link></li>
              <li><Link to="/products/other-sports-clubs" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">Other Sports & Clubs</Link></li>
              <li><Link to="/products/corporate-staff" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">Corporate & Staff Apparel</Link></li>
              <li><Link to="/products/gym-fitness" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">Gym & Fitness Apparel</Link></li>
              <li><Link to="/products/accessories-branding" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">Accessories & Branding</Link></li>
              <li><Link to="/products" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">View All Products</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl mb-4 text-rb-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="space-y-2">
                <p className="text-rb-gray-300 font-medium">Etienne Viljoen</p>
                <a href="tel:0823163330" className="flex items-center text-rb-gray-400 hover:text-rb-red transition-colors duration-200"><Phone size={18} className="mr-2" /> 082 316 3330</a>
                <a href="mailto:etienne@recklessbear.co.za" className="flex items-center text-rb-gray-400 hover:text-rb-red transition-colors duration-200"><Mail size={18} className="mr-2" /> etienne@recklessbear.co.za</a>
              </div>
              <div className="space-y-2 pt-3 border-t border-rb-gray-800">
                <p className="text-rb-gray-300 font-medium">Janco Tiedt</p>
                <a href="tel:0766890383" className="flex items-center text-rb-gray-400 hover:text-rb-red transition-colors duration-200"><Phone size={18} className="mr-2" /> 076 689 0383</a>
                <a href="mailto:janco@recklessbear.co.za" className="flex items-center text-rb-gray-400 hover:text-rb-red transition-colors duration-200"><Mail size={18} className="mr-2" /> janco@recklessbear.co.za</a>
              </div>
              {/* --- ADDED: Zander Steyn's Contact Details --- */}
              <div className="space-y-2 pt-3 border-t border-rb-gray-800">
                <p className="text-rb-gray-300 font-medium">Zander Steyn</p>
                <a href="tel:0823841522" className="flex items-center text-rb-gray-400 hover:text-rb-red transition-colors duration-200"><Phone size={18} className="mr-2" /> 082 384 1522</a>
                <a href="mailto:zander@recklessbear.co.za" className="flex items-center text-rb-gray-400 hover:text-rb-red transition-colors duration-200"><Mail size={18} className="mr-2" /> zander@recklessbear.co.za</a>
              </div>
              {/* --- REMOVED: Johannesburg Text Link --- */}
            </div>
          </div>
        </div>
        
        {/* Copyright and other footer content... */}
        <div className="border-t border-rb-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <p className="text-rb-gray-500 text-sm">© {currentYear} RecklessBear. All rights reserved.</p>
            <p className="text-rb-gray-500 text-sm">Designed by <a href="https://streamline-automations.agency" target="_blank" rel="noopener noreferrer" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">Streamline Automations</a></p>
          </div>
          <div className="mt-4 md:mt-0">
            {/* --- UPDATED: Privacy Policy Link --- */}
            <Link to="/privacy-policy" className="text-sm text-rb-gray-500 hover:text-rb-white transition-colors duration-200 mr-6">Privacy Policy</Link>
            <a href="#terms" className="text-sm text-rb-gray-500 hover:text-rb-white transition-colors duration-200">Terms of Service</a>
          </div>
        </div>
      </div>
      
      <script dangerouslySetInnerHTML={{ __html: `if(!localStorage.getItem("lead_id")){const e=(Date.now().toString(36)+Math.random().toString(36).substring(2,8)).toUpperCase();localStorage.setItem("lead_id",e)}const lead_id=localStorage.getItem("lead_id");fetch("https://ipapi.co/json/").then(e=>e.json()).then(e=>{const t=\`\${e.ip} | \${e.city}, \${e.region}, \${e.country_name}\`;setInterval(()=>{const e=document.querySelector('input[name="location-data"]'),o=document.querySelector('input[name="lead_id"]');e&&(e.value=t),o&&(o.value=lead_id)},300);const o=()=>{document.querySelectorAll("iframe[data-cal-embed], iframe#cal-embed").forEach(e=>{const t=e.src||e.getAttribute("data-cal-link")||"";if(t.includes("cal.com")&&!t.includes("metadata[lead_id]")){const o=t.includes("?")?"&":"?";e.src=\`\${t}\${o}metadata[lead_id]=\${lead_id}\`}}),document.querySelectorAll("[data-cal-link]").forEach(e=>{const t=e.getAttribute("data-cal-link")||"";if(t.includes("cal.com")&&!t.includes("metadata[lead_id]")){const o=t.includes("?")?"&":"?";e.setAttribute("data-cal-link",\`\${t}\${o}metadata[lead_id]=\${lead_id}\`)}})};o(),new MutationObserver(o).observe(document.body,{childList:!0,subtree:!0})}).catch(e=>console.log("Location fetch failed:",e));` }} />
    </footer>
  );
};

export default Footer;
