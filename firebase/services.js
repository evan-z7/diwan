import admin from 'firebase-admin';
import { pathToFileURL } from 'url';

// Convert the file path to a file URL
const serviceAccountPath = 'C:/Users/elega/OneDrive/Desktop/pro/diwan-dc20d-firebase-adminsdk-huub0-1f969b3354.json';
const serviceAccountUrl = pathToFileURL(serviceAccountPath);

// Use dynamic import to load the service account JSON file
const serviceAccount = await import(serviceAccountUrl.href, {
  assert: { type: 'json' }
});

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount.default)
});

export default admin;
 