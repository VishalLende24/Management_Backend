export interface Product {
  _id?: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  stockVisible: boolean;
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CreateProductDto {
  name: string;
  price: number;
  stock: number;
  category: string;
  stockVisible?: boolean;
}

export interface UpdateProductDto {
  name?: string;
  price?: number;
  stock?: number;
  category?: string;
  stockVisible?: boolean;
}

export interface ProductFilters {
  priceRange?: { min: number; max: number };
  stockRange?: { min: number; max: number };
  categories?: string[];
  showLowStock?: boolean;
  showOutOfStock?: boolean;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  pageSize?: number;
}
