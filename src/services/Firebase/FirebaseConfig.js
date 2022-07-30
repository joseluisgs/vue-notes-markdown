// Configuración de firebase si lo quieres poner oculto
// renombra este fichero como FirebaseConfig.js
// https://firebase.google.com/docs/web/setup?hl=es
// JoseLuisGS

export default {
  // Desde el JScript
  // apiKey: 'key',
  // authDomain: 'domain',
  // databaseURL: 'database_url',
  // projectId: 'project_id',
  // storageBucket: 'storage_bucket',
  // messagingSenderId: 'messaging_id',
  // appId: 'app_id',
  // measurementITE

  // Dede las variables de entrono
  apiKey: import.meta.env.VITE_APP_FIRE_API_KEY,
  authDomain: import.meta.env.VITE_APP_FIRE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_APP_FIRE_DATABASE_URL,
  projectId: `${import.meta.env.VITE_APP_FIRE_PROJECT_ID}`,
  storageBucket: import.meta.env.VITE_APP_FIRE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_APP_FIRE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIRE_APP_ID,
  measurementId: import.meta.env.VITE_APP_FIRE_UAP,
}
