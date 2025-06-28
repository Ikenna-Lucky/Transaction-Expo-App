# Transaction App

This repository contains two main projects:

- [`Backend`](Backend) — Node.js/Express REST API for transaction management, using Neon database and Upstash for rate limiting.
- [`Mobile`](Mobile) — React Native (Expo) mobile app for tracking personal transactions, with authentication via Clerk.

---

## Backend

A RESTful API built with Express.js for managing user transactions.

### Features

- **User Transactions:** Create, fetch, and delete transactions per user.
- **Summary Endpoint:** Get balance, income, and expenses summary.
- **Rate Limiting:** Upstash Redis-based rate limiting for API protection.
- **Database:** Neon (PostgreSQL-compatible) serverless database.
- **Environment Variables:** Uses `.env` for sensitive config (e.g., `DATABASE_URL`).

### Endpoints

- `POST /api/transactions/` — Create a new transaction.
- `GET /api/transactions/:userId` — Get all transactions for a user.
- `DELETE /api/transactions/:id` — Delete a transaction by ID.
- `GET /api/transactions/summary/:userId` — Get summary (balance, income, expenses) for a user.

### Setup

1. **Install dependencies:**
   ```sh
   cd Backend
   npm install
   ```

2. **Configure environment variables:**
   - Create a `.env` file with your Neon database URL:
     ```
     DATABASE_URL=your_neon_database_url
     ```

3. **Run the server:**
   ```sh
   npm start
   ```
   The server will run on `PORT` from `.env` or default to `4000`.

4. **Deploy:**  
   Vercel deployment is supported via [`vercel.json`](Backend/vercel.json).

---

## Mobile

A cross-platform mobile app built with React Native (Expo) for tracking personal transactions.

### Features

- **Authentication:** Email/password sign-in and sign-up via Clerk.
- **Transaction Management:** View, add, and delete transactions.
- **Summary Card:** See balance, income, and expenses.
- **Modern UI:** Themed, responsive, and uses Expo Router for navigation.
- **API Integration:** Connects to the backend for all transaction data.
- **Safe Area & Keyboard Handling:** Uses `react-native-safe-area-context` and `react-native-keyboard-aware-scroll-view`.

### Setup

1. **Install dependencies:**
   ```sh
   cd Mobile
   npm install
   ```

2. **Configure environment variables:**
   - Create a `.env` file with your Clerk publishable key:
     ```
     EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
     ```

3. **Start the app:**
   ```sh
   npx expo start
   ```
   - Use the Expo Go app or an emulator to preview.

### Folder Structure

- `app/` — Main app screens and routing.
- `components/` — Reusable UI components.
- `constants/` — Theme and API constants.
- `hooks/` — Custom React hooks (e.g., `useTransactions`).
- `lib/` — Utility functions.
- `assets/` — Images, fonts, and styles.

### Notes

- The backend API URL is set in [`constants/api.js`](Mobile/constants/api.js).
- The app uses file-based routing via Expo Router.
- TypeScript is supported via [`tsconfig.json`](Mobile/tsconfig.json).

---

## License

This project is for educational/demo purposes. Please configure your own environment variables and secrets before deploying.

---