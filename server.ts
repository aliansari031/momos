import express from "express";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { MongoClient, ObjectId } from "mongodb";

// Resolve __dirname and __filename in dynamic hybrid module environments
const _filename = typeof __filename !== "undefined" ? __filename : "";
const _dirname = typeof __dirname !== "undefined" ? __dirname : "";

const app = express();
const PORT = 3000;
const JWT_SECRET = process.env.JWT_SECRET || "momos_kingdom_royal_secret_2026";
const MONGODB_URI = process.env.MONGODB_URI || "";

app.use(express.json());

// JSON File DB Path
const LOCAL_DB_PATH = path.join(process.cwd(), "db.json");

// Define Initial Database Seed Data
const INITIAL_SEED_DATA = {
  admin: {
    username: "admin@momoskingdom.com",
    passwordHash: "", // To be hashed during init
  },
  settings: {
    address: "Royal Food Street, Block 4, Clifton, Karachi, Pakistan",
    phone: "+92 318 9212223",
    bookingPhone: "+92 318 9212223",
    whatsapp: "923189212223",
    businessHours: "Monday - Sunday: 12:00 PM - 2:00 AM",
    facebook: "https://facebook.com/momoskingdom",
    instagram: "https://instagram.com/momoskingdom",
    twitter: "https://twitter.com/momoskingdom",
    logoUrl: "", 
    bannerText: "✨ THE KINGDOM HAS EXPANDED! CHICKEN GOLD STEAM MOMOS NOW AVAILABLE ✨",
    heroTitle: "Savor the Steamed Royalty of Elite Taste",
    heroSubtitle: "Welcome to Momos Kingdom. Crafting Karachi's ultimate luxury street food dumplings with gold-foil spray, crispy coatings, and molten cheese stuffing.",
  },
  seo: {
    title: "Momos Kingdom | Premium Luxury Dumplings in Karachi",
    description: "Discover Karachi's finest luxury food street momos. Momos Kingdom serves premium steam, deep-fried crispy, molten cheese, and fiery wok-tossed Schezwan dumplings.",
    keywords: "Momos in Karachi, Best momos, Momos Kingdom, Fast food in Karachi, Steam momos, Fried momos, Gold momos Karachi, Cheese momos, Clifton momos",
    canonicalUrl: "https://momoskingdom.com",
    ogTitle: "Momos Kingdom | The Royal Taste of Dumplings",
    ogDescription: "Bite into juicy perfection. Our artisanal dumplings are prepared with premium local spices and served with a majestic golden highlights twist.",
    ogImage: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=800",
  },
  categories: [
    { id: "steam", name: "Imperial Steamed" },
    { id: "fried", name: "Royal Crispy Fried" },
    { id: "spicy", name: "Sizzling Chili Wok" },
    { id: "cheese", name: "Majestic Melted Cheese" },
  ],
  products: [
    {
      id: "p1",
      name: "Golden Emperor Steam Momos",
      category: "steam",
      price: 490,
      description: "Artisanal minced seasoned chicken dumplings, wrapped meticulously and steamed to juicy imperial perfection. Sprayed with finest edible gold luster dust.",
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=650",
      tags: ["Signature 👑", "Steamed", "Best Seller"],
      available: true,
      featured: true,
    },
    {
      id: "p2",
      name: "Majestic Jade Veg Dumplings",
      category: "steam",
      price: 450,
      description: "Creamy hand-pressed organic cottage cheese (paneer) folded with fresh baby spinach, spring scallions, and delicate royal herbs, cooked in bamboo steamers.",
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=650",
      tags: ["Vegetarian 🌱", "Steamed"],
      available: true,
      featured: false,
    },
    {
      id: "p3",
      name: "Kingdom's Crispy Gold Fry",
      category: "fried",
      price: 520,
      description: "Fierce, crunchy deep-fried chicken momos double-coated with custom premium multi-grain breading, served with custom spiced chili garlic oil sauce.",
      image: "https://images.unsplash.com/photo-1625220194771-7ebded05fbe1?auto=format&fit=crop&q=80&w=650",
      tags: ["Ultra Crispy ⚡", "Fried"],
      available: true,
      featured: true,
    },
    {
      id: "p4",
      name: "Sizzling Schezwan Chili Toss",
      category: "spicy",
      price: 580,
      description: "Pan-seared momos aggressively tossed in custom blistering cast iron skillet with toasted ginger, red jalapeno capsicums, coriander, and house special Schezwan chili paste.",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=650",
      tags: ["Fiery Spicy 🔥", "Wok Tossed"],
      available: true,
      featured: true,
    },
    {
      id: "p5",
      name: "Molten Crown Triple Cheese Momos",
      category: "cheese",
      price: 650,
      description: "Baked to bubbly heaven. Ground chicken momos loaded inside with molten cheddar, mozzarella, and dynamic cream cheese blend, with Italian oregano sprinkling.",
      image: "https://images.unsplash.com/photo-1625220194771-7ebded05fbe1?auto=format&fit=crop&q=80&w=650",
      tags: ["Extra Cheesy 🧀", "Decadent"],
      available: true,
      featured: true,
    },
    {
      id: "p6",
      name: "Honey Garlic Glaze Crispy",
      category: "spicy",
      price: 560,
      description: "Crispy fried momos tossed in a sticky, sweet & savory hand-prepared dark soy, honey, and toasted brown garlic glaze.",
      image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=650",
      tags: ["Sweet & Savory", "Crispy"],
      available: true,
      featured: false,
    }
  ],
  advertisements: [
    {
      id: "ad-1",
      title: "👑 Limited Royal Feast Offer 👑",
      image: "https://images.unsplash.com/photo-1625220194771-7ebded05fbe1?auto=format&fit=crop&q=80&w=800",
      videoUrl: "",
      redirectUrl: "#offers",
      popupTiming: 2000,
      active: true,
      priority: 1,
      scheduleStart: "2026-01-01",
      scheduleEnd: "2027-12-31"
    }
  ],
  reviews: [
    {
      id: "r1",
      name: "Zainab Ahmed",
      rating: 5,
      comment: "Absolutely the finest momos in Karachi. The Golden Emperor feels like dining inside a high-end palace. Juicy, rich and exceptionally high-end packaging!",
      date: "2026-05-20",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: "r2",
      name: "Mustafa Kamal",
      rating: 5,
      comment: "The Sizzling Schezwan pan-fried momos are genuinely hot and flavorsome. Excellent service and clean presentation.",
      date: "2026-05-18",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
    },
    {
      id: "r3",
      name: "Sarah S. Khan",
      rating: 5,
      comment: "Unmatched luxury branding! The molten cheese momos were completely outstanding. Tastes exactly like a premium international chain.",
      date: "2026-05-22",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
    }
  ],
  gallery: [
    { id: "g1", title: "Royal Bamboo Steamer Handcraft", url: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600" },
    { id: "g2", title: "Ultimate Golden Crunch Coating", url: "https://images.unsplash.com/photo-1625220194771-7ebded05fbe1?auto=format&fit=crop&q=80&w=600" },
    { id: "g3", title: "Blazing Hot Chili Pan Sear", url: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=600" },
    { id: "g4", title: "Premium Garlic Chili Oil Drizzles", url: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&q=80&w=600" },
  ],
  offers: [
    { id: "of1", title: "Kingdom Welcome Special", description: "Get a royalty 20% discount on orders of PKR 1,200 or more.", code: "ROYAL20", discount: "20% OFF" },
    { id: "of2", title: "Steamed Feast Trio", description: "Buy any 2 Steam momos and get 1 Golden Emperor FREE!", code: "EMPERORBOGO", discount: "BUY 2 GET 1" },
    { id: "of3", title: "Free Mint Lemonade Combo", description: "Free homemade sparkling mint lemonade on any hot Schezwan order.", code: "MINTYFREE", discount: "FREE DRINK" }
  ]
};

// Database Engine (swappable LocalJSON / MongoDB)
let isMongo = false;
let mongoClient: MongoClient | null = null;
let dbInstance: any = null;

async function initDatabase() {
  // Generate default password hash for admin (momos123)
  const defaultHash = await bcrypt.hash("momos123", 10);
  INITIAL_SEED_DATA.admin.passwordHash = defaultHash;

  if (MONGODB_URI) {
    try {
      console.log("Attempting to connect to MongoDB Atlas...");
      mongoClient = new MongoClient(MONGODB_URI);
      await mongoClient.connect();
      dbInstance = mongoClient.db("momos_kingdom");
      isMongo = true;
      console.log("🚀 Successfully connected to MongoDB Database!");

      // Ensure seed data is initialized if collections are empty
      const colAdmin = dbInstance.collection("admin");
      const count = await colAdmin.countDocuments();
      if (count === 0) {
        console.log("Seeding MongoDB collections with beautiful starter data...");
        await dbInstance.collection("admin").insertOne(INITIAL_SEED_DATA.admin);
        await dbInstance.collection("settings").insertOne(INITIAL_SEED_DATA.settings);
        await dbInstance.collection("seo").insertOne(INITIAL_SEED_DATA.seo);
        await dbInstance.collection("categories").insertMany(INITIAL_SEED_DATA.categories);
        await dbInstance.collection("products").insertMany(INITIAL_SEED_DATA.products);
        await dbInstance.collection("advertisements").insertMany(INITIAL_SEED_DATA.advertisements);
        await dbInstance.collection("reviews").insertMany(INITIAL_SEED_DATA.reviews);
        await dbInstance.collection("gallery").insertMany(INITIAL_SEED_DATA.gallery);
        await dbInstance.collection("offers").insertMany(INITIAL_SEED_DATA.offers);
      }
      return;
    } catch (e) {
      console.warn("MongoDB connection failed, falling back to JSON local file database. Error: ", e);
    }
  }

  // Fallback / standard local JSON DB connection
  try {
    await fs.access(LOCAL_DB_PATH);
    const raw = await fs.readFile(LOCAL_DB_PATH, "utf-8");
    // Ensure all keys are populated
    const parsed = JSON.parse(raw);
    let dirty = false;
    for (const key of Object.keys(INITIAL_SEED_DATA)) {
      if (!parsed[key]) {
        parsed[key] = (INITIAL_SEED_DATA as any)[key];
        dirty = true;
      }
    }
    if (dirty) {
      await fs.writeFile(LOCAL_DB_PATH, JSON.stringify(parsed, null, 2), "utf-8");
    }
    console.log("📂 JSON File Database running successfully at:", LOCAL_DB_PATH);
  } catch {
    console.log("Creating brand new JSON File Database seed content at:", LOCAL_DB_PATH);
    await fs.mkdir(path.dirname(LOCAL_DB_PATH), { recursive: true }).catch(() => {});
    await fs.writeFile(LOCAL_DB_PATH, JSON.stringify(INITIAL_SEED_DATA, null, 2), "utf-8");
  }
}

// Global DB helper to retrieve structured collections
async function getCollectionData(collectionName: string): Promise<any[]> {
  if (isMongo && dbInstance) {
    const cursor = dbInstance.collection(collectionName).find({});
    return await cursor.toArray();
  } else {
    try {
      const raw = await fs.readFile(LOCAL_DB_PATH, "utf-8");
      const state = JSON.parse(raw);
      return state[collectionName] || [];
    } catch {
      return (INITIAL_SEED_DATA as any)[collectionName] || [];
    }
  }
}

async function getDocument(collectionName: string): Promise<any> {
  if (isMongo && dbInstance) {
    return await dbInstance.collection(collectionName).findOne({});
  } else {
    try {
      const raw = await fs.readFile(LOCAL_DB_PATH, "utf-8");
      const state = JSON.parse(raw);
      return state[collectionName] || (INITIAL_SEED_DATA as any)[collectionName];
    } catch {
      return (INITIAL_SEED_DATA as any)[collectionName];
    }
  }
}

async function saveDocument(collectionName: string, doc: any): Promise<void> {
  if (isMongo && dbInstance) {
    await dbInstance.collection(collectionName).replaceOne({}, doc, { upsert: true });
  } else {
    const raw = await fs.readFile(LOCAL_DB_PATH, "utf-8");
    const state = JSON.parse(raw);
    state[collectionName] = doc;
    await fs.writeFile(LOCAL_DB_PATH, JSON.stringify(state, null, 2), "utf-8");
  }
}

async function saveCollectionData(collectionName: string, items: any[]): Promise<void> {
  if (isMongo && dbInstance) {
    // Overwrite the whole mock collection state for simple CMS-wide sync
    await dbInstance.collection(collectionName).deleteMany({});
    if (items.length > 0) {
      await dbInstance.collection(collectionName).insertMany(items);
    }
  } else {
    const raw = await fs.readFile(LOCAL_DB_PATH, "utf-8");
    const state = JSON.parse(raw);
    state[collectionName] = items;
    await fs.writeFile(LOCAL_DB_PATH, JSON.stringify(state, null, 2), "utf-8");
  }
}

// Initialize database safely (wrapped inside the startup bootstrap block)

// --- API IMPLEMENTATIONS ---

// JWT auth middleware
function authorizeAdmin(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied. Auth token required." });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.adminUser = decoded;
    next();
  } catch {
    res.status(403).json({ error: "Invalid or expired authorization credentials." });
  }
}

// 1. PUBLIC: Fetch all CMS dynamic items in one optimized batch
app.get("/api/public/data", async (req, res) => {
  try {
    const products = await getCollectionData("products");
    const categories = await getCollectionData("categories");
    const advertisements = await getCollectionData("advertisements");
    const reviews = await getCollectionData("reviews");
    const gallery = await getCollectionData("gallery");
    const offers = await getCollectionData("offers");
    const seo = await getDocument("seo");
    const settings = await getDocument("settings");

    res.json({
      products,
      categories,
      advertisements,
      reviews,
      gallery,
      offers,
      seo,
      settings,
    });
  } catch (err: any) {
    res.status(500).json({ error: "Unable to retrieve site content.", message: err.message });
  }
});

// 2. ADMIN: Authenticate admin & generate state token
app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ error: "Please enter your username and password." });
  }

  try {
    const adminDoc = await getDocument("admin");
    const checkUser = adminDoc.username;
    
    if (username.toLowerCase() !== checkUser.toLowerCase()) {
      return res.status(401).json({ error: "Invalid administration credentials." });
    }

    const validPass = await bcrypt.compare(password, adminDoc.passwordHash);
    if (!validPass) {
      return res.status(401).json({ error: "Incorrect administration password." });
    }

    const token = jwt.sign({ username: checkUser, role: "admin" }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, username: checkUser });
  } catch (err: any) {
    res.status(500).json({ error: "Login failed.", message: err.message });
  }
});

