export interface CartProductType {
    _id: string;
    name: string;
    quantity: number;
    size?: string;
    topping?: {
      name: string;
      price: number;
    }[];
    price: number;
    image: string;
  }