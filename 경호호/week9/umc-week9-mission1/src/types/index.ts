export interface LP {
  id: string;
  title: string;
  singer: string;
  price: number;
  img: string;
  amount: number;
}

export type CartItems = LP[];

export interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
}

export interface CartItemProps {
  lp: LP;
}
