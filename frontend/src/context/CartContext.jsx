import React, {createContext, useState, useContext} from "react";

export const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({children}) => {
  const [cartCount, setCartCount] = useState(0);

  return (
    <CartContext.Provider value={{cartCount, setCartCount}}>
      {children}
    </CartContext.Provider>
  );
};
