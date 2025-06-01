import {createContext, useState, useContext, useEffect} from "react";

export const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);

export function CartProvider({children}) {
  const [cartItems, setCartItems] = useState([]);
 //const [cartCount, setCartCount] = useState(0);

  const addWinesToCart = (wine) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === wine.id);
      if (existing) {
        return prev.map((item) =>
          item.id === wine.id ? {...item, quantity: item.quantity + 1} : item
        );
      }
      return [...prev, {...wine, quantity: 1}];
    });
  };

  const removeFromCart = (wineId) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === wineId);
      if (existing?.quantity > 1) {
        return prev.map((item) =>
          item.id === wineId ? {...item, quantity: item.quantity - 1} : item
        );
      }
      return prev.filter((item) => item.id !== wineId);
    });
  };
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
       // setCartCount,
        addWinesToCart,
        removeFromCart,
      }}>
      {children}
    </CartContext.Provider>
  );
}
