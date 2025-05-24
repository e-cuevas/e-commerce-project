import {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "../css/Navbar.css";
import {IoIosHome} from "react-icons/io";
import {FaHeart} from "react-icons/fa";
import {FaShoppingCart} from "react-icons/fa";
import {BsPersonCircle} from "react-icons/bs";
import {CartContext} from "../context/CartContext";
import {FaBook} from "react-icons/fa";
import {jwtDecode} from "jwt-decode"; // Import jwt-decode

function NavBar() {
  const {cartCount} = useContext(CartContext);

  //login status conditional render in navbar using "token"
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Decode token and get user info if available.
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);
        setUser(decoded);
        // Set admin status based on role
        setIsAdmin(decoded.role === "admin");
        // Check if user is admin and redirect
        // if ("admin") {
        //   window.location.href = "https://estebancuevas.com.au/wine-crud-app/";
        // }
      } catch (error) {
        setUser(null);
        setIsAdmin(false);
        console.error("invalid token", error);
      }
    } else {
      setUser(null);
      setIsAdmin(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null); // Update state
    setIsAdmin(false);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">
          <img src="logo.png" alt="logo" />
        </Link>
      </div>
      <div className="navbar-wrapper">
        {isAdmin ? (
          // If the admin is logged in, display the admin name and logout button.

          <div className="auth-links" id="administrator">
            <span className="nav-link">
              <BsPersonCircle />
              Welcome, almighty {user.name || user.email}
            </span>
            <Link
              to="https://estebancuevas.com.au/wine-crud-app/"
              className="nav-link"
              id="fabook"
              target="blank"
              rel="noopener noreferrer">
              <FaBook />
              Inventory
            </Link>
            <button onClick={handleLogout} className="nav-link " id="logout-button">
              Logout
            </button>
          </div>
        ) : user ? (
          // If the user is logged in, display the user name and logout button.
          <div className="auth-links">
            <span className="nav-link">
              <BsPersonCircle />
              Welcome, {user.name || user.email}
            </span>
            <button onClick={handleLogout} className="nav-link logout-button">
              Logout
            </button>
          </div>
        ) : (
          // If not logged in, show Login and Join links.
          <div className="auth-links" id="login">
            <Link to="/login" className="nav-link">
              <BsPersonCircle />
              Login/
            </Link>
            <span className="separator">/</span>
            <Link to="/register" className="nav-link">
              Join
            </Link>
          </div>
        )}
        <div className="navbar-links">
          <Link to="/" className="nav-link">
            <IoIosHome />
            Cellar
          </Link>

          <Link to="/favorites" className="nav-link">
            <FaHeart />
            Favorites
          </Link>

          <Link to="/cart" className="nav-link">
            <FaShoppingCart />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}
export default NavBar;
