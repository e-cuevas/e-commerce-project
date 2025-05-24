export const getWines = async () => {
  const response = await fetch("http://localhost:5000/api/wines");
  const data = await response.json();
  return data;
};
export const searchWines = async (query) => {
  const response = await fetch(
    `http://localhost:5000/api/wines?query=${encodeURIComponent(query)}`
  );
  const data = await response.json();
  return data;
};
