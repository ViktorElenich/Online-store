// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Nouislider, { NouisliderProps } from 'nouislider-react';
import { FormEvent } from 'react';

export interface IProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface IProductsProps {
  products: IProductData[]
}

export interface IStateProducts {
  products: IProductData[];
}
export interface IStateFilter {
  filterProducts: IProductData[];
}

export default interface IProductItemProp {
  item: IProductData;
  isInTheCart: boolean;
}

export interface ISearch {
  value: string;
  onChange: (e: FormEvent<HTMLInputElement>) => void;
}

export interface ISelect {
  value: string;
  onChange: (e: FormEvent<HTMLSelectElement>) => void;
}
export interface IFilterBrand {
  searchSort: { products: IProductData[], search: string, sort: string }
}
