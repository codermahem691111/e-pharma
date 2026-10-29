# Pharmacy Management System

## Run the frontend

Install dependencies and start the Vite development server:

```sh
npm install
npm run dev
```

Open the URL printed by Vite (by default, `http://localhost:5173`).

## Run the API

The frontend's inventory, customer, and transaction pages call an Express API on
port 5000. In a second terminal, start it with:

```sh
npm run dev:api
```

The API also requires a working MongoDB connection configured in
`src/backend/server.cjs`. Without it, the frontend can start, but API-backed
pages will not be able to load or save data.

## Other commands

```sh
npm run build    # Create a production build in dist/
npm run preview  # Preview the production build
npm run lint     # Run ESLint
```
