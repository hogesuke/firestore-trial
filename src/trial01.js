const admin = require('firebase-admin');

const serviceAccount = require('./config.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const docRef = db.collection('users').doc('alovelace');

const setAda = docRef.set({
    first: 'Ada',
    last: 'Lovelace'
});
