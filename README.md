# TiendaNext

Online store developed with Next.js, React, and TypeScript.

## GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages. To set up the deployment:

1. Go to your repository settings on GitHub
2. Navigate to "Pages" in the sidebar
3. Under "Build and deployment":
   - Source: Select "GitHub Actions"
   - Branch: Select "main"

## Local Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

## Technologies Used

- Next.js 15.3.0
- React 19
- TypeScript
- MongoDB
- Tailwind CSS

## Project Structure

```
src/
├── app/            # Application routes and pages
├── components/     # Reusable components
├── models/         # MongoDB data models
├── lib/            # Utilities and helper functions
├── data/           # Static/initial data
└── middleware.ts   # Application middleware
```

## Features

- 📋 Product listing
- 🔍 Individual product details
- ✏️ Product editing
- ❌ Product deletion
- ➕ Add new products
- 💾 MongoDB storage
- 🔄 Offline mode with localStorage backup

## Prerequisites

- Node.js 18.0.0 or higher
- MongoDB (for local development)
- Railway account (for deployment)

## Local Setup

1. Clone this repository
```bash
git clone <your-repository-url>
cd my-app
```

2. Create a `.env.local` file with the following variables:
```
MONGODB_URI=mongodb://localhost:27017/tiendanext
BASE_URL=http://localhost:3000
```

4. Start the development server
```bash
npm run dev
```

## How to Deploy to Railway

### Step 1: Prepare Your Project for Railway

1. Ensure your project is on GitHub.
2. Verify that your application works correctly locally.

### Step 2: Configure Your Project in Railway

1. Create an account on [Railway](https://railway.app/) if you don't have one.
2. Click "New Project" and select "Deploy from GitHub repo".
3. Select your GitHub repository.
4. Railway will automatically start the deployment. Wait for it to complete.

### Step 3: Add a MongoDB Database

1. In your Railway project dashboard, click "New" and select "Database".
2. Select "MongoDB".
3. Wait for the database to be created.

### Step 4: Configure Environment Variables

1. In your Railway project, select the "Variables" tab.
2. Add the following environment variables:
   - `MONGODB_URI`: Railway will automatically provide this variable after creating the database.
   - `BASE_URL`: Set to your deployed application URL (will be provided by Railway).

### Step 5: Verify Deployment

1. Once the deployment is complete, Railway will provide you with a URL.
2. Visit that URL to verify that your application has been deployed correctly.

## Project Structure

```
/
├── src/
│   ├── app/               # Application pages and routes
│   ├── components/        # Reusable components
│   ├── data/             # Sample data
│   ├── lib/              # Utilities and database connection
│   └── models/           # MongoDB models
├── public/               # Static files
└── ...                   # Configuration files
```

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Railway Guide](https://docs.railway.app/)
