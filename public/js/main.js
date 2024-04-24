async function translateText(text, targetLang = 'ru') {
  const APP_KEY = 'AIzaSyDLZFFqztmh1max-4HCliJ_PnO9mj6qwGY';
  const url = `https://translation.googleapis.com/language/translate/v2?key=${APP_KEY}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: text,
      target: targetLang,
    }),
  });
  const data = await response.json();
  return data.data.translations[0].translatedText;
}

document.addEventListener('DOMContentLoaded', async () => {
  const APP_KEY = 'd3132e9967463f1a99a863a78a8f735e';
  const APP_ID = '6f50d836';
  const fetchRecipes = async () => {
    const url = `https://api.edamam.com/search?q=chicken&time=10-30&app_id=${APP_ID}&app_key=${APP_KEY}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch recipes: ${response.status}`);
      }
      const data = await response.json();

      let container = document.querySelector('.mainContainer');
      if (!container) {
        container = document.createElement('div');
        container.className = 'container';
        document.body.appendChild(container);
      } else {
        container.innerHTML = '';
      }

      for (const hit of data.hits) {
        const { recipe } = hit;
        const recipeDiv = document.createElement('div');
        recipeDiv.className = 'recipe';

        const image = document.createElement('img');
        image.src = recipe.image;
        image.alt = recipe.label;
        recipeDiv.appendChild(image);

        const title = document.createElement('h3');
        title.innerText = await translateText(recipe.label);
        recipeDiv.appendChild(title);

        const ingredientsCount = document.createElement('p');
        ingredientsCount.innerText = `Количество ингридиентов: ${recipe.ingredients.length} шт`;
        recipeDiv.appendChild(ingredientsCount);

        const ingredientsList = document.createElement('ul');
        for (const ingredient of recipe.ingredients) {
          const item = document.createElement('li');
          item.innerText = await translateText(ingredient.text);
          ingredientsList.appendChild(item);
        }
        recipeDiv.appendChild(ingredientsList);

        container.appendChild(recipeDiv);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  await fetchRecipes();
});
