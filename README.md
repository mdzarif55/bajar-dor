# 🛒 বাজার দর | BazarDor

**নিত্যপ্রয়োজনীয় পণ্যের দাম এক নজরে।**

BazarDor is a market-price web application designed to help people in Bangladesh explore essential product prices, review price changes, browse products by category, and compare prices across markets where data is available.

## 🌐 Live Website

**Visit:** [https://bajar-dor-ruddy.vercel.app/](https://bajar-dor-ruddy.vercel.app/)

## ✨ Key Features

1. **Product Price Tracking** — View essential products and their available market prices.
2. **Price Change Insights** — Review previous prices and see whether prices have increased or decreased when this data is available.
3. **Category-Based Browsing** — Explore products by category.
4. **Market Comparison** — Compare listed prices across markets where comparison data is provided.
5. **Authentication** — Sign-in options can include Google and GitHub through Better Auth, depending on the configured deployment.

## 🧰 Technologies Used

- **Next.js** — React framework and application routing
- **React** — User interface
- **TypeScript** — Type-safe JavaScript
- **Tailwind CSS** — Styling and responsive layouts
- **MongoDB** — Database
- **Better Auth** — Authentication
- **Google OAuth and GitHub OAuth** — Social sign-in providers, when configured
- **REST API** — Product and category data

> Keep the technology and feature lists aligned with what is actually implemented in your repository.

## 🚀 Run Locally

### Prerequisites

- Node.js (use a version supported by your installed Next.js version)
- npm
- Access to the required API and database services, if used by the project

### 1. Clone the repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd <YOUR_PROJECT_FOLDER>
```

Replace the placeholders with your actual GitHub repository URL and folder name.

### 2. Install dependencies

```bash
npm install
```

If the repository includes a `package-lock.json`, you can use `npm ci` for a clean install.

### 3. Configure environment variables

Create a `.env.local` file in the project root. Add the variable names required by your code and deployment configuration. For example:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_long_random_secret
BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

These are examples, not guaranteed variable names for your project. Check your auth/database configuration and use the exact names it reads. Only include providers that your project uses.

**Security:** Never commit `.env.local`, database credentials, OAuth client secrets, or authentication secrets to Git. Do not expose secrets using `NEXT_PUBLIC_` variables.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Check `package.json` for the actual scripts available in your project.

## ☁️ Deployment on Vercel

The live site is hosted at [https://bajar-dor-ruddy.vercel.app/](https://bajar-dor-ruddy.vercel.app/).

To deploy your own version:

1. Push the project to a GitHub repository.
2. Sign in to Vercel and import the repository.
3. Confirm the framework is detected as Next.js and verify the build settings.
4. In **Project Settings → Environment Variables**, add the required production variables (database URL, Better Auth secret/base URL, OAuth credentials, and any other variables used by the project).
5. Update the Google/GitHub OAuth callback URLs to match the domain and callback paths configured by your app.
6. Deploy the project. After changing environment variables, redeploy so the new deployment receives them.
7. Test the homepage, product/category pages, database/API requests, and each enabled sign-in provider.

Environment variables are configured per deployment environment in Vercel, and changes apply to new deployments. See the [Vercel environment variables guide](https://vercel.com/docs/environment-variables/managing-environment-variables).

## 🗂️ Common Commands

```bash
npm install       # Install dependencies
npm run dev       # Run locally in development mode
npm run build     # Build for production
npm run start     # Start the production server (after building)
```

These commands depend on the scripts defined in your `package.json`.

## ⚠️ Price Disclaimer

সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।

## 🎯 Project Goal

BazarDor aims to make essential market-price information easier to access and compare, helping users make more informed everyday shopping decisions.

---

**বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।**
