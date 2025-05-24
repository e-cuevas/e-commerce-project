import {jwtDecode} from "jwt-decode";

export const requireAdmin = (navigate) => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
    return false;
  }
  try {
    const decoded = jwtDecode(token);
    if (decoded.role !== "admin") {
      navigate("/");
      return false;
    }
    return true;
  } catch (error) {
    navigate("/login");
    return false;
  }
};
