import { Dispatch, FormEvent } from 'react';

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
  products: IProductData[];
}

export interface IPropItem {
  product: IProductData[]
}

export interface IStateProducts {
  products: IProductData[];
  product: IProductData[];
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
  searchSort: {
    products: IProductData[],
    search: string,
    sort: string
  };
}
export interface ISwitch {
  products: IProductData[];
  changeStyle: Dispatch<boolean>;
}

export interface IPagination {
  currentPage: number;
  setCurrentPage: Dispatch<number>;
  productsPerPage: number;
  totalProducts: number;
}
export interface IOpenHideModal {
  handleClose: () => void;
  show: boolean;
  children?: HTMLElement[];
}

export interface ICartProduct {
  product: IProductData,
  productQuantity: number
}

export interface ICart {
  products: ICartProduct[],
  cartTotalQuantity: number,
  cartTotalAmount: number
}