export interface Product {
  title: string;
  image: string;
  category: string;
  subcategory: string;
  path: string;
  description?: string;
}

const allProducts: Product[] = [
  // School & Team Sports - Rugby
  {
    title: 'Rugby Jersey',
    image: '/rugby-jersey-frontback.png',
    category: 'School & Team Sports',
    subcategory: 'Rugby',
    path: '/products/rugby-jerseys'
  },
  {
    title: 'Rugby Shorts',
    image: '/rugby-shorts-frontback.png',
    category: 'School & Team Sports',
    subcategory: 'Rugby',
    path: '/products/rugby-shorts'
  },
  {
    title: 'Rugby Socks',
    image: '/rugby-socks.png',
    category: 'School & Team Sports',
    subcategory: 'Rugby',
    path: '/products/rugby-socks'
  },
  {
    title: 'Short Sleeve Warm-Up',
    image: '/short-sleeve-warm-up-frontback.png',
    category: 'School & Team Sports',
    subcategory: 'Rugby',
    path: '/products/rugby-warmup-short'
  },
  {
    title: 'Long Sleeve Warm-Up',
    image: '/long-sleeve-warm-up-frontback.png',
    category: 'School & Team Sports',
    subcategory: 'Rugby',
    path: '/products/rugby-warmup-long'
  },

  // School & Team Sports - Netball
  {
    title: 'Netball Dress',
    image: '/netball-dress-frontback.png',
    category: 'School & Team Sports',
    subcategory: 'Netball',
    path: '/products/netball-dress'
  },
  {
    title: 'Hot Pants',
    image: '/hot-pants-frontback.png',
    category: 'School & Team Sports',
    subcategory: 'Netball',
    path: '/products/netball-hotpants'
  },
  {
    title: 'Netball Socks',
    image: '/netball-socks.png',
    category: 'School & Team Sports',
    subcategory: 'Netball',
    path: '/products/netball-socks'
  },
  {
    title: 'Bibs',
    image: '/netball-bibs.png',
    category: 'School & Team Sports',
    subcategory: 'Netball',
    path: '/products/netball-bibs'
  },
  {
    title: 'Skort',
    image: '/skort-frontback.png',
    category: 'School & Team Sports',
    subcategory: 'Netball',
    path: '/products/netball-skort'
  },
  {
    title: 'Ladies Vest',
    image: '/ladies-vest-frontback.png',
    category: 'School & Team Sports',
    subcategory: 'Netball',
    path: '/products/netball-vest-ladies'
  },

  // School & Team Sports - Cricket
  {
    title: 'Cricket Shirt',
    image: '/cricket-shirt-frontback.png',
    category: 'School & Team Sports',
    subcategory: 'Cricket',
    path: '/products/cricket-shirt'
  },
  {
    title: 'Cricket Pants',
    image: '/cricket-pants-frontback.png',
    category: 'School & Team Sports',
    subcategory: 'Cricket',
    path: '/products/cricket-pants'
  },
  {
    title: 'Long Sleeve Golfer',
    image: '/long-sleeve-golfer-frontback.png',
    category: 'School & Team Sports',
    subcategory: 'Cricket',
    path: '/products/cricket-golfer-long'
  },

  // School & Team Sports - Hockey
  {
    title: 'Hockey Dress',
    image: '/hockey-dress-frontback.png',
    category: 'School & Team Sports',
    subcategory: 'Hockey',
    path: '/products/hockey-dress'
  },
  {
    title: 'Hockey Shorts',
    image: '/hockey-shorts-frontback.png',
    category: 'School & Team Sports',
    subcategory: 'Hockey',
    path: '/products/hockey-shorts'
  },
  {
    title: 'Hockey Socks',
    image: '/hockey-socks.png',
    category: 'School & Team Sports',
    subcategory: 'Hockey',
    path: '/products/hockey-socks'
  },
  {
    title: 'Short Sleeve T-Shirt',
    image: '/short-sleeve-t-shirt-frontback.png',
    category: 'School & Team Sports',
    subcategory: 'Hockey',
    path: '/products/hockey-tshirt-short'
  },
  {
    title: 'Long Sleeve T-Shirt',
    image: '/long-sleeve-t-shirt-frontback.png',
    category: 'School & Team Sports',
    subcategory: 'Hockey',
    path: '/products/hockey-tshirt-long'
  },
  {
    title: 'Men\'s Vest',
    image: '/mens-vest-frontback.png',
    category: 'School & Team Sports',
    subcategory: 'Hockey',
    path: '/products/hockey-vest-mens'
  },
  {
    title: 'Ladies Vest',
    image: '/hockey-ladies-vest-frontback.png',
    category: 'School & Team Sports',
    subcategory: 'Hockey',
    path: '/products/hockey-vest-ladies'
  },

  // School & Team Sports - Athletics
  {
    title: 'Short Sleeve T-Shirt',
    image: '/athletics-short-sleeve-t-shirt-frontback.png',
    category: 'School & Team Sports',
    subcategory: 'Athletics',
    path: '/products/athletics-tshirt-short'
  },
  {
    title: 'Long Sleeve T-Shirt',
    image: '/athletics-long-sleeve-t-shirt-frontback.png',
    category: 'School & Team Sports',
    subcategory: 'Athletics',
    path: '/products/athletics-tshirt-long'
  },
  {
    title: 'Crop Top',
    image: '/crop-top-frontback.png',
    category: 'School & Team Sports',
    subcategory: 'Athletics',
    path: '/products/athletics-crop-top'
  },
  {
    title: 'Men\'s Vest',
    image: '/athletics-mens-vest-frontback.png',
    category: 'School & Team Sports',
    subcategory: 'Athletics',
    path: '/products/athletics-vest-mens'
  },
  {
    title: 'Ladies Vest',
    image: '/athletics-ladies-vest-frontback.png',
    category: 'School & Team Sports',
    subcategory: 'Athletics',
    path: '/products/athletics-vest-ladies'
  },
  {
    title: 'Shorts',
    image: '/athletics-shorts-frontback.png',
    category: 'School & Team Sports',
    subcategory: 'Athletics',
    path: '/products/athletics-shorts'
  },
  {
    title: 'Leggings',
    image: '/athletics-leggings-frontback.png',
    category: 'School & Team Sports',
    subcategory: 'Athletics',
    path: '/products/athletics-leggings'
  },

  // Other Sports & Clubs - Soccer
  {
    title: 'Soccer Jersey',
    image: '/soccer-jersey-frontback.png',
    category: 'Other Sports & Clubs',
    subcategory: 'Soccer',
    path: '/products/soccer-jersey'
  },
  {
    title: 'Soccer Shorts',
    image: '/soccer-shorts-frontback.png',
    category: 'Other Sports & Clubs',
    subcategory: 'Soccer',
    path: '/products/soccer-shorts'
  },
  {
    title: 'Soccer Socks',
    image: '/soccer-socks.png',
    category: 'Other Sports & Clubs',
    subcategory: 'Soccer',
    path: '/products/soccer-socks'
  },

  // Other Sports & Clubs - Golf
  {
    title: 'Golf Shirt',
    image: '/golf-shirt-frontback.png',
    category: 'Other Sports & Clubs',
    subcategory: 'Golf',
    path: '/products/golf-shirt'
  },
  {
    title: 'Golf Dress',
    image: '/golf-dress-frontback.png',
    category: 'Other Sports & Clubs',
    subcategory: 'Golf',
    path: '/products/golf-dress'
  },
  {
    title: 'Golf Zip Top',
    image: '/golf-zip-top-frontback.png',
    category: 'Other Sports & Clubs',
    subcategory: 'Golf',
    path: '/products/golf-zip-top'
  },

  // Other Sports & Clubs - Darts

  // Other Sports & Clubs - Cycling
  {
    title: 'Cycling Shirt',
    image: '/cycling-shirt-frontback.png',
    category: 'Other Sports & Clubs',
    subcategory: 'Cycling',
    path: '/products/cycling-shirt'
  },

  // Other Sports & Clubs - Fishing
  {
    title: 'Fishing Hoodie',
    image: '/fishing-hoodie-frontback.png',
    category: 'Other Sports & Clubs',
    subcategory: 'Fishing',
    path: '/products/fishing-hoodie'
  },
  {
    title: 'Fishing Tee Long Sleeve',
    image: '/fishing-tee-long-frontback.png',
    category: 'Other Sports & Clubs',
    subcategory: 'Fishing',
    path: '/products/fishing-tee-long'
  },
  {
    title: 'Fishing Tee Short Sleeve',
    image: '/fishing-tee-short-frontback.png',
    category: 'Other Sports & Clubs',
    subcategory: 'Fishing',
    path: '/products/fishing-tee-short'
  },
  {
    title: 'Fishing Zip Top',
    image: '/fishing-zip-top-frontback.png',
    category: 'Other Sports & Clubs',
    subcategory: 'Fishing',
    path: '/products/fishing-zip-top'
  },

  // Other Sports & Clubs - Hunting
  {
    title: 'Hunting Hoodie',
    image: '/hunting-hoodie-frontback.png',
    category: 'Other Sports & Clubs',
    subcategory: 'Hunting',
    path: '/products/hunting-hoodie'
  },
  {
    title: 'Hunting Puffer Long',
    image: '/hunting-puffer-long-frontback.png',
    category: 'Other Sports & Clubs',
    subcategory: 'Hunting',
    path: '/products/hunting-puffer-long'
  },
  {
    title: 'Hunting Puffer Short',
    image: '/hunting-puffer-short-frontback.png',
    category: 'Other Sports & Clubs',
    subcategory: 'Hunting',
    path: '/products/hunting-puffer-short'
  },
  {
    title: 'Hunting Zip Top',
    image: '/hunting-zip-top-frontback.png',
    category: 'Other Sports & Clubs',
    subcategory: 'Hunting',
    path: '/products/hunting-zip-top'
  },
  {
    title: 'Hunting Softshell Jacket',
    image: '/hunting-softshell-frontback.png',
    category: 'Other Sports & Clubs',
    subcategory: 'Hunting',
    path: '/products/hunting-softshell'
  },

  // Schoolwear & Matric Apparel - Matric Jackets

  // Schoolwear & Matric Apparel - Tracksuits & Hoodies
  {
    title: 'Hoodie',
    image: '/school-hoodie-frontback.png',
    category: 'Schoolwear & Matric Apparel',
    subcategory: 'Tracksuits & Hoodies',
    path: '/products/school-hoodie'
  },
  {
    title: 'Tracksuit Pants',
    image: '/school-tracksuit-pants-frontback.png',
    category: 'Schoolwear & Matric Apparel',
    subcategory: 'Tracksuits & Hoodies',
    path: '/products/school-tracksuit-pants'
  },

  // Schoolwear & Matric Apparel - T-Shirts & Golfers
  {
    title: 'Short Sleeve T-Shirt',
    image: '/school-tshirt-short-frontback.png',
    category: 'Schoolwear & Matric Apparel',
    subcategory: 'T-Shirts & Golfers',
    path: '/products/school-tshirt-short'
  },
  {
    title: 'Long Sleeve T-Shirt',
    image: '/school-tshirt-long-frontback.png',
    category: 'Schoolwear & Matric Apparel',
    subcategory: 'T-Shirts & Golfers',
    path: '/products/school-tshirt-long'
  },
  {
    title: 'Short Sleeve Golfer',
    image: '/school-golfer-short-frontback.png',
    category: 'Schoolwear & Matric Apparel',
    subcategory: 'T-Shirts & Golfers',
    path: '/products/school-golfer-short'
  },
  {
    title: 'Long Sleeve Golfer',
    image: '/school-golfer-long-frontback.png',
    category: 'Schoolwear & Matric Apparel',
    subcategory: 'T-Shirts & Golfers',
    path: '/products/school-golfer-long'
  },

  // Schoolwear & Matric Apparel - Jackets
  {
    title: 'Softshell Jacket',
    image: '/school-softshell-frontback.png',
    category: 'Schoolwear & Matric Apparel',
    subcategory: 'Jackets',
    path: '/products/school-softshell'
  },
  {
    title: 'Puffer Jacket',
    image: '/school-puffer-frontback.png',
    category: 'Schoolwear & Matric Apparel',
    subcategory: 'Jackets',
    path: '/products/school-puffer'
  },

  // Schoolwear & Matric Apparel - Female Apparel

  // Corporate & Staff Apparel - Corporate Wear
  {
    title: 'Corporate Golfer Short Sleeve',
    image: '/corporate-golfer-short-frontback.png',
    category: 'Corporate & Staff Apparel',
    subcategory: 'Corporate Wear',
    path: '/products/corporate-shirt'
  },
  {
    title: 'Corporate Puffer Short',
    image: '/corporate-puffer-short-frontback.png',
    category: 'Corporate & Staff Apparel',
    subcategory: 'Corporate Wear',
    path: '/products/corporate-puffer-short'
  },
  {
    title: 'Corporate Puffer Long',
    image: '/corporate-puffer-long-frontback.png',
    category: 'Corporate & Staff Apparel',
    subcategory: 'Corporate Wear',
    path: '/products/corporate-puffer-long'
  },
  {
    title: 'Corporate Softshell Jacket',
    image: '/corporate-softshell-frontback.png',
    category: 'Corporate & Staff Apparel',
    subcategory: 'Corporate Wear',
    path: '/products/corporate-softshell'
  },
  {
    title: 'Corporate Zip Top',
    image: '/corporate-zip-top-frontback.png',
    category: 'Corporate & Staff Apparel',
    subcategory: 'Corporate Wear',
    path: '/products/corporate-zip-top'
  },

  // Gym & Fitness Apparel - Fitness Gear
  {
    title: 'Leggings',
    image: '/leggings-frontback.png',
    category: 'Gym & Fitness Apparel',
    subcategory: 'Fitness Gear',
    path: '/products/leggings'
  },
  {
    title: 'Gym Shirt',
    image: '/gym-shirt-frontback.png',
    category: 'Gym & Fitness Apparel',
    subcategory: 'Fitness Gear',
    path: '/products/gym-shirt'
  },
  {
    title: 'Gym Vest',
    image: '/gym-vest-frontback.png',
    category: 'Gym & Fitness Apparel',
    subcategory: 'Fitness Gear',
    path: '/products/gym-vest'
  },
  {
    title: 'Gym Hoodie',
    image: '/hoodie-gym-frontback.png',
    category: 'Gym & Fitness Apparel',
    subcategory: 'Fitness Gear',
    path: '/products/gym-hoodie'
  },
  {
    title: 'Crop Top',
    image: '/crop-top-frontback.png',
    category: 'Gym & Fitness Apparel',
    subcategory: 'Fitness Gear',
    path: '/products/gym-crop-top'
  },
  {
    title: 'Gym Puffer Jacket',
    image: '/puffer-jacket-frontback.png',
    category: 'Gym & Fitness Apparel',
    subcategory: 'Fitness Gear',
    path: '/products/gym-puffer-jacket'
  },
  {
    title: 'Long Sleeve Gym T-Shirt',
    image: '/long-sleeve-tshirt-gym-frontback.png',
    category: 'Gym & Fitness Apparel',
    subcategory: 'Fitness Gear',
    path: '/products/gym-tshirt-long'
  },
  {
    title: 'Gym Tracksuit Pants',
    image: '/tracksuit-pants-gym-frontback.png',
    category: 'Gym & Fitness Apparel',
    subcategory: 'Fitness Gear',
    path: '/products/gym-tracksuit-pants'
  },
  {
    title: 'Gym Shorts',
    image: '/gym-shorts-frontback.png',
    category: 'Gym & Fitness Apparel',
    subcategory: 'Fitness Gear',
    path: '/products/gym-shorts'
  },

  // Schoolwear & Matric Apparel - Tracksuits & Hoodies
  {
    title: 'School Hoodie',
    image: '/school-hoodie-frontback.png',
    category: 'Schoolwear & Matric Apparel',
    subcategory: 'Tracksuits & Hoodies',
    path: '/products/school-hoodie'
  },
  {
    title: 'School Tracksuit Pants',
    image: '/school-tracksuit-pants-frontback.png',
    category: 'Schoolwear & Matric Apparel',
    subcategory: 'Tracksuits & Hoodies',
    path: '/products/school-tracksuit-pants'
  },

  // Schoolwear & Matric Apparel - T-Shirts & Golfers
  {
    title: 'School Short Sleeve T-Shirt',
    image: '/school-tshirt-short-frontback.png',
    category: 'Schoolwear & Matric Apparel',
    subcategory: 'T-Shirts & Golfers',
    path: '/products/school-tshirt-short'
  },
  {
    title: 'School Long Sleeve T-Shirt',
    image: '/school-tshirt-long-frontback.png',
    category: 'Schoolwear & Matric Apparel',
    subcategory: 'T-Shirts & Golfers',
    path: '/products/school-tshirt-long'
  },
  {
    title: 'School Short Sleeve Golfer',
    image: '/school-golfer-short-frontback.png',
    category: 'Schoolwear & Matric Apparel',
    subcategory: 'T-Shirts & Golfers',
    path: '/products/school-golfer-short'
  },
  {
    title: 'School Long Sleeve Golfer',
    image: '/school-golfer-long-frontback.png',
    category: 'Schoolwear & Matric Apparel',
    subcategory: 'T-Shirts & Golfers',
    path: '/products/school-golfer-long'
  },

  // Schoolwear & Matric Apparel - Jackets
  {
    title: 'School Softshell Jacket',
    image: '/school-softshell-frontback.png',
    category: 'Schoolwear & Matric Apparel',
    subcategory: 'Jackets',
    path: '/products/school-softshell'
  },
  {
    title: 'School Puffer Jacket',
    image: '/school-puffer-frontback.png',
    category: 'Schoolwear & Matric Apparel',
    subcategory: 'Jackets',
    path: '/products/school-puffer'
  },

  // Accessories & Branding - Socks
  {
    title: 'Rugby Socks',
    image: '/rugby-socks.png',
    category: 'Accessories & Branding',
    subcategory: 'Socks',
    path: '/products/rugby-socks'
  },
  {
    title: 'Netball Socks',
    image: '/netball-socks.png',
    category: 'Accessories & Branding',
    subcategory: 'Socks',
    path: '/products/netball-socks'
  },
  {
    title: 'Hockey Socks',
    image: '/hockey-socks.png',
    category: 'Accessories & Branding',
    subcategory: 'Socks',
    path: '/products/hockey-socks'
  },
  {
    title: 'Soccer Socks',
    image: '/soccer-socks.png',
    category: 'Accessories & Branding',
    subcategory: 'Socks',
    path: '/products/soccer-socks'
  },
  {
    title: 'Tab Socks',
    image: '/tab-socks.png',
    category: 'Accessories & Branding',
    subcategory: 'Socks',
    path: '/products/tab-socks'
  },
  {
    title: 'Anklet Socks',
    image: '/anklet-socks.png',
    category: 'Accessories & Branding',
    subcategory: 'Socks',
    path: '/products/anklet-socks'
  },
  {
    title: 'Premium Crew Socks',
    image: '/premium-crew-socks.png',
    category: 'Accessories & Branding',
    subcategory: 'Socks',
    path: '/products/premium-crew-socks'
  },
  {
    title: 'Ribbed Crew Socks',
    image: '/ribbed-crew-socks.png',
    category: 'Accessories & Branding',
    subcategory: 'Socks',
    path: '/products/ribbed-crew-socks'
  },
  {
    title: 'Promo Crew Socks',
    image: '/promo-crew-socks.png',
    category: 'Accessories & Branding',
    subcategory: 'Socks',
    path: '/products/promo-crew-socks'
  },
  {
    title: 'Knee High Socks',
    image: '/knee-high-socks.png',
    category: 'Accessories & Branding',
    subcategory: 'Socks',
    path: '/products/knee-high-socks'
  },
  {
    title: 'Sweatbands',
    image: '/sweatbands.png',
    category: 'Accessories & Branding',
    subcategory: 'Sleeves & Accessories',
    path: '/products/sweatbands'
  },

  // Sleeves & Accessories
  {
    title: 'Arm Sleeves',
    image: '/arm-sleeves.png',
    category: 'Accessories & Branding',
    subcategory: 'Sleeves & Accessories',
    path: '/products/arm-sleeves'
  },
  {
    title: 'Leg Sleeves',
    image: '/leg-sleeves.png',
    category: 'Accessories & Branding',
    subcategory: 'Sleeves & Accessories',
    path: '/products/leg-sleeves'
  },

  // Accessories & Branding - Headwear
  {
    title: 'Cap',
    image: '/cap-frontback.png',
    category: 'Accessories & Branding',
    subcategory: 'Headwear',
    path: '/products/cap'
  },
  {
    title: 'Visor Cap',
    image: '/visor-cap-frontback.png',
    category: 'Accessories & Branding',
    subcategory: 'Headwear',
    path: '/products/visor-cap'
  },

  // Accessories & Branding - Bags
  {
    title: 'Backpack',
    image: '/backpack-frontback.png',
    category: 'Accessories & Branding',
    subcategory: 'Bags',
    path: '/products/backpack'
  },

  // Accessories & Branding - Warmup & Training (removed outdated items)
];

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'All') {
    return allProducts;
  }
  return allProducts.filter(product => product.category === category);
};

