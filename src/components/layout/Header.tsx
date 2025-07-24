import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import allProducts, { getAllCategories, getAllSubcategories, getSubcategorySlug } from '../../data/productsData';
import GoldenLogoModal from '../ui/GoldenLogoModal';

interface NavItem {
  label: string;
  path?: string;
  children?: {
    section: string;
    items: {
      label: string;
      path: string;
    }[];
  }[];
}

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const location = useLocation();
  const [showGoldenModal, setShowGoldenModal] = useState(false);

  // Generate navigation items dynamically from productsData
  const generateNavItems = (): NavItem[] => {
    const categories = getAllCategories();
    const subcategories = getAllSubcategories();
    
    const productChildren = [
      {
        section: 'View All',
        items: [
          { label: 'All Products', path: '/products' },
        ]
      }
    ];

    // Map categories to URL slugs
    const categorySlugMap: { [key: string]: string } = {
      'School & Team Sports': 'school-team-sports',
      'Other Sports & Clubs': 'other-sports-clubs',
      'Schoolwear & Matric Apparel': 'schoolwear-matric',
      'Corporate & Staff Apparel': 'corporate-staff',
      'Gym & Fitness Apparel': 'gym-fitness',
      'Accessories & Branding': 'accessories-branding'
    };

    // Map subcategories to URL slugs
    const subcategorySlugMap: { [key: string]: string } = {
      'Rugby': 'rugby',
      'Netball': 'netball',
      'Cricket': 'cricket',
      'Hockey': 'hockey',
      'Athletics': 'athletics',
      'Soccer': 'soccer',
      'Golf': 'golf',
      'Fishing': 'fishing',
      'Hunting': 'hunting',
      'Cycling': 'cycling',
      'Darts': 'darts',
      'Tracksuits & Hoodies': 'tracksuits-hoodies',
      'T-Shirts & Golfers': 'tshirts-golfers',
      'Jackets': 'school-jackets',
      'Corporate Wear': 'corporate',
      'Fitness Gear': 'fitness',
      'Socks': 'socks',
      'Headwear': 'headwear',
      'Bags': 'bags',
      'Sleeves & Accessories': 'sleeves-accessories'
    };

    // Add categories dynamically from products
    categories.forEach(category => {
      const categoryProducts = allProducts.filter(product => product.category === category);
      const categorySubcategories = [...new Set(categoryProducts.map(product => product.subcategory).filter(Boolean))];
      
      if (categorySubcategories.length > 0) {
        const categorySlug = categorySlugMap[category];
        if (!categorySlug) return; // Skip if no slug mapping
        
        const items = [
          { label: `View All ${category}`, path: `/products/${categorySlug}` }
        ];
        
        categorySubcategories.forEach(subcategory => {
          const subcategorySlug = getSubcategorySlug(subcategory);
          if (subcategorySlug) {
            items.push({
              label: subcategory,
              path: `/products/${subcategorySlug}`
            });
          }
        });

        productChildren.push({
          section: category,
          items
        });
      }
    });

    return [
      { label: 'Home', path: '/' },
      {
        label: 'Products',
        children: productChildren,
      },
      {
        label: 'Catalogues',
        children: [
          {
            section: 'Catalogues',
            items: [
              { label: 'RecklessBear 2025–2026 Catalogue', path: '/catalogues/2025' },
            ],
          },
        ],
      },
      { label: 'Track Order', path: '/track-order' },
      { label: 'About Us', path: '/about' },
      { label: 'Contact Us', path: '/contact' }
    ];
  };

  const navItems = generateNavItems();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setExpandedSections([]);
    setIsProductsOpen(false);
    
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location]);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section)
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // If we're on the homepage, scroll to top
    if (location.pathname === '/') {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else {
      // If we're on another page, navigate to homepage
      window.location.href = '/';
    }
  };

  const handleGoldenLogoClick = () => {
    // Load confetti library if not already loaded
    if (!window.confetti) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js';
      script.onload = () => {
        // Trigger confetti animation
        window.confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      };
      document.head.appendChild(script);
    } else {
      // Trigger confetti animation
      window.confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
    
    setShowGoldenModal(true);
  };

  const DropdownMenu: React.FC<{ item: NavItem }> = ({ item }) => {
    if (!item.children) return null;

    return (
      <div className={`${item.label === 'Products' ? (isProductsOpen ? 'block' : 'hidden') : 'group-hover:block hidden'} absolute top-full left-0 pt-2`}>
        <div className="bg-rb-gray-900 rounded-lg shadow-xl border border-rb-gray-800 max-h-[calc(100vh-200px)] overflow-y-auto w-96">
          {item.children.map((section, idx) => (
            <div key={idx} className="p-4">
              <h4 className="text-rb-gray-400 text-sm font-semibold mb-3 uppercase tracking-wider">
                {section.section}
              </h4>
              <div className="space-y-1">
                {section.items.map((subItem, subIdx) => (
                  subItem.path ? (
                    <Link
                      key={subIdx}
                      to={subItem.path}
                      className="block text-rb-gray-300 hover:text-[#FF3B3B] hover:font-medium rounded px-3 py-2 transition-all duration-200 relative group/item"
                    >
                      <span className="relative z-10 flex items-center">
                        <ChevronRight 
                          size={16} 
                          className="absolute -left-2 transform opacity-0 -translate-x-2 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-x-0"
                        />
                        <span className="ml-4">{subItem.label}</span>
                      </span>
                    </Link>
                  ) : (
                    <span
                      key={subIdx}
                      className="block text-rb-gray-500 rounded px-3 py-2 cursor-default"
                    >
                      <span className="ml-4">{subItem.label}</span>
                    </span>
                  )
                ))}
              </div>
              {idx < item.children.length - 1 && (
                <div className="border-b border-rb-gray-800 my-3"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-rb-black shadow-lg' : 'bg-transparent'
      }`}
      style={{ scrollBehavior: 'smooth' }}
    >
      {/* Main Navigation */}
      <div className={`py-4 ${scrolled ? 'py-2' : ''}`}>
        <div className="container-custom flex justify-between items-center">
          <a 
            href="/" 
            onClick={handleLogoClick}
            className="z-50 cursor-pointer relative"
          >
            <Logo size="medium" />
            {/* Golden Logo Overlay */}
            <div
              className="absolute top-0 left-0 w-full h-full flex items-center justify-start"
            >
              <img 
                src="/Golden-Logo.png" 
                alt="Golden Logo" 
                className="w-10 h-10 md:w-12 md:h-12"
              />
            </div>
            {/* Hidden Golden Logo Overlay for Competition */}
            <div
              id="golden-logo"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleGoldenLogoClick();
              }}
              className="absolute top-0 left-0 w-full h-full cursor-pointer opacity-0 hover:opacity-10 transition-opacity duration-300"
              style={{
                background: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.3) 0%, transparent 70%)',
                zIndex: 10
              }}
              title="🏆 Hidden Golden Logo - Click to enter competition!"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.map((item, idx) => (
                <li key={idx} className="relative group">
                  {item.path ? (
                    <Link
                      to={item.path}
                      className={`nav-link ${
                        location.pathname === item.path
                          ? 'text-rb-red'
                          : 'text-rb-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      className={`nav-link text-rb-white cursor-pointer flex items-center ${
                        item.label === 'Products' ? 'relative' : ''
                      }`}
                      onClick={() => {
                        if (item.label === 'Products') {
                          setIsProductsOpen(!isProductsOpen);
                        }
                      }}
                    >
                      {item.label}
                      {item.children && (
                        <ChevronDown size={16} className="ml-1 opacity-75" />
                      )}
                    </button>
                  )}
                  <DropdownMenu item={item} />
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden z-50 text-rb-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ type: 'tween' }}
                className="fixed inset-0 bg-rb-black bg-opacity-95 md:hidden"
              >
                <div className="h-full overflow-y-auto pt-20 pb-6 px-6">
                  <nav>
                    {navItems.map((item, idx) => (
                      <div key={idx} className="mb-4">
                        {item.path ? (
                          <Link
                            to={item.path}
                            className="text-2xl font-bebas text-rb-white hover:text-rb-red transition-colors"
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <>
                            <h2 className="text-2xl font-bebas text-rb-white mb-2">
                              {item.label}
                            </h2>
                            {item.children?.map((section, sectionIdx) => (
                              <div key={sectionIdx} className="mb-4 ml-4">
                                <button
                                  onClick={() => toggleSection(section.section)}
                                  className="flex items-center justify-between w-full text-rb-gray-400 text-sm font-semibold mb-2 hover:text-rb-white transition-colors"
                                >
                                  <span>{section.section}</span>
                                  <ChevronDown
                                    size={16}
                                    className={`transform transition-transform duration-200 ${
                                      expandedSections.includes(section.section) ? 'rotate-180' : ''
                                    }`}
                                  />
                                </button>
                                <AnimatePresence>
                                  {expandedSections.includes(section.section) && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="space-y-2 ml-4 overflow-hidden"
                                    >
                                      {section.items.map((subItem, subIdx) => (
                                        subItem.path ? (
                                          <Link
                                            key={subIdx}
                                            to={subItem.path}
                                            className="block text-rb-gray-300 hover:text-[#FF3B3B] hover:font-medium py-1 relative group/item"
                                          >
                                            <span className="relative z-10 flex items-center">
                                              <ChevronRight 
                                                size={16} 
                                                className="absolute -left-2 transform opacity-0 -translate-x-2 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-x-0"
                                              />
                                              <span className="ml-4">{subItem.label}</span>
                                            </span>
                                          </Link>
                                        ) : (
                                          <span
                                            key={subIdx}
                                            className="block text-rb-gray-500 py-1 cursor-default"
                                          >
                                            <span className="ml-4">{subItem.label}</span>
                                          </span>
                                        )
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            ))}
                          </>
                        )}
                      </div>
                    ))}
                  </nav>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Golden Logo Modal */}
      <GoldenLogoModal 
        isOpen={showGoldenModal} 
        onClose={() => setShowGoldenModal(false)} 
      />
    </header>
  );
};

export default Header;