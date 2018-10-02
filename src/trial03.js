const admin = require('firebase-admin');

const serviceAccount = require('./config.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

const moviesRef = db.collection('movies');

// データ書き込み
moviesRef.doc('SA').set({
  title: '猿の惑星',
  release: 1968,
});
moviesRef.doc('SW').set({
  title: 'スターウォーズ',
  release: 1977,
});
moviesRef.doc('GZ').set({
  title: 'ゴジラ',
  release: 1954,
});

(async () => {
  try {
    console.log('\n', '=== すべてのdocを取得 ===', '\n');
    {
      const querySnapshot = await moviesRef.get();

      querySnapshot.forEach(doc => {
        console.log(doc.id, ' => ', doc.data());
      });
    }

    console.log('\n', '=== 指定のdocを削除 ===', '\n');
    {
      const querySnapshot = await moviesRef.where('title', '==', 'スターウォーズ').get();

      querySnapshot.forEach(doc => {
        console.log('DELETE', doc.id);
        doc.ref.delete();
      });
    }
    
    console.log('\n', '=== 削除後のすべてのdocを取得 ===', '\n');
    {
      const querySnapshot = await moviesRef.get();

      querySnapshot.forEach(doc => {
        console.log(doc.id, ' => ', doc.data());
      });
    }
  } catch (error) {
    console.log('Error getting documents: ', error);
  }
})();


