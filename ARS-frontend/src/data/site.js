// Central content for the Adnan Rais & Sons website.
// Edit text, contact details and products here — every page reads from this file.

export const company = {
  name: 'Adnan Rais & Sons',
  short: 'ARS',
  tagline: 'Packaging a Better Tomorrow',
  proprietor: 'Hafiz Adnan Rais',
  role: 'Proprietor',
  address: '85-Khaje Dewan First Lane, Lalbagh, Dhaka-1211',
  phones: ['01711531797', '01971531797'],
  email: 'adnanrais786@gmail.com',
  whatsapp: '8801711531797', // international format, no "+"
  mapQuery: '85 Khaje Dewan First Lane, Lalbagh, Dhaka 1211, Bangladesh',
}

export const nav = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Products', to: '/products' },
  { label: 'Our Capabilities', to: '/capabilities' },
  { label: 'Why Us', to: '/why-us' },
  { label: 'Contact', to: '/contact' },
]

export const categories = [
  { id: 'all', label: 'All Products' },
  { id: 'films', label: 'Films & Sheets' },
  { id: 'bags', label: 'Bags' },
  { id: 'strapping', label: 'Strapping & Tapes' },
  { id: 'printing', label: 'Printing' },
  { id: 'disposable', label: 'Food & Disposable' },
  { id: 'accessories', label: 'Accessories & Custom' },
]

// NOTE: descriptions / specs below are sample copy — confirm with the business before launch.
export const products = [
  {
    slug: 'ld-shrink-films',
    name: 'LD Shrink Films',
    category: 'films',
    image: '/images/products/ld-shrink-films.jpg',
    short: 'High-quality shrink films for secure and durable packaging.',
    description:
      'Low-density polyethylene shrink film that tightens evenly under heat to hold, protect and present products. Ideal for bundling bottles, cartons and multipacks.',
    uses: ['Beverage & bottle bundling', 'Carton and multipack wrapping', 'Pallet and bulk unitising'],
    options: ['Custom width and gauge', 'Clear or tinted', 'Plain or printed'],
  },
  {
    slug: 'pp-strapping-belt',
    name: 'PP Strapping Belt',
    category: 'strapping',
    image: '/images/products/pp-strapping-belt.jpg',
    short: 'Strong and reliable strapping for heavy-duty packaging.',
    description:
      'Polypropylene strapping with consistent width and tensile strength, suitable for manual tools and semi-automatic or automatic strapping machines.',
    uses: ['Carton and box sealing', 'Bundling garments and textiles', 'Securing loads for transport'],
    options: ['Multiple widths and colours', 'Machine and manual grades', 'Printed strapping on request'],
  },
  {
    slug: 'bopp-printed-bags',
    name: 'BOPP Printed Bags',
    category: 'bags',
    image: '/images/products/bopp-printed-bags.jpg',
    short: 'Custom printed bags with excellent strength and finishing.',
    description:
      'Biaxially oriented polypropylene bags with sharp, vibrant print and a glossy or matte finish — strong enough for retail shelves and bulk goods.',
    uses: ['Snacks, rice and flour', 'Retail and promotional packs', 'Garment packaging'],
    options: ['Up to multi-colour printing', 'Gloss or matte finish', 'Side-gusset, zipper or handle'],
  },
  {
    slug: 'pp-rolls-bags-sheets',
    name: 'PP Rolls, Bags & Sheets',
    category: 'films',
    image: '/images/products/pp-rolls-bags-sheets.jpg',
    short: 'Versatile polypropylene solutions for various industrial needs.',
    description:
      'Crystal-clear polypropylene in roll, bag and sheet form for presentation, protection and general-purpose packing.',
    uses: ['Garment and textile packing', 'Food and bakery wraps', 'Stationery and retail goods'],
    options: ['Custom sizes and thickness', 'Self-adhesive flap bags', 'Plain or printed'],
  },
  {
    slug: 'flexo-gravure-printing',
    name: 'Flexo & Gravure Printing',
    category: 'printing',
    image: '/images/products/flexo-gravure-printing.jpg',
    short: 'High-quality printing for flexible packaging materials.',
    description:
      'Flexographic and rotogravure printing on films and laminates, delivering consistent colour and crisp detail for brand-ready packaging.',
    uses: ['Food and snack packaging', 'Branded bags and wraps', 'Labels and laminates'],
    options: ['Multi-colour registration', 'Laminated structures', 'Artwork support'],
  },
  {
    slug: 'hdpe-ldpe-rolls-bags',
    name: 'HDPE / LDPE Rolls & Bags',
    category: 'bags',
    image: '/images/products/hdpe-ldpe-rolls-bags.jpg',
    short: 'Durable and flexible solutions for multiple applications.',
    description:
      'High- and low-density polyethylene rolls and bags offering the right balance of strength, flexibility and moisture protection.',
    uses: ['Industrial liners', 'Shopping and carry bags', 'Food-grade and general packing'],
    options: ['Custom gauge and size', 'Natural, white or coloured', 'Printed or plain'],
  },
  {
    slug: 'pvc-sheets-shrink-films',
    name: 'PVC Sheets & PVC Shrink Films',
    category: 'films',
    image: '/images/products/pvc-sheets.jpg',
    short: 'Reliable PVC solutions for industrial and commercial use.',
    description:
      'Rigid and flexible PVC sheets and shrink films for display, protection and tamper-evident sealing.',
    uses: ['Box and product overwrap', 'Bottle neck and cap sealing', 'Display and stationery'],
    options: ['Various thickness', 'Clear and coloured', 'Sheets or rolls'],
  },
  {
    slug: 'printed-gum-tape',
    name: 'Printed Gum Tape & Packaging Tape',
    category: 'strapping',
    image: '/images/products/printed-gum-tape.jpg',
    short: 'Custom printed and plain tapes for secure sealing.',
    description:
      'Strong-adhesion packaging tapes in clear, brown and custom-printed versions that seal cartons and promote your brand in transit.',
    uses: ['Carton sealing', 'Branded shipping', 'Warehouse and logistics'],
    options: ['Your logo printed', 'Multiple widths and lengths', 'Clear, brown or white'],
  },
  {
    slug: 'food-packaging',
    name: 'Food Packaging & One-Time Products',
    category: 'disposable',
    image: '/images/products/food-packaging.jpg',
    short: 'Hygienic and convenient solutions for the food industry.',
    description:
      'Food containers, boxes and bowls designed for safe, hygienic take-away and delivery.',
    uses: ['Restaurants and take-away', 'Catering and events', 'Food delivery'],
    options: ['Various sizes', 'With or without lids', 'Bulk supply'],
  },
  {
    slug: 'disposable-cups-plates',
    name: 'Disposable Cups, Glasses, Plates & Spoons',
    category: 'disposable',
    image: '/images/products/disposable-cups-plates.jpg',
    short: 'Everyday disposables for food service and events.',
    description:
      'A complete range of single-use cups, glasses, plates and cutlery for food service, offices and events.',
    uses: ['Cafés and restaurants', 'Offices and canteens', 'Events and catering'],
    options: ['Multiple sizes', 'Clear or white', 'Bulk cartons'],
  },
  {
    slug: 'garments-plastic-accessories',
    name: 'Garments & Plastic Accessories',
    category: 'accessories',
    image: '/images/products/garments-accessories.jpg',
    short: 'Wide range of plastic accessories for the garments industry.',
    description:
      'Hangers, collar supports, clips and other plastic accessories that keep garments shaped and presentation-ready.',
    uses: ['Garment finishing and folding', 'Retail presentation', 'Export packing'],
    options: ['Standard and custom sizes', 'Black, white or clear', 'Bulk supply'],
  },
  {
    slug: 'customized-packaging',
    name: 'Customized Packaging Solutions',
    category: 'accessories',
    image: '/images/products/custom-packaging.jpg',
    short: 'Tailored packaging to meet your unique requirements.',
    description:
      'Tell us the product, the size and the look — we develop packaging around your exact needs, from material choice to printing.',
    uses: ['New product launches', 'Special sizes and formats', 'Private label and branding'],
    options: ['Material selection', 'Custom printing', 'Flexible order quantities'],
  },
]

