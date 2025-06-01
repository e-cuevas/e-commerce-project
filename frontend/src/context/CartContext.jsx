import {createContext, useState, useContext, useEffect} from "react";

export const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);

export function CartProvider({children}) {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const addWinesToCart = (wine) => {
    setCartItems((prev) => [...prev, wine]);
    setCartCount((prev) => prev + 1);
  };

   const removeFromCart = (wineId) => {
     setCartItems((prev) => {
       const index = prev.findIndex((item) => item.id === wineId)
       if (index === -1) return prev;
       const newCart = [...prev];
       newCart.splice(index, 1);// Remove one occurrence
       return newCart
   });
   setCartCount((prev) => prev - 1);
  };
  // const removeFromCart = (wineId) => {
  //   setCartItems((prev) => prev.filter((item) => item.id !== wineId));
  //   setCartCount((prev) => prev - 1);
  // };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        setCartCount,
        addWinesToCart,
        removeFromCart,
      }}>
      {children}
    </CartContext.Provider>
  );
}

