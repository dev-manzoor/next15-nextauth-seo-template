# Next.js 15 + NextAuth.js + SEO Template

This is a [Next.js](https://nextjs.org) project with authentication powered by [NextAuth.js](https://next-auth.js.org) and optimized for SEO.

## Getting Started

### 1. Environment Setup

Copy the `.env.local` file and update the following variables:

```bash
# Copy the existing .env.local file
cp .env.local .env.local.backup

# Update the backend API URLs to point to your actual backend
BACKEND_API_URL="https://your-backend-api.com/api"
NEXT_PUBLIC_BACKEND_API_URL="https://your-backend-api.com/api"
```

### Development Mode

If you don't have a backend API set up, the application will run in development mode with mock authentication:

**Test Credentials:**

- Email: `admin@example.com`
- Password: `password`

When `BACKEND_API_URL` is not set in development mode, the app will use mock authentication that allows you to test the full authentication flow without a real backend.

### Production Setup

For production, make sure to:

1. Set the `BACKEND_API_URL` environment variable to your production API
2. Ensure your backend API implements the required endpoints
3. Update the `NEXT_PUBLIC_BACKEND_API_URL` for client-side requests

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Authentication

This project uses NextAuth.js v5 (Auth.js) with JWT strategy. The authentication flow includes:

- **Login**: Users can sign in with email and password
- **Registration**: New users can create accounts
- **Session Management**: JWT tokens with automatic refresh
- **Protected Routes**: Dashboard and other protected pages

### Backend API Requirements

Your backend API should return the following structure for authentication:

**Login Response** (`POST /auth/login`):

```json
{
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name"
  },
  "token": {
    "accessToken": "jwt-access-token",
    "refreshToken": "jwt-refresh-token",
    "expiresIn": 3600
  }
}
```

**Refresh Response** (`POST /auth/refresh`):

```json
{
  "accessToken": "new-jwt-access-token",
  "refreshToken": "new-jwt-refresh-token",
  "expiresIn": 3600
}
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── (auth)/            # Authentication pages
│   ├── dashboard/         # Protected dashboard
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── auth/             # Authentication components
│   ├── ui/               # UI components (shadcn/ui)
│   └── layout/           # Layout components
├── lib/                   # Utility libraries
│   ├── auth.ts           # NextAuth configuration
│   └── validation.ts     # Form validation
└── types/                # TypeScript definitions
```

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Authentication**: NextAuth.js v5 (Auth.js)
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **TypeScript**: Full type safety
- **Linting**: Biome

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linting
- `npm run type-check` - Run TypeScript type checking

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
