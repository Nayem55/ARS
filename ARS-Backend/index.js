require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { MongoClient, ObjectId } = require('mongodb')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const app = express()
const PORT = Number(process.env.PORT || 1022)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ars-portfolio'
const DB_NAME = new URL(MONGO_URI).pathname.slice(1) || 'ars-portfolio'
const JWT_SECRET = process.env.JWT_SECRET || 'ars-portfolio-change-this-secret'
let db

app.use(cors())
app.use(express.json({ limit: '10mb' }))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const upload = multer({
  storage: multer.diskStorage({
    destination: (_, __, cb) => cb(null, path.join(__dirname, 'uploads')),
    filename: (_, file, cb) => cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname).toLowerCase()}`),
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_, file, cb) => cb(null, /^image\/(jpeg|png|webp|gif|svg\+xml)$/.test(file.mimetype)),
})

const auth = (req, res, next) => {
  const token = req.headers.authorization?.replace(/^Bearer\s+/i, '')
  if (!token) return res.status(401).json({ error: 'No token provided' })
  try { req.admin = jwt.verify(token, JWT_SECRET); next() } catch { res.status(401).json({ error: 'Invalid or expired token' }) }
}
const slugify = (value = '') => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const cleanProduct = (body) => ({
  name: String(body.name || '').trim(), slug: slugify(body.slug || body.name), category: String(body.category || 'accessories'),
  image: String(body.image || ''), short: String(body.short || ''), description: String(body.description || ''),
  uses: Array.isArray(body.uses) ? body.uses.filter(Boolean) : String(body.uses || '').split('\n').map(x => x.trim()).filter(Boolean),
  options: Array.isArray(body.options) ? body.options.filter(Boolean) : String(body.options || '').split('\n').map(x => x.trim()).filter(Boolean),
  order: Number(body.order || 0), active: body.active !== false,
})

async function seed() {
  const admin = await db.collection('admins').findOne({ username: 'admin' })
  if (!admin) await db.collection('admins').insertOne({ username: 'admin', password: await bcrypt.hash('admin123', 10), createdAt: new Date() })
  const settings = await db.collection('siteSettings').findOne({ type: 'main' })
  if (!settings) await db.collection('siteSettings').insertOne({ type: 'main', company: defaultCompany, nav: defaultNav, categories: defaultCategories, industries: defaultIndustries, capabilities: defaultCapabilities, updatedAt: new Date() })
  if (!await db.collection('products').countDocuments()) await db.collection('products').insertMany(defaultProducts.map((p, i) => ({ ...p, order: i, active: true, createdAt: new Date() })))
}

app.get('/api/health', (_, res) => res.json({ ok: true }))
app.post('/api/auth/login', async (req, res) => {
  const admin = await db.collection('admins').findOne({ username: req.body.username })
  if (!admin || !await bcrypt.compare(req.body.password || '', admin.password)) return res.status(401).json({ error: 'Invalid credentials' })
  const token = jwt.sign({ id: admin._id.toString(), username: admin.username }, JWT_SECRET, { expiresIn: '7d' })
  res.json({ token, admin: { id: admin._id, username: admin.username } })
})
app.post('/api/auth/register', auth, async (req, res) => {
  if (!req.body.username || !req.body.password) return res.status(400).json({ error: 'Username and password are required' })
  try { await db.collection('admins').insertOne({ username: req.body.username, password: await bcrypt.hash(req.body.password, 10), createdAt: new Date() }); res.status(201).json({ ok: true }) } catch { res.status(409).json({ error: 'Username already exists' }) }
})
app.get('/api/auth/me', auth, (req, res) => res.json({ admin: req.admin }))

app.get('/api/content', async (_, res) => res.json((await db.collection('siteSettings').findOne({ type: 'main' })) || {}))
app.put('/api/content', auth, async (req, res) => {
  const current = (await db.collection('siteSettings').findOne({ type: 'main' })) || {}
  const next = { ...current, ...req.body, type: 'main', _id: current._id, updatedAt: new Date() }
  delete next._id
  await db.collection('siteSettings').updateOne({ type: 'main' }, { $set: next }, { upsert: true })
  res.json(next)
})

app.get('/api/products', async (req, res) => {
  const query = req.query.all === 'true' ? {} : { active: { $ne: false } }
  res.json(await db.collection('products').find(query).sort({ order: 1, name: 1 }).toArray())
})
app.post('/api/products', auth, async (req, res) => {
  const product = cleanProduct(req.body)
  if (!product.name) return res.status(400).json({ error: 'Product name is required' })
  if (await db.collection('products').findOne({ slug: product.slug })) return res.status(409).json({ error: 'A product already uses this slug' })
  const result = await db.collection('products').insertOne({ ...product, createdAt: new Date(), updatedAt: new Date() })
  res.status(201).json({ ...product, _id: result.insertedId })
})
app.put('/api/products/:id', auth, async (req, res) => {
  const product = cleanProduct(req.body)
  if (!product.name) return res.status(400).json({ error: 'Product name is required' })
  const exists = await db.collection('products').findOne({ slug: product.slug, _id: { $ne: new ObjectId(req.params.id) } })
  if (exists) return res.status(409).json({ error: 'A product already uses this slug' })
  await db.collection('products').updateOne({ _id: new ObjectId(req.params.id) }, { $set: { ...product, updatedAt: new Date() } })
  res.json({ ...product, _id: req.params.id })
})
app.delete('/api/products/:id', auth, async (req, res) => { await db.collection('products').deleteOne({ _id: new ObjectId(req.params.id) }); res.status(204).end() })
app.post('/api/upload', auth, upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'Please choose a supported image file' })
  res.status(201).json({ url: `${process.env.PUBLIC_URL || `http://localhost:${PORT}`}/uploads/${req.file.filename}` })
})

const defaultCompany = { name: 'Adnan Rais & Sons', short: 'ARS', tagline: 'Packaging a Better Tomorrow', proprietor: 'Hafiz Adnan Rais', role: 'Proprietor', address: '85-Khaje Dewan First Lane, Lalbagh, Dhaka-1211', phones: ['01711531797', '01971531797'], email: 'adnanrais786@gmail.com', whatsapp: '8801711531797', mapQuery: '85 Khaje Dewan First Lane, Lalbagh, Dhaka 1211, Bangladesh' }
const defaultNav = [{ label: 'Home', to: '/' }, { label: 'About Us', to: '/about' }, { label: 'Products', to: '/products' }, { label: 'Our Capabilities', to: '/capabilities' }, { label: 'Why Us', to: '/why-us' }, { label: 'Contact', to: '/contact' }]
const defaultCategories = [{ id: 'all', label: 'All Products' }, { id: 'films', label: 'Films & Sheets' }, { id: 'bags', label: 'Bags' }, { id: 'strapping', label: 'Strapping & Tapes' }, { id: 'printing', label: 'Printing' }, { id: 'disposable', label: 'Food & Disposable' }, { id: 'accessories', label: 'Accessories & Custom' }]
const defaultIndustries = [{ name: 'Industrial Manufacturing', text: 'Strong packaging for a stronger supply chain.', image: '/images/industries/industrial.jpg' }, { name: 'Food & Beverage', text: 'Safe, hygienic and reliable packaging.', image: '/images/industries/food.jpg' }, { name: 'Garments & Textiles', text: 'Packaging solutions for a global industry.', image: '/images/industries/garments.jpg' }, { name: 'Retail & Consumer Goods', text: 'Flexible packaging for everyday needs.', image: '/images/industries/retail.jpg' }]
const defaultCapabilities = [{ title: 'Film Extrusion & Conversion', text: 'LDPE, HDPE and other plastic films produced with consistent thickness, clarity and strength.', image: '/images/film-extrusion.jpg' }, { title: 'Flexo & Gravure Printing', text: 'High-quality printing for custom designs with sharp output and vibrant results.', image: '/images/printing-press.jpg' }, { title: 'Slitting & Rewinding', text: 'Precision slitting and rewinding to meet specific size and roll requirements.', image: '/images/slitting.jpg' }, { title: 'Bag Making & Fabrication', text: 'PP, BOPP, HDPE and LDPE bags and sheets in various sizes and specifications.', image: '/images/bag-making.jpg' }, { title: 'Food & Disposable Packaging', text: 'Cups, glasses, plates, spoons and other hygienic one-time use products.', image: '/images/products/disposable-cups-plates.jpg' }, { title: 'Custom Packaging Solutions', text: 'Tailored solutions based on client requirements across industries.', image: '/images/products/custom-packaging.jpg' }]
const rawProducts = [
  ['ld-shrink-films','LD Shrink Films','films','ld-shrink-films.jpg','High-quality shrink films for secure and durable packaging.','Low-density polyethylene shrink film that tightens evenly under heat to hold, protect and present products. Ideal for bundling bottles, cartons and multipacks.'],
  ['pp-strapping-belt','PP Strapping Belt','strapping','pp-strapping-belt.jpg','Strong and reliable strapping for heavy-duty packaging.','Polypropylene strapping with consistent width and tensile strength, suitable for manual tools and semi-automatic or automatic strapping machines.'],
  ['bopp-printed-bags','BOPP Printed Bags','bags','bopp-printed-bags.jpg','Custom printed bags with excellent strength and finishing.','Biaxially oriented polypropylene bags with sharp, vibrant print and a glossy or matte finish — strong enough for retail shelves and bulk goods.'],
  ['pp-rolls-bags-sheets','PP Rolls, Bags & Sheets','films','pp-rolls-bags-sheets.jpg','Versatile polypropylene solutions for various industrial needs.','Crystal-clear polypropylene in roll, bag and sheet form for presentation, protection and general-purpose packing.'],
  ['flexo-gravure-printing','Flexo & Gravure Printing','printing','flexo-gravure-printing.jpg','High-quality printing for flexible packaging materials.','Flexographic and rotogravure printing on films and laminates, delivering consistent colour and crisp detail for brand-ready packaging.'],
  ['hdpe-ldpe-rolls-bags','HDPE / LDPE Rolls & Bags','bags','hdpe-ldpe-rolls-bags.jpg','Durable and flexible solutions for multiple applications.','High- and low-density polyethylene rolls and bags offering the right balance of strength, flexibility and moisture protection.'],
  ['pvc-sheets-shrink-films','PVC Sheets & PVC Shrink Films','films','pvc-sheets.jpg','Reliable PVC solutions for industrial and commercial use.','Rigid and flexible PVC sheets and shrink films for display, protection and tamper-evident sealing.'],
  ['printed-gum-tape','Printed Gum Tape & Packaging Tape','strapping','printed-gum-tape.jpg','Custom printed and plain tapes for secure sealing.','Strong-adhesion packaging tapes in clear, brown and custom-printed versions that seal cartons and promote your brand in transit.'],
  ['food-packaging','Food Packaging & One-Time Products','disposable','food-packaging.jpg','Hygienic and convenient solutions for the food industry.','Food containers, boxes and bowls designed for safe, hygienic take-away and delivery.'],
  ['disposable-cups-plates','Disposable Cups, Glasses, Plates & Spoons','disposable','disposable-cups-plates.jpg','Everyday disposables for food service and events.','A complete range of single-use cups, glasses, plates and cutlery for food service, offices and events.'],
  ['garments-plastic-accessories','Garments & Plastic Accessories','accessories','garments-accessories.jpg','Wide range of plastic accessories for the garments industry.','Hangers, collar supports, clips and other plastic accessories that keep garments shaped and presentation-ready.'],
  ['customized-packaging','Customized Packaging Solutions','accessories','custom-packaging.jpg','Tailored packaging to meet your unique requirements.','Tell us the product, the size and the look — we develop packaging around your exact needs, from material choice to printing.']
]
const productDetails = {
  'ld-shrink-films': [['Beverage & bottle bundling','Carton and multipack wrapping','Pallet and bulk unitising'],['Custom width and gauge','Clear or tinted','Plain or printed']],
  'pp-strapping-belt': [['Carton and box sealing','Bundling garments and textiles','Securing loads for transport'],['Multiple widths and colours','Machine and manual grades','Printed strapping on request']],
  'bopp-printed-bags': [['Snacks, rice and flour','Retail and promotional packs','Garment packaging'],['Up to multi-colour printing','Gloss or matte finish','Side-gusset, zipper or handle']],
  'pp-rolls-bags-sheets': [['Garment and textile packing','Food and bakery wraps','Stationery and retail goods'],['Custom sizes and thickness','Self-adhesive flap bags','Plain or printed']],
  'flexo-gravure-printing': [['Food and snack packaging','Branded bags and wraps','Labels and laminates'],['Multi-colour registration','Laminated structures','Artwork support']],
  'hdpe-ldpe-rolls-bags': [['Industrial liners','Shopping and carry bags','Food-grade and general packing'],['Custom gauge and size','Natural, white or coloured','Printed or plain']],
  'pvc-sheets-shrink-films': [['Box and product overwrap','Bottle neck and cap sealing','Display and stationery'],['Various thickness','Clear and coloured','Sheets or rolls']],
  'printed-gum-tape': [['Carton sealing','Branded shipping','Warehouse and logistics'],['Your logo printed','Multiple widths and lengths','Clear, brown or white']],
  'food-packaging': [['Restaurants and take-away','Catering and events','Food delivery'],['Various sizes','With or without lids','Bulk supply']],
  'disposable-cups-plates': [['Cafés and restaurants','Offices and canteens','Events and catering'],['Multiple sizes','Clear or white','Bulk cartons']],
  'garments-plastic-accessories': [['Garment finishing and folding','Retail presentation','Export packing'],['Standard and custom sizes','Black, white or clear','Bulk supply']],
  'customized-packaging': [['New product launches','Special sizes and formats','Private label and branding'],['Material selection','Custom printing','Flexible order quantities']],
}
const defaultProducts = rawProducts.map(([slug,name,category,file,short,description]) => ({ slug, name, category, image: `/images/products/${file}`, short, description, uses: productDetails[slug][0], options: productDetails[slug][1] }))

async function start() { const client = new MongoClient(MONGO_URI); await client.connect(); db = client.db(DB_NAME); await db.collection('admins').createIndex({ username: 1 }, { unique: true }); await db.collection('products').createIndex({ slug: 1 }, { unique: true }); await seed(); app.listen(PORT, () => console.log(`ARS API listening on ${PORT}`)) }
start().catch(err => { console.error(err); process.exit(1) })
