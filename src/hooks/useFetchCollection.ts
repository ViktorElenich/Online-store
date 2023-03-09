import { useEffect, useState } from 'react';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../firebase/config';
import { IProductData } from '../interfaces/index';

const useFetchCollection = (collectionName: string) => {
  const [data, setData] = useState<IProductData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getCollection = async () => {
    setIsLoading(true);
    const arr: IProductData[] = [];
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      querySnapshot.forEach((doc) => {
        arr.push(<IProductData>doc.data());
      });
      setData(arr);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getCollection();
  }, []);

  return { data, isLoading };
};

export default useFetchCollection;
