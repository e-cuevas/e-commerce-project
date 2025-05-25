import { createContext, useState, useContext, useEffect } from "react";

export const CartContext = createContext();
export const useCartContext = () => useContext(CartContext);

export function CartProvider({ children }) {
  
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  const addWinesToCart = (wine) => {
    setCartItems((prev) => [...prev, wine]);
    setCartCount((prev) => prev + 1);
  };

  const removeFromCart = (wineId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== wineId));
    setCartCount((prev) => prev - 1);
  };

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

// export const CartContext = createContext();
// export const useCartContext = () => useContext(CartContext);

// export const CartProvider = ({ children }) => {

//   const [cartCount, setCartCount] = useState(0);
//   const [wineToCart, setWineToCart] = useState([]);

//   // Load wines from add to cart from localStorage on initial render
//   useEffect(() => {
//     const storedWines = localStorage.getItem("wineToCart");
//     if (storedWines) setWineToCart(JSON.parse(storedWines));
//   }, []);

//   // Save Wines  to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem("wineToCart", JSON.stringify(wineToCart));
//   }, [wineToCart]);

//   // Operations for Wines
//   const addWinesToCart = (wine) => {
//     setWineToCart((prev) => [...prev, wine]);
//      setCartCount(prev => prev + 1);
//   };

//   const removeWinesFromCart = (wineId) => {
//     setWineToCart((prev) => prev.filter((wine) => wine.id !== wineId));
//      setCartCount(prev => prev - 1);
//   };
//   const isWineOnCart = (wineId) => {
//     return wineToCart.some((wine) => wine.id === wineId);
//   };
//   const value = {
//     addWinesToCart,
//     removeWinesFromCart,
//     isWineOnCart,
//     setWineToCart,
//     wineToCart,
//     cartCount,
//     setCartCount,
//   };

//   return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
// };
