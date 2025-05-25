import React from "react";
import {useContext} from "react";
import {FaHeart} from "react-icons/fa";
import "../css/WineCard.css";
import {CartContext} from "../context/CartContext";
import {useWineContext} from "../context/FavoritesContext";

function WineCard({wine}) {
  // Cart context
  const {setCartCount, addWinesToCart} = useContext(CartContext);

  const handleaddToCart = () => {
    setCartCount((prev) => prev + 1);

    //favoriteContext for the onFavoriteClick()
    const {isWineFavorite, addWinesToFavorites, removeWineFromFavorites} =
      useWineContext();
    const favorite = isWineFavorite(wine.id);

    const handleaddToCart = () => {
      setCartCount((prev) => prev + 1);
      addWinesToCart(wine); // Add wine to cart
    };

    const onFavoriteClick = (e) => {
      e.preventDefault();
      console.log("Clicked favorite for wine id:", wine.id);
      if (favorite) {
        removeWineFromFavorites(wine.id);
        console.log("Removed from favorites");
      } else {
        addWinesToFavorites(wine);
        console.log("Added to favorites");
      }
    }
  };

  //favoriteContext for the onFavoriteClick()
  const {isWineFavorite, addWinesToFavorites, removeWineFromFavorites} =
    useWineContext();
  const favorite = isWineFavorite(wine.id);

  function onFavoriteClick(e) {
    e.preventDefault();
    console.log("Clicked favorite for wine id:", wine.id);
    if (favorite) {
      removeWineFromFavorites(wine.id);
      console.log("Removed from favorites");
    } else {
      addWinesToFavorites(wine);
      console.log("Added to favorites");
    }
  }

  return (
    <div className="wine-card">
      <div className="wine-poster">
        <img src={wine.image_url} alt={`${wine.producer}`} />
        <div className="wine-overlay">
          <button
            className={`favorite-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}>
            <FaHeart />
          </button>
        </div>
      </div>
      <div className="wine-info">
        <h3>
          {wine.producer} <br />
          {wine.year}
        </h3>
        <p>
          {wine.region} <br />
          <br />${wine.price}
        </p>
      </div>
      <div className="wine-overlay-cart">
        <button className="addToCart-btn" onClick={handleaddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
export default WineCard;
