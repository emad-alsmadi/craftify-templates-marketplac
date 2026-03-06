export interface Author {
  _id: string;
  name: string;
  country: string;
  bio: string;
  roles: string[];
}

export interface Template {
  _id: string;
  title: string;
  author: Author | string;
  description: string;
  price: number;
  cover: string;
  createdAt: string;
  updatedAt: string;
}

export interface TemplatesResponse {
  data: Template[];
  meta: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

export interface AuthorsResponse {
  data: Author[];
  meta: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

export interface AuthorsQuery {
  page?: number;
  limit?: number;
}

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'shipped'
  | 'delivered'
  | 'canceled';

export interface OrderItem {
  book: string;
  title: string;
  price: number;
  qty: number;
  cover: string;
}

export interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  notes?: string;
}

export interface Order {
  _id: string;
  user: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  status: OrderStatus;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
}

export interface TemplatesQuery {
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  author?: string;
  page?: number;
  limit?: number;
  sort?: string;
}
