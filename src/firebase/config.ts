import { initializeApp } from 'firebase/app';
import { getAuth } from '@firebase/auth';
import { getFirestore } from '@firebase/firestore';
import { getStorage } from '@firebase/storage';

export const firebaseConfig = {
  apiKey: 'AIzaSyDb0Zcr6lrIgtrh9S0obLs8cy5nnkhXD2o',
  authDomain: 'e-shop-97607.firebaseapp.com',
  databaseURL: 'https://e-shop-97607-default-rtdb.firebaseio.com',
  projectId: 'e-shop-97607',
  storageBucket: 'e-shop-97607.appspot.com',
  messagingSenderId: '115905316770',
  appId: '1:115905316770:web:4f2597fdaf19053d7514fb',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

/*
try {
  productsData.products.map((product) => {
    setDoc(doc(productsRef, product.id.toString()), product)
  })
} catch (e) {
  console.log(e)
}
*/

export default app;
