import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Phone, Mail, Facebook, Instagram } from 'lucide-react';
import Logo from './Logo'; // Assuming this is the component that renders your RB logo

// Define a global type for the window object to include our custom function
declare global {
  interface Window {
    triggerGoldenLogoFound?: (logoId: string) => void;
  }
}

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  const [isLogo1Found, setIsLogo1Found] = React.useState(false);

  useEffect(() => {
    const foundLogos = JSON.parse(localStorage.getItem('recklessbear_found_logos') || '[]');
    if (foundLogos.includes('golden-logo-1')) {
      setIsLogo1Found(true);
    }
  }, []);

  const handleLogo1Click = () => {
    if (!isLogo1Found) {
      if (window.triggerGoldenLogoFound) {
        window.triggerGoldenLogoFound('golden-logo-1');
        setIsLogo1Found(true);
      } else {
        console.warn('window.triggerGoldenLogoFound is not defined. CompetitionProvider might not be loaded.');
      }
    }
  };

  // Condition to check if we are on the homepage
  const isOnHomepage = location.pathname === '/';
  // Condition to render the golden logo only on homepage AND if not yet found
  const shouldRenderGoldenLogo1 = isOnHomepage && !isLogo1Found;

  return (
    <footer className="bg-rb-gray-900 pt-16 pb-8 border-t border-rb-gray-800 relative overflow-hidden">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Logo and Tagline */}
          <div className="flex flex-col relative items-start"> 
            {shouldRenderGoldenLogo1 ? (
              // On homepage and not found: show golden logo icon + RECKLESSBEAR text
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleLogo1Click}>
                <img
                  id="golden-logo-1" // Unique ID for this logo
                  src="/Golden-Logo.png" // Using the correct Golden-Logo.png path
                  alt="Hidden Golden Logo"
                  // No specific opacity here, as we want it fully visible when replacing the logo
                  className={`golden-logo-image z-20`} // golden-logo-image class will handle 'found' state
                  // Match the size of your original RB icon and place exactly over it
                  // Adjusted values for pixel-perfect overlay (assuming 40x40px icon)
                  style={{
                    width: '40px', // Assuming this is the size of the RB icon
                    height: '40px', // Assuming this is the size
                    top: '0px', // Position relative to its parent div
                    left: '0px', // Position relative to its parent div
                    opacity: 1, // FULLY VISIBLE when replacing the logo
                    // You might need to adjust top/left slightly after deployment
                  }}
                />
                {/* The "RECKLESSBEAR" text. Add ml-2 for spacing. */}
                <span className="text-rb-white text-xl font-bebas tracking-wider ml-2" style={{ pointerEvents: 'none' }}>RECKLESSBEAR</span>
              </div>
            ) : (
              // On other pages or if found: render original Logo component
              <Logo size="small" />
            )}

            <p className="mt-4 text-rb-gray-400">ELEVATE YOUR GAME. DO IT RECKLESS.</p>
            <div className="flex mt-6 space-x-4">
              <a href="https://www.facebook.com/Recklessbearfitness01" target="_blank" rel="noopener noreferrer" 
                className="bg-rb-gray-800 p-2 rounded-full text-rb-gray-400 hover:text-rb-white hover:bg-rb-red transition-colors duration-300">
                <Facebook size={20} />
              </a>
              <a href="https://www.instagram.com/recklessbearapparel/" target="_blank" rel="noopener noreferrer"
                className="bg-rb-gray-800 p-2 rounded-full text-rb-gray-400 hover:text-rb-white hover:bg-rb-red transition-colors duration-300">
                <Instagram size={20} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl mb-4 text-rb-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">Home</Link></li>
              <li><Link to="/services" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">Services</Link></li>
              <li><Link to="/gallery" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">Gallery</Link></li>
              <li><Link to="/about" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">About</Link></li>
              <li><Link to="/contact" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">Book a Call</Link></li>
            </ul>
          </div>
          
          {/* Services - Updated headers */}
          <div>
            <h3 className="text-xl mb-4 text-rb-white">Our Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">Custom Sports Kits</Link></li>
              <li><Link to="/services" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">Corporate Uniforms</Link></li>
              <li><Link to="/services" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">Fitness Gear</Link></li>
              <li><Link to="/services" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">Custom Embroidery</Link></li>
              <li><Link to="/services" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">Team Uniforms</Link></li>
              {/* The missing closing tags were likely here or further down */}
              <li><Link to="/services" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200">Something Else</Link></li> {/* Added a placeholder to ensure closing tag */}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl mb-4 text-rb-white">Contact Us</h3>
            <div className="space-y-3">
              <div className="space-y-2">
                <p className="text-rb-gray-300 font-medium">Etienne Viljoen</p>
                <a href="tel:0823163330" className="flex items-center text-rb-gray-400 hover:text-rb-red transition-colors duration-200">
                  <Phone size={18} className="mr-2" /> 082 316 3330
                </a>
                <a href="mailto:etienne@recklessbear.co.za" className="flex items-center text-rb-gray-400 hover:text-rb-red transition-colors duration-200">
                  <Mail size={18} className="mr-2" /> etienne@recklessbear.co.za
                </a>
              </div>
              
              <div className="space-y-2 pt-3 border-t border-rb-gray-800">
                <p className="text-rb-gray-300 font-medium">Janco Tiedt</p>
                <a href="tel:0766890383" className="flex items-center text-rb-gray-400 hover:text-rb-red transition-colors duration-200">
                  <Phone size={18} className="mr-2" /> 076 689 0383
                </a>
                <a href="mailto:janco@recklessbear.co.za" className="flex items-center text-rb-gray-400 hover:text-rb-red transition-colors duration-200">
                  <Mail size={18} className="mr-2" /> janco@recklessbear.co.za
                </a>
              </div>

              <a href="https://maps.app.goo.gl/qtmuTbufg5rCqvjP7" target="_blank" rel="noopener noreferrer" className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200 mt-3 block">
                Johannesburg, South Africa
              </a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-rb-gray-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
            <p className="text-rb-gray-500 text-sm">
              © {currentYear} RecklessBear. All rights reserved.
            </p>
            <p className="text-rb-gray-500 text-sm">
              Designed by{' '}
              <a 
                href="https://streamline-automations.agency" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-rb-gray-400 hover:text-rb-red transition-colors duration-200"
              >
                Streamline Automations
              </a>
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <a href="#privacy" className="text-sm text-rb-gray-500 hover:text-rb-white transition-colors duration-200 mr-6">Privacy Policy</a>
            <a href="#terms" className="text-sm text-rb-gray-500 hover:text-rb-white transition-colors duration-200">Terms of Service</a>
          </div>
        </div>
      </div>
      
      {/* Lead ID and Location Tracking Script - Keep this as is */}
      <script dangerouslySetInnerHTML={{
        __html: `
          // Generate unique lead_id if not exists
          if (!localStorage.getItem("lead_id")) {
            const leadId = (Date.now().toString(36) + Math.random().toString(36).substring(2, 8)).toUpperCase();
            localStorage.setItem("lead_id", leadId);
          }
          const lead_id = localStorage.getItem("lead_id");

          // Fetch location data and auto-fill forms
          fetch("https://ipapi.co/json/")
            .then(res => res.json())
            .then(data => {
              const locationData = \`\${data.ip} | \${data.city}, \${data.region}, \${data.country_name}\`;
              
              const interval = setInterval(() => {
                // Auto-fill Tally forms
                const locationInput = document.querySelector('input[name="location-data"]');
                const leadIdInput = document.querySelector('input[name="lead_id"]');
                if (locationInput) locationInput.value = locationData;
                if (leadIdInput) leadIdInput.value = lead_id;
                if (locationInput && leadIdInput) clearInterval(interval);
              }, 300);

              // Update Cal.com booking iframe with lead_id
              const updateCalEmbeds = () => {
                const calFrames = document.querySelectorAll('iframe[data-cal-embed], iframe#cal-embed');
                calFrames.forEach(frame => {
                  const currentSrc = frame.src || frame.getAttribute('data-cal-link') || '';
                  if (currentSrc.includes('cal.com') && !currentSrc.includes('metadata[lead_id]')) {
                    const separator = currentSrc.includes('?') ? '&' : '?';
                    const newSrc = \`\${currentSrc}\${separator}metadata[lead_id]=\${lead_id}\`;
                    frame.src = newSrc;
                  }
                });

                // Update Cal.com buttons
                const calButtons = document.querySelectorAll('[data-cal-link]');
                calButtons.forEach(button => {
                  const currentLink = button.getAttribute('data-cal-link') || '';
                  if (currentLink.includes('cal.com') && !currentLink.includes('metadata[lead_id]')) {
                    const separator = currentLink.includes('?') ? '&' : '?';
                    const newLink = \`\${currentLink}\${separator}metadata[lead_id]=\${lead_id}\`;
                    button.setAttribute('data-cal-link', newLink);
                  }
                });
              };

              // Initial update
              updateCalEmbeds();
              
              // Watch for dynamically added Cal.com elements
              const observer = new MutationObserver(() => {
                updateCalEmbeds();
              });
              
              observer.observe(document.body, {
                childList: true,
                subtree: true
              });
            })
            .catch(err => console.log('Location fetch failed:', err));
        `
      }} />
    </footer>
  );
};

export default Footer;
