export interface Author {
  _id: string;
  name: string;
  country: string;
  bio: string;
  roles: string[];
}

export interface Book {
  _id: string;
  title: string;
  author: Author | string;
  description: string;
  price: number;
  cover: string;
  createdAt: string;
  updatedAt: string;
}

export interface BooksResponse {
  data: Book[];
  meta: {
    total: number;
    page: number;
    pages: number;
    limit: number;
  };
}

export interface BooksQuery {
  q?: string;
  minPrice?: number;
  maxPrice?: number;
  author?: string;
  page?: number;
  limit?: number;
  sort?: string;
}