// 3. ADMIN: Validate current JWT Token
app.get("/api/admin/validate", authorizeAdmin, (req: any, res) => {
  res.json({ status: "success", user: req.adminUser });
});

// 4. ADMIN: Save entire configuration for collection (replace list)
app.post("/api/admin/collection/:id", authorizeAdmin, async (req, res) => {
  const { id } = req.params; // collection slug name i.e. 'products', 'categories', 'advertisements', etc
  const listItems = req.body;
  if (!Array.isArray(listItems)) {
    return res.status(400).json({ error: "Expected an array payload." });
  }
  try {
    await saveCollectionData(id, listItems);
    res.json({ success: true, count: listItems.length });
  } catch (err: any) {
    res.status(500).json({ error: `Failed to commit to collection ${id}`, message: err.message });
  }
});

// 5. ADMIN: Save single object document updates (SEO, Settings, of Admin Auth)
app.put("/api/admin/single/:id", authorizeAdmin, async (req, res) => {
  const { id } = req.params; // string name 'seo' or 'settings' or 'admin' 
  const data = req.body;
  try {
    if (id === "admin") {
      // If updating admin, hash password if provided
      const current = await getDocument("admin");
      if (data.password) {
        current.passwordHash = await bcrypt.hash(data.password, 10);
      }
      if (data.username) {
        current.username = data.username;
      }
      await saveDocument("admin", current);
      return res.json({ success: true, message: "Admin credentials changed successfully." });
    }

    await saveDocument(id, data);
    res.json({ success: true, data });
  } catch (err: any) {
    res.status(500).json({ error: `Failed to save page configuration ${id}`, message: err.message });
  }
});

