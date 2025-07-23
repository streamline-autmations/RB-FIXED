import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ContactForm: React.FC = () => {
  const [activeView, setActiveView] = useState<'form' | 'quote' | 'call'>('form');
  const [locationData, setLocationData] = useState<string>('');
  const [leadId, setLeadId] = useState<string>('');
  
  // Generate or retrieve lead_id and fetch location data on component mount
  useEffect(() => {
    // Generate or get lead_id
    let storedLeadId = localStorage.getItem("lead_id");
    if (!storedLeadId) {
      storedLeadId = (Date.now().toString(36) + Math.random().toString(36).substring(2, 8)).toUpperCase();
      localStorage.setItem("lead_id", storedLeadId);
    }
    setLeadId(storedLeadId);

    // Fetch location data
    const fetchLocationData = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        const formattedLocation = `${data.ip} | ${data.city}, ${data.region}, ${data.country_name}`;
        setLocationData(formattedLocation);
      } catch (error) {
        console.log('Location fetch failed:', error);
        setLocationData('Location unavailable');
      }
    };

    fetchLocationData();
  }, []);
  
  // Load Cal.com script when component mounts
  useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = `
      (function (C, A, L) {
        let p = function (a, ar) { a.q.push(ar); };
        let d = C.document;
        C.Cal = C.Cal || function () {
          let cal = C.Cal;
          let ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () { p(api, arguments); };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");
      Cal("init", "appointment-with-recklessbear", { origin: "https://app.cal.com" });
      Cal.ns["appointment-with-recklessbear"]("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
    `;
    document.head.appendChild(script);
  }, []);

  // Load Tally embed script when quote or form view is active
  useEffect(() => {
    if (activeView === 'quote' || activeView === 'form') {
      const script = document.createElement('script');
      script.src = "https://tally.so/widgets/embed.js";
      script.onload = function () { 
        if (window.Tally) {
          window.Tally.loadEmbeds(); 
        }
      };
      document.body.appendChild(script);
    }
  }, [activeView]);

  const handleBookCall = () => {
    setActiveView('call');
    if (window.Cal) {
      // Update Cal.com with lead_id
      const calUrl = `https://cal.com/reckless-bear-demo/appointment-with-recklessbear?metadata[lead_id]=${leadId}`;
      window.Cal.ns["appointment-with-recklessbear"]("ui", {
        "hideEventTypeDetails": false,
        "layout": "month_view"
      });
    }
  };

  // Generate the Tally URL with location data and lead_id
  const getQuoteFormUrl = () => {
    const baseUrl = 'https://tally.so/r/wMlkaY?transparentBackground=1';
    const params = [];
    if (locationData) params.push(`location-data=${encodeURIComponent(locationData)}`);
    if (leadId) params.push(`lead_id=${encodeURIComponent(leadId)}`);
    return params.length > 0 ? `${baseUrl}&${params.join('&')}` : baseUrl;
  };

  const getQuestionFormUrl = () => {
    const baseUrl = 'https://tally.so/r/mK2Q2z?transparentBackground=1';
    const params = [];
    if (locationData) params.push(`location-data=${encodeURIComponent(locationData)}`);
    if (leadId) params.push(`lead_id=${encodeURIComponent(leadId)}`);
    return params.length > 0 ? `${baseUrl}&${params.join('&')}` : baseUrl;
  };
  
  return (
    <div className="w-full">
      {/* Action Buttons */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-2xl font-bebas text-rb-white mb-6">How can we help you?</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={() => setActiveView('quote')}
            className={`flex-1 px-6 py-4 font-bebas text-lg tracking-wider transition-all duration-300 rounded-md ${
              activeView === 'quote'
                ? 'bg-rb-red text-rb-white'
                : 'bg-rb-gray-800 text-rb-white hover:bg-rb-red'
            }`}
          >
            Get a Quote
          </button>
          
          <button
            onClick={handleBookCall}
            data-cal-link={`reckless-bear-demo/appointment-with-recklessbear?metadata[lead_id]=${leadId}`}
            data-cal-namespace="appointment-with-recklessbear"
            data-cal-config='{"layout":"month_view"}'
            className={`flex-1 px-6 py-4 font-bebas text-lg tracking-wider transition-all duration-300 rounded-md ${
              activeView === 'call'
                ? 'bg-rb-red text-rb-white'
                : 'bg-rb-gray-800 text-rb-white hover:bg-rb-red'
            }`}
          >
            Book a Call
          </button>
          
          <button
            onClick={() => setActiveView('form')}
            className={`flex-1 px-6 py-4 font-bebas text-lg tracking-wider transition-all duration-300 rounded-md ${
              activeView === 'form'
                ? 'bg-rb-red text-rb-white'
                : 'bg-rb-gray-800 text-rb-white hover:bg-rb-red'
            }`}
          >
            Ask a Question
          </button>
        </div>
      </motion.div>

      {/* Content based on active view */}
      {activeView === 'quote' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="w-full p-6 bg-rb-gray-800 rounded-2xl shadow-2xl border border-rb-gray-700">
            <div className="mb-6">
              <h3 className="text-2xl font-bebas text-rb-white mb-2">Get Your Custom Quote</h3>
              <p className="text-rb-gray-400">Tell us about your project and we'll provide a detailed quote within 24 hours.</p>
            </div>
            
            <div className="bg-rb-gray-900 rounded-xl overflow-hidden shadow-inner">
              <iframe 
                data-tally-src={getQuoteFormUrl()}
                loading="lazy"
                width="100%" 
                height="950" 
                style={{ 
                  border: 'none', 
                  overflow: 'hidden',
                  borderRadius: '12px',
                  backgroundColor: 'transparent'
                }} 
                frameBorder="0" 
                title="Get a Quote Form"
                className="w-full"
              />
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-rb-gray-500 text-sm">
                Secure form powered by Tally • Your information is protected
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {activeView === 'call' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-rb-gray-800 p-8 rounded-lg text-center"
        >
          <h3 className="text-2xl font-bebas text-rb-white mb-4">Book Your Consultation</h3>
          <p className="text-rb-gray-300 mb-6">
            Click the button above to open our booking calendar and schedule a call with our team.
          </p>
          <div className="bg-rb-gray-900 p-6 rounded-lg">
            <p className="text-rb-gray-400 text-sm">
              If the calendar doesn't open, you can also book directly at:{' '}
              <a 
                href={`https://cal.com/reckless-bear-demo/appointment-with-recklessbear?metadata[lead_id]=${leadId}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-rb-red hover:text-rb-white transition-colors"
              >
                cal.com/reckless-bear-demo/appointment-with-recklessbear
              </a>
            </p>
          </div>
        </motion.div>
      )}

      {activeView === 'form' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <div className="w-full p-6 bg-rb-gray-800 rounded-2xl shadow-2xl border border-rb-gray-700">
            <div className="mb-6">
              <h3 className="text-2xl font-bebas text-rb-white mb-2">Ask Your Question</h3>
              <p className="text-rb-gray-400">Have a question about our products or services? We're here to help.</p>
            </div>
            
            <div className="bg-rb-gray-900 rounded-xl overflow-hidden shadow-inner">
              <iframe 
                data-tally-src={getQuestionFormUrl()}
                loading="lazy"
                width="100%" 
                height="700" 
                style={{ 
                  border: 'none', 
                  overflow: 'hidden',
                  borderRadius: '12px',
                  backgroundColor: 'transparent'
                }} 
                frameBorder="0" 
                title="Ask a Question Form"
                className="w-full"
              />
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-rb-gray-500 text-sm">
                We usually respond within 1 business day. For urgent requests, feel free to call or WhatsApp us.
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <motion.div
        className="mt-8 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <p className="text-rb-gray-400 text-sm">
          You can also get a quote or book a call through our chatbot.
        </p>
      </motion.div>
    </div>
  );
};

export default ContactForm;