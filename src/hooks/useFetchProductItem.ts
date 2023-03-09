import { useEffect, useState } from 'react';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../firebase/config';
import { IProductData } from '../interfaces/index';

const useFetchProductItem = (collectionName: string, id: string) => {
  const [data, setData] = useState<IProductData[]>([]);
  const getProductItem = async () => {
    const arr: IProductData[] = [];
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      querySnapshot.forEach((doc) => {
        if (doc.id === id){
          arr.push(<IProductData>doc.data());
        }
      });
      setData(arr);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getProductItem();
  }, []);

  return { data };
};

export default useFetchProductItem;