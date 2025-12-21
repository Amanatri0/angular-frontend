import { Products } from './model/productTypes';

export type EcommerceState = {
  products: Products[];
  category: string;
};
