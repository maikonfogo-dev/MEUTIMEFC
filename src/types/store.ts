
export type ProductSize = 'P' | 'M' | 'G' | 'GG' | 'XG' | 'Único';

export interface ProductVariant {
  size: ProductSize;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  installments?: {
    count: number;
    value: number;
  };
  images: string[];
  category: 'Camisa' | 'Acessório' | 'Ingresso' | 'Outros';
  variants: ProductVariant[];
  isNew?: boolean;
  isOfficial?: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: ProductSize;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  customer: {
    name: string;
    cpf: string;
    phone: string;
    address: string;
  };
  paymentMethod: 'pix' | 'credit_card';
  createdAt: string;
}
