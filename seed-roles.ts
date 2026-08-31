import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import * as fs from "fs";
import * as path from "path";

// Parse .env.local manually to populate process.env
try {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    envContent.split("\n").forEach((line) => {
      const parts = line.split("=");
      if (parts.length >= 2) {
        const key = parts[0].trim();
        const val = parts.slice(1).join("=").trim().replace(/^['"]|['"]$/g, "");
        if (key) {
          process.env[key] = val;
        }
      }
    });
  }
} catch (err) {
  console.warn("Could not load .env.local manually", err);
}

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "dummy-key-for-build",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

const rolesToSeed = [
  {
    id: "admin",
    name: "Admin",
    permissions: ["*"]
  },
  {
    id: "editor",
    name: "Editor",
    permissions: ["manage_blogs", "manage_solutions", "manage_comments", "manage_seo", "manage_settings"]
  },
  {
    id: "user",
    name: "User",
    permissions: []
  }
];

async function seed() {
  console.log("Starting Roles bootstrap seeding...");
  
  // Authenticate first using our pre-seeded admin credentials
  const auth = getAuth(app);
  await signInWithEmailAndPassword(auth, "admin@digitory.io", "adminPassword123");
  console.log("Authenticated as Super Administrator successfully.");

  for (const item of rolesToSeed) {
    const docRef = doc(db, "roles", item.id);
    const payload = {
      name: item.name,
      permissions: item.permissions,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    await setDoc(docRef, payload);
    console.log(`Successfully seeded Role: ${item.name} (ID: ${item.id})`);
  }
  
  console.log("Roles bootstrap seeding completed successfully!");
}

seed().catch(err => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
