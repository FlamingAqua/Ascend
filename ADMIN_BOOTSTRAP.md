# First Admin Bootstrap

This repository uses a Firebase Auth + Firestore profile model. The Firebase authentication account is the source of truth for identity, while the `users/{uid}` document stores the profile and role.

## Local development bootstrap

1. Copy `.env.example` to `.env.local` and populate the Firebase web configuration values for your browser-facing project.
2. Create a Firebase project and enable Email/Password and Google login in Authentication.
3. Create a Firebase Firestore database.
4. Deploy the rules in `firestore.rules` to your Firebase project using the Firebase CLI.
5. Create the first user through the UI sign-up flow.
6. In the Firebase Console or via an admin script, set the user’s role in the `users/{uid}` profile document to `admin`.

## Recommended production path

For production, use a trusted backend/admin script or Firebase Admin SDK on a privileged server to create the first user and assign `role = 'admin'` server-side. Do not let the browser client choose the role.

The `users/{uid}` document should look like:

```json
{
  "uid": "<firebase-uid>",
  "name": "Admin Name",
  "email": "admin@example.com",
  "role": "admin",
  "isActive": true,
  "createdAt": "<server timestamp>",
  "updatedAt": "<server timestamp>"
}
```
