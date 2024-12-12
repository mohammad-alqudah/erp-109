export interface Product {
  id: string;
  name: string;
  barcode: string;
  quantity: number;
  price: string;
}

export interface ProductsResponse {
  next: number;
  previous: number;
  count: number;
  data: Product[];
  status: boolean;
  detail: null | string;
}