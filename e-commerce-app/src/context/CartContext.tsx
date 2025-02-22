import { createContext, useContext, useReducer, useEffect } from 'react';
import { CartContextType, CartState, CartItem } from '@/types/cart';
import { Product } from '@/types/product';
import { storage } from '@/utils/storage';

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
  itemCount: 0,
  total: 0
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      
      const items = existingItem
        ? state.items.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...state.items, { product: action.payload, quantity: 1 }];

      const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
      const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

      return { items, itemCount, total };
    }

    case 'REMOVE_ITEM': {
      const items = state.items.filter(item => item.product.id !== action.payload.toString());
      const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
      const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

      return { items, itemCount, total };
    }

    case 'UPDATE_QUANTITY': {
      const items = state.items
        .map(item =>
          Number(item.product.id) === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
        .filter(item => item.quantity > 0);

      const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
      const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

      return { items, itemCount, total };
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    const savedCart = storage.getCart();
    if (savedCart && savedCart.length > 0) {
      const itemCount = savedCart.reduce((sum, item) => sum + item.quantity, 0);
      const total = savedCart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
      const initialState = { items: savedCart, itemCount, total };
      dispatch({ type: 'UPDATE_QUANTITY', payload: { productId: -1, quantity: 0 } }); // Trigger update with current state
    }
  }, []);

  useEffect(() => {
    storage.setCart(state.items);
  }, [state.items]);

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId: number, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value: CartContextType = {
    items: state.items,
    itemCount: state.itemCount,
    total: state.total,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}