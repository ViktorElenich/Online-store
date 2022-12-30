import { mockCollection } from 'firestore-jest-mock/mocks/firestore';
import { mockFirebase } from 'firestore-jest-mock';
import firebase from 'firebase/compat';

describe('Mock Firebase', () => {
  mockFirebase({
    database: {
      products: [
        {
          id: 1,
          brand: 'Apple',
          images: [
            'https://i.dummyjson.com/data/products/1/1.jpg',
            'https://i.dummyjson.com/data/products/1/2.jpg',
            'https://i.dummyjson.com/data/products/1/3.jpg',
            'https://i.dummyjson.com/data/products/1/4.jpg',
            'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
          ],
          price: 549,
          category: 'smartphones',
          discountPercentage: 12.96,
          thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
          rating: 4.69,
          description: 'An apple mobile which is nothing like apple',
          stock: 94,
          title: 'iPhone 9',
        },
        {
          description:
            'SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...',
          rating: 4.44,
          price: 899,
          id: 2,
          discountPercentage: 17.94,
          images: [
            'https://i.dummyjson.com/data/products/2/1.jpg',
            'https://i.dummyjson.com/data/products/2/2.jpg',
            'https://i.dummyjson.com/data/products/2/3.jpg',
            'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
          ],
          brand: 'Apple',
          title: 'iPhone X',
          thumbnail: 'https://i.dummyjson.com/data/products/2/thumbnail.jpg',
          category: 'smartphones',
          stock: 34,
        },
      ],
    },
  });
  test('mock firebase', () => {
    const db = firebase.firestore();

    return db
      .collection('products')
      .get()
      .then((productsDoc) => {
        expect(mockCollection).toHaveBeenCalledWith('products');
        expect(productsDoc[0].brand).toEqual('Apple');
      });
  });
});
