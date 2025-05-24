import WineCard from "../components/WineCard";
import "../css/cellar.css";

// in Order to use a State and Effect we need to import it from react
import {useEffect, useState} from "react";
import {getWines, searchWines} from "../services/api";

function Cellar() {
  const [searchQuery, setSearchQuery] = useState(""); //define the STATE to store the value that the user type on the searchbox/input that why above we import the {useState}
  const [wines, setWines] = useState([]); //define the STATE to movie array
  const [error, setError] = useState(null); //another useSatate to handle the loading state of the data and,
  const [loading, setLoading] = useState(true); // the other for the potential error that could happen when we call the API
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    const loadWineList = async () => {
      try {
        const wineList = await getWines();
        // Map wine_id to id
        const mappedWines = wineList.map((wine) => ({
          ...wine,
          id: wine.wine_id,
        }));
        setWines(mappedWines);
      } catch (err) {
        console.log(err);
        setError("Failed to load wine list");
      } finally {
        setLoading(false);
      }
    };
    loadWineList();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) return; // remove white spaces on the search trim() function
    if (loading) return;

    setLoading(true);

    try {
      const searchResults = await searchWines(searchQuery);
      // Map wine_id to id
      const mappedResults = searchResults.map((wine) => ({
        ...wine,
        id: wine.wine_id,
      }));
      setWines(mappedResults);
      setVisibleCount(5); // Reset visible count on new search
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to search wines....");
    } finally {
      setLoading(false);
    }
  };

  //  client-side filtering:

  const filteredWines = wines.filter((wine) =>
    wine.producer.toLowerCase().startsWith(searchQuery.toLowerCase())
  );
  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 5);
  };

  return (
    <div className="cellar">
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for a wine....."
          className="search-input"
          value={searchQuery} // this allow to update the State
          onChange={(e) => setSearchQuery(e.target.value)} // this allow to update the State in the search-box
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {/* conditional rendering  if we are loading we display loading otherwise display wines */}
      {loading ? (
        <div className="loading">Loading....</div>
      ) : (
        <div className="wrapper">
          <div className="cellar-grid">
            {filteredWines.slice(0, visibleCount).map((wine) => (
              <WineCard wine={wine} key={wine.wine_id} />
            ))}
          </div>
          {visibleCount < filteredWines.length && (
            <button className="show-more-button" onClick={handleShowMore}>
              Show More...
            </button>
          )}

          {visibleCount > 4 && (
            <button
              className="show-less-button"
              onClick={() => setVisibleCount(5)}>
              Show Less...
            </button>
          )}
        </div>
      )}
    </div>
  );
}
export default Cellar;

//x.map(...):

// The map function is used to iterate over the x array.
// For each  object in the array, the callback function inside map is executed.

// Callback Function:
// The callback function takes a single parameter x = (product in database e.g wine, movies, shoes etc..)
// which represents the current movie object being processed in the iteration.

// Conditionally render: movie.title.toLowerCase().startsWith(searchQuery):

// This condition checks if the title of the current movie (converted to lowercase)
// starts with the searchQuery string (also converted to lowercase).
// This is a case-insensitive check to see if the movie title matches the search query.
// If the condition is true, the expression after the && operator is evaluated and returned.
// If the condition is false, the expression after the && operator is not evaluated,
// and nothing is returned for that iteration.

// Rendering component Card:
// If the condition is true, the MovieCard component is rendered with the current movie object passed as a prop.
// The key prop is also provided to the MovieCard component,
// which is necessary for React to efficiently update and render lists of components.
// The key is set to movie.id, which should be a unique identifier for each movie.