export const industries = [
  { name: 'Industrial Manufacturing', text: 'Strong packaging for a stronger supply chain.', image: '/images/industries/industrial.jpg' },
  { name: 'Food & Beverage', text: 'Safe, hygienic and reliable packaging.', image: '/images/industries/food.jpg' },
  { name: 'Garments & Textiles', text: 'Packaging solutions for a global industry.', image: '/images/industries/garments.jpg' },
  { name: 'Retail & Consumer Goods', text: 'Flexible packaging for everyday needs.', image: '/images/industries/retail.jpg' },
]

export const capabilities = [
  {
    title: 'Film Extrusion & Conversion',
    text: 'LDPE, HDPE and other plastic films produced with consistent thickness, clarity and strength.',
    image: '/images/film-extrusion.jpg',
  },
  {
    title: 'Flexo & Gravure Printing',
    text: 'High-quality printing for custom designs with sharp output and vibrant results.',
    image: '/images/printing-press.jpg',
  },
  {
    title: 'Slitting & Rewinding',
    text: 'Precision slitting and rewinding to meet specific size and roll requirements.',
    image: '/images/slitting.jpg',
  },
  {
    title: 'Bag Making & Fabrication',
    text: 'PP, BOPP, HDPE and LDPE bags and sheets in various sizes and specifications.',
    image: '/images/bag-making.jpg',
  },
  {
    title: 'Food & Disposable Packaging',
    text: 'Cups, glasses, plates, spoons and other hygienic one-time use products.',
    image: '/images/products/disposable-cups-plates.jpg',
  },
  {
    title: 'Custom Packaging Solutions',
    text: 'Tailored solutions based on client requirements across industries.',
    image: '/images/products/custom-packaging.jpg',
  },
]

export const waLink = (text) =>
  `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`

export const mailLink = (subject, body = '') =>
  `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
