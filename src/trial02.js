const admin = require('firebase-admin');

const serviceAccount = require('./config.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const citiesRef = db.collection('cities');

// データ書き込み
citiesRef.doc('SF').set({
  name: 'San Francisco',
  state: 'CA',
  country: 'USA',
  capital: false,
  population: 860000
});
citiesRef.doc('LA').set({
  name: 'Los Angeles',
  state: 'CA',
  country: 'USA',
  capital: false,
  population: 3900000
});
citiesRef.doc('DC').set({
  name: 'Washington, D.C.',
  state: null,
  country: 'USA',
  capital: true,
  population: 680000
});
citiesRef.doc('TOK').set({
  name: 'Tokyo',
  state: null,
  country: 'Japan',
  capital: true,
  population: 9000000
});
citiesRef.doc('BJ').set({
  name: 'Beijing',
  state: null,
  country: 'China',
  capital: true,
  population: 21500000
});

(async () => {
  try {
    console.log('\n', '=== すべてのdocを取得 ===', '\n');
    {
      const querySnapshot = await citiesRef.get();

      querySnapshot.forEach(doc => {
        console.log(doc.id, ' => ', doc.data());
      });
    }

    console.log('\n', '=== 特定のdocを取得 ===', '\n');
    {
      const doc = await citiesRef.doc('SF').get();

      if (!doc.exists) {
        console.log('No such document!');
      } else {
        console.log('Document data:', doc.data());
      }
    }

    console.log('\n', '=== whereでフィルタしてdocを取得 ===', '\n');
    {
      const querySnapshot = await citiesRef.where('capital', '==', true).get();

      querySnapshot.forEach(function (doc) {
        console.log(doc.id, ' => ', doc.data());
      });
    }
  } catch (error) {
    console.log('Error getting documents: ', error);
  }
})();


