async function translateText(text, targetLang = "ru") {
  try {
    const response = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, targetLang }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.translatedText;
  } catch (error) {
    console.error("Error translating text:", error);

    return text;
  }
}

window.addEventListener("load", async () => {
  async function fetchRecipes() {
    try {
      const response = await fetch("/api/recipes/?query=chicken&time=10");
      if (!response.ok) {
        throw new Error(`Failed to fetch recipes: ${response.status}`);
      }
      const data = await response.json();

      const container = document.getElementById("recipesContainer");
      container.innerHTML = ""; // Очистка предыдущих результатов

      for (const recipe of data.recipes) {
        const recipeDiv = document.createElement("div");
        recipeDiv.className = "recipe";

        const image = document.createElement("img");
        image.src = recipe.imageUrl;
        image.alt = recipe.name;
        recipeDiv.appendChild(image);

        const title = document.createElement("h3");
        title.className = "title";
        title.innerText = await translateText(recipe.name);
        recipeDiv.appendChild(title);

        const timeToCook = document.createElement("p");
        timeToCook.innerText = `Время приготовления: ${
          Math.ceil((recipe.timeToCook / 60) * 2) / 2
        } ч`;
        recipeDiv.appendChild(timeToCook);

        const ingredientsList = document.createElement("ul");
        const translationPromises = recipe.ingredients.map((ingredient) =>
          translateText(ingredient)
        );
        const translatedIngredients = await Promise.all(translationPromises);

        translatedIngredients.forEach((translatedText) => {
          const item = document.createElement("li");
          item.innerText = translatedText;
          ingredientsList.appendChild(item);
        });
        recipeDiv.appendChild(ingredientsList);

        container.appendChild(recipeDiv);
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
    }
  }
  await fetchRecipes();
});
