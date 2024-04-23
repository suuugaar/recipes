async function getRecipes(query, app_id, app_key, params) {
  const baseUrl = "https://api.edamam.com/api/recipes/v2";
  const endpoint = "/typeahead";
  const url = new URL(`${baseUrl}${endpoint}`);
  const queryParams = {
    q: query,
    app_id: app_id,
    app_key: app_key,
    ...params,
  };
  url.search = new URLSearchParams(queryParams).toString();

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
}

const app_id = "6f50d836";
const app_key = "d3132e9967463f1a99a863a78a8f735e";
const query = "chicken";

const params = {
  type: "public",
  diet: ["balanced", "high-protein"],
  mealType: ["Breakfast", "Lunch"],
};

getRecipes(query, app_id, app_key, params)
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
