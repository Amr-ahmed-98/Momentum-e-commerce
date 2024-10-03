import React, { createContext, useState, useEffect } from "react";
import { Product } from "../interfaces/productState";

interface CartItem extends Product {
  quantity: number;
}

interface ICartContext {
  countOfProducts: number;
  cart: CartItem[];
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
  removeEntireProduct: (id: number) => void; 
  clearCart: () => void;
}

const CartContext = createContext<ICartContext | null>(null);

export const CartProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [countOfProducts, setCountOfProducts] = useState<number>(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart: CartItem[] = JSON.parse(savedCart);
      return parsedCart.length;
    }
    return 0;
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    setCountOfProducts(cart.length);
    localStorage.setItem('countOfProducts', cart.length.toString());
  }, [cart]);

  // it will add the product to the cart and if the product is already in the cart, it will increase the quantity by 1
  const addProduct = (product: Product) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
      if (existingItemIndex !== -1) {
        const newCart = [...prevCart];
        newCart[existingItemIndex].quantity += 1;
        return newCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }

//   it see if the product is already in the cart and if it is, it will increase the quantity by 1
  const removeProduct = (id: number) => {
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === id);
      if (existingItemIndex !== -1) {
        const newCart = [...prevCart];
        if (newCart[existingItemIndex].quantity > 1) {
          newCart[existingItemIndex].quantity -= 1;
          return newCart;
        } else {
          return newCart.filter(item => item.id !== id);
        }
      }
      return prevCart;
    });
  }

  //  to remove entire product
  const removeEntireProduct = (id: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  }

  const clearCart = () => {
    setCart([]);
  }

  return(
    <CartContext.Provider value={{cart, addProduct, removeProduct, removeEntireProduct, clearCart, countOfProducts}}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}