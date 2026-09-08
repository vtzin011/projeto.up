import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextData {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => Promise<void>;
  removeFromCart: (id: string) => Promise<void>;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    async function loadCartData() {
      const storagedCart = await AsyncStorage.getItem('@CoffeeApp:cart');
      if (storagedCart) setCart(JSON.parse(storagedCart));
    }
    loadCartData();
  }, []);

  const addToCart = async (product: Omit<CartItem, 'quantity'>) => {
    let updatedCart = [...cart];
    const exists = updatedCart.find(item => item.id === product.id);

    if (exists) {
      exists.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);
    await AsyncStorage.setItem('@CoffeeApp:cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = async (id: string) => {
    const updatedCart = cart.filter(item => item.id !== id);
    setCart(updatedCart);
    await AsyncStorage.setItem('@CoffeeApp:cart', JSON.stringify(updatedCart));
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
