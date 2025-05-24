import {createContext, useContext, useState, useEffect} from "react";

const WineContext = createContext();
export const useWineContext = () => useContext(WineContext);

export const WineProvider = ({children}) => {
  const [favoriteWines, setFavoriteWines] = useState([]);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const storedWines = localStorage.getItem("favoriteWines");

    if (storedWines) setFavoriteWines(JSON.parse(storedWines));
  }, []);

  // Save Wines  to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("favoriteWines", JSON.stringify(favoriteWines));
  }, [favoriteWines]);

  // Operations for Wines
  const addWinesToFavorites = (wine) => {
    setFavoriteWines((prev) => [...prev, wine]);
  };

  const removeWineFromFavorites = (wineId) => {
    setFavoriteWines((prev) => prev.filter((wine) => wine.id !== wineId));
  };

  const isWineFavorite = (wineId) => {
    return favoriteWines.some((wine) => wine.id === wineId);
  };

  const value = {
    addWinesToFavorites,
    removeWineFromFavorites,
    isWineFavorite,
    favoriteWines
  };

  return <WineContext.Provider value={value}>{children}</WineContext.Provider>;
};
