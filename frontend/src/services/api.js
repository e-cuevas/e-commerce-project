export const getWines = async () => {
  const response = await fetch(
    "https://e-commerce-project-r7hg.onrender.com/api/wines"
  );
  const data = await response.json();
  return data;
};
export const searchWines = async (query) => {
  const response = await fetch(
    `https://e-commerce-project-r7hg.onrender.com/api/wines?query=${encodeURIComponent(
      query
    )}`
  );
  const data = await response.json();
  return data;
};
