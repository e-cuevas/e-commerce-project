import Cellar from "./pages/Cellar";
import Login from "./pages/Login";
import Register from "./pages/Register.jsx";
import Favorites from "./pages/Favorites.jsx";
import "./css/App.css";
import {Routes, Route, useLocation} from "react-router-dom";
import NavBar from "./components/Navbar.jsx";
import {CartProvider} from "./context/CartContext.jsx";
import {WineProvider} from "./context/FavoritesContext.jsx";

function App() {
  const location = useLocation();
  // Only show Navbar on the Cellar page (or any route you choose)
  const showNavbar =
    location.pathname === "/" || location.pathname === "/favorites";

  return (
    <CartProvider>
      <WineProvider>
        {showNavbar && <NavBar />}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Cellar />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/favorites" element={<Favorites />}></Route>
          </Routes>
        </main>
      </WineProvider>
    </CartProvider>
  );
}

export default App;
