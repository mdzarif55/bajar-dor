
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const mongoUrl = process.env.MONGODB_URL;

if (!mongoUrl) {
  throw new Error("MONGODB_URL is missing from environment variables");
}

const client = new MongoClient(mongoUrl);
const db = client.db("Bajar-Dor");

const trustedOrigins = [
  "http://localhost:3000",
  "https://bajar-dor-ruddy.vercel.app",
  "https://bajar-9prtq8aus-md-muhtasim-zarifs-projects.vercel.app",
];

export const auth = betterAuth({
  appName: "Bajar Dor",

  baseURL:
    process.env.BETTER_AUTH_URL ||
    "https://bajar-dor-ruddy.vercel.app",

  trustedOrigins,

  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    github:{
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }
  },
});
