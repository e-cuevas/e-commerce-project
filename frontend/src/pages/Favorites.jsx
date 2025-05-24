import "../css/Favorites.css";
import {useWineContext} from "../context/FavoritesContext";
import WineCard from "../components/WineCard";

function Favorites() {
  const {favoriteWines} = useWineContext();

  return (
    <div className="favorites">
      <h2>Your Favorites</h2>

      {/* Favorite Wines */}
      {favoriteWines.length > 0 && (
        <>
          <h4>Your Favorite Wines</h4>
          <div className="fav-grid">
            {favoriteWines.map((wine) => (
              <WineCard wine={wine} key={wine.wine_id} />
            ))}
          </div>
        </>
      )}

      {/* Fallback if no favorites */}
      {favoriteWines.length === 0 && (
        <div className="favorites-empty">
          <h2>No favorite Wines yet</h2>
          <p>Start adding ....</p>
        </div>
      )}
    </div>
  );
}

export default Favorites;