// 6. ANALYTICS: Summary metadata count for dashboard
app.get("/api/admin/analytics", authorizeAdmin, async (req, res) => {
  try {
    const products = await getCollectionData("products");
    const categories = await getCollectionData("categories");
    const reviews = await getCollectionData("reviews");
    const ads = await getCollectionData("advertisements");
    const offers = await getCollectionData("offers");

    const totalProducts = products.length;
    const totalCategories = categories.length;
    const totalOffers = offers.length;
    const totalReviews = reviews.length;
    const avgRating = reviews.length > 0 
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) 
      : "5.0";

    res.json({
      totalProducts,
      totalCategories,
      totalOffers,
      totalReviews,
      avgRating,
      adsCount: ads.length,
      recentReviews: reviews.slice(0, 3),
      systemInfo: {
        nodeVersion: process.version,
        databaseType: isMongo ? "MongoDB Connected" : "Local JSON Sandbox DB",
        environment: process.env.NODE_ENV || "development",
        uptimeSeconds: Math.floor(process.uptime()),
      }
    });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to load dashboard statistics.", message: err.message });
  }
});


// --- SERVER INITIATION BOOTSTRAP OVERRIDE ---
async function bootstrapServer() {
  // 1. Initialize database safely
  await initDatabase();

  // 2. Setup Vite dev middleware or static prod routes
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Standard spa routing catch all matching Express rules
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // 3. Hear ports and bind interface
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✨ Express server running on port ${PORT}`);
  });
}

bootstrapServer().catch((err) => {
  console.error("Critical server bootstrap crashed: ", err);
});