export const getProductsBySubcategory = (subcategory: string): Product[] => {
  if (!subcategory) return [];
  return allProducts.filter(product => 
    product.subcategory && 
    product.subcategory.toLowerCase() === subcategory.toLowerCase()
  );
};

export const getSubcategoryBySlug = (slug: string): string | null => {
  const slugToSubcategory: { [key: string]: string } = {
    'rugby': 'Rugby',
    'netball': 'Netball',
    'cricket': 'Cricket',
    'hockey': 'Hockey',
    'athletics': 'Athletics',
    'soccer': 'Soccer',
    'golf': 'Golf',
    'fishing': 'Fishing',
    'hunting': 'Hunting',
    'cycling': 'Cycling',
    'darts': 'Darts',
    'tracksuits-hoodies': 'Tracksuits & Hoodies',
    'tshirts-golfers': 'T-Shirts & Golfers',
    'school-jackets': 'Jackets',
    'female-apparel': 'Female Apparel',
    'corporate': 'Corporate Wear',
    'fitness': 'Fitness Gear',
    'socks': 'Socks',
    'headwear': 'Headwear',
    'bags': 'Bags',
    'warmup-training': 'Warmup & Training',
    'sleeves-accessories': 'Sleeves & Accessories'
  };
  
  return slugToSubcategory[slug] || null;
};

export const getSubcategorySlug = (subcategory: string): string | null => {
  const subcategoryToSlug: { [key: string]: string } = {
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
    'Female Apparel': 'female-apparel',
    'Corporate Wear': 'corporate',
    'Fitness Gear': 'fitness',
    'Socks': 'socks',
    'Headwear': 'headwear',
    'Bags': 'bags',
    'Warmup & Training': 'warmup-training',
    'Sleeves & Accessories': 'sleeves-accessories'
  };
  
  return subcategoryToSlug[subcategory] || null;
};

export const getProductById = (id: string): Product | undefined => {
  return allProducts.find(product => product.path.includes(id));
};

export const getAllCategories = (): string[] => {
  return [...new Set(allProducts.map(product => product.category))];
};

export const getAllSubcategories = (): string[] => {
  return [...new Set(allProducts.map(product => product.subcategory))];
};

export default allProducts;