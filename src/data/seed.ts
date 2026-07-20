import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read config
const configPath = path.resolve(__dirname, '../../firebase-applet-config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const app = initializeApp(config);
const db = getFirestore(app, config.firestoreDatabaseId);

const categories = [
  "Batteries",
  "Engine Oil & Lubricants",
  "Car Accessories",
  "Filters",
  "Brake Components",
  "Car Care Products"
];

const products = [
  {
    name: "Exide Mileage 35Ah Car Battery",
    description: "Long-lasting, maintenance-free car battery for reliable starts.",
    longDescription: "The Exide Mileage series is designed for Indian road conditions, offering robust performance and a long lifespan. It features advanced lead-acid technology ensuring quick engine starts and consistent power supply to all electrical components.",
    price: 3499,
    category: "Batteries",
    image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=1200&auto=format&fit=crop"
    ],
    features: ["Maintenance-free", "High cranking power", "Spill-proof design", "48-month warranty"],
    specifications: {
      "Capacity": "35 Ah",
      "Voltage": "12V",
      "Weight": "10.5 kg",
      "Dimensions": "197 x 129 x 227 mm"
    },
    inStock: true
  },
  {
    name: "Mobil 1 Advanced Full Synthetic 5W-30",
    description: "Premium full synthetic motor oil for ultimate engine protection.",
    longDescription: "Mobil 1 5W-30 is an advanced full synthetic engine oil designed to keep your engine running like new by providing exceptional wear protection, cleaning power, and overall performance. It meets or exceeds the requirements of the industry's toughest standards.",
    price: 2150,
    category: "Engine Oil & Lubricants",
    image: "https://images.unsplash.com/photo-1635784346087-0b1a134812f1?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1635784346087-0b1a134812f1?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?q=80&w=1200&auto=format&fit=crop"
    ],
    features: ["Advanced full synthetic formula", "Outstanding thermal and oxidation stability", "Excellent low-temperature capabilities"],
    specifications: {
      "Viscosity": "5W-30",
      "Volume": "3.5 Liters",
      "Type": "Full Synthetic",
      "Vehicle Type": "Petrol/Diesel Cars"
    },
    inStock: true
  },
  {
    name: "Premium Dashboard Camera 4K",
    description: "High-resolution dash cam with night vision and parking monitor.",
    longDescription: "Capture every detail on the road with this 4K Ultra HD dashboard camera. Featuring a wide-angle lens, superior night vision, and a built-in G-sensor for emergency recording, it provides peace of mind during every journey.",
    price: 5499,
    category: "Car Accessories",
    image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=1200&auto=format&fit=crop"
    ],
    features: ["4K Ultra HD Recording", "170° Wide Angle Lens", "Super Night Vision", "24H Parking Monitor"],
    specifications: {
      "Resolution": "3840x2160P",
      "Screen Size": "3.0 Inches",
      "Storage": "Up to 128GB MicroSD",
      "Connectivity": "Wi-Fi & App Control"
    },
    inStock: true
  },
  {
    name: "Bosch High-Performance Air Filter",
    description: "Improves engine airflow and performance while filtering out dust.",
    longDescription: "Bosch air filters are designed to protect your engine by capturing 98% of airborne contaminants. A clean air filter improves fuel efficiency, increases acceleration, and prolongs engine life.",
    price: 450,
    category: "Filters",
    image: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=1200&auto=format&fit=crop"
    ],
    features: ["High filtration efficiency", "Protects engine from wear", "Improves fuel economy", "Easy installation"],
    specifications: {
      "Brand": "Bosch",
      "Material": "Cellulose/Synthetic Blend",
      "Lifespan": "Up to 15,000 km",
      "Compatibility": "Universal Fit (Check Manual)"
    },
    inStock: true
  },
  {
    name: "Ceramic Brake Pads Set",
    description: "Low-dust, quiet, and high-stopping power ceramic brake pads.",
    longDescription: "Upgrade your braking performance with these premium ceramic brake pads. Engineered for minimal dust, quiet operation, and consistent stopping power under various driving conditions. They offer a longer lifespan compared to traditional semi-metallic pads.",
    price: 1850,
    category: "Brake Components",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376713253-716766442655?q=80&w=1200&auto=format&fit=crop"
    ],
    features: ["Ultra-quiet braking", "Low dust formula", "Enhanced stopping power", "Includes hardware kit"],
    specifications: {
      "Material": "Ceramic",
      "Position": "Front",
      "Wear Sensor": "Included",
      "Warranty": "1 Year"
    },
    inStock: true
  },
  {
    name: "Premium Carnauba Car Wax",
    description: "Deep gloss shine and long-lasting protection for your car's paint.",
    longDescription: "Give your vehicle a showroom shine with our Premium Carnauba Car Wax. Formulated with natural carnauba, it provides a deep, reflective gloss while offering durable protection against UV rays, water spots, and environmental contaminants.",
    price: 699,
    category: "Car Care Products",
    image: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=800&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=1200&auto=format&fit=crop"
    ],
    features: ["Natural Carnauba formula", "Deep, wet-look shine", "UV protection", "Easy to apply and wipe off"],
    specifications: {
      "Volume": "300g",
      "Form": "Paste",
      "Applicator": "Included",
      "Safe for Clear Coats": "Yes"
    },
    inStock: true
  }
];

async function seed() {
  console.log('Seeding categories...');
  const categoryMap: Record<string, string> = {};
  
  for (const catName of categories) {
    const docRef = doc(collection(db, 'categories'));
    await setDoc(docRef, {
      name: catName,
      createdAt: serverTimestamp()
    });
    categoryMap[catName] = docRef.id;
    console.log(`Created category: ${catName} (${docRef.id})`);
  }

  console.log('Seeding products...');
  for (const prod of products) {
    const docRef = doc(collection(db, 'products'));
    await setDoc(docRef, {
      name: prod.name,
      description: prod.description,
      longDescription: prod.longDescription,
      price: prod.price,
      categoryId: categoryMap[prod.category] || '',
      image: prod.image,
      images: prod.images,
      features: prod.features,
      specifications: prod.specifications,
      inStock: prod.inStock,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    console.log(`Created product: ${prod.name}`);
  }
  
  console.log('Seeding complete!');
  process.exit(0);
}

seed().catch(console.error);
