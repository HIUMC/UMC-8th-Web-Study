export interface CartItem {
    id: string;
    title: string;
    singer: string;
    price: string;
    img: string;
    amount: number;
}

export interface CartListProps {
    items: CartItem[];
    totalQuantity: number;
    totalAmount: number;
}