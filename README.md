# Adrielle

Premium clothing brand landing page — **exclusively for tall women** (5'9" and above).

## Stack

- Vite + React + TypeScript
- Firebase Firestore waitlist (`adrielle-apparel`)

## Develop

```bash
npm install
cp .env.example .env   # then fill Firebase web config
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Firebase waitlist setup

Project: [adrielle-apparel](https://console.firebase.google.com/project/adrielle-apparel/overview)

1. In Firebase Console → **Build → Firestore Database** → Create database (production mode is fine; we deploy rules next).
2. **Project settings → Your apps → Add app → Web** and copy the config.
3. Put values in `.env`:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=adrielle-apparel.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=adrielle-apparel
VITE_FIREBASE_STORAGE_BUCKET=adrielle-apparel.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

4. Deploy security rules (from this repo, after `firebase login`):

```bash
npx firebase-tools deploy --only firestore:rules --project adrielle-apparel
```

Or paste `firestore.rules` into **Firestore → Rules** in the console.

Waitlist emails are stored in the `waitlist` collection. Without `.env` values, signups fall back to `localStorage` so the UI still works locally.
