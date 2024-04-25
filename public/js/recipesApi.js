async function translateText(text, targetLang = 'ru') {
  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, targetLang }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.translatedText;
  } catch (error) {
    console.error('Error translating text:', error);

    return text;
  }
}

async function fetchRecipes(maxCards, dishType = '') {
  try {
    const response = await fetch(`/api/recipes/?query=${dishType}&time=10`);
    if (!response.ok) {
      throw new Error(`Failed to fetch recipes: ${response.status}`);
    }
    const data = await response.json();

    const container = document.getElementById('recipesContainer');
    container.innerHTML = '';

    const limitedRecipes = data.recipes.slice(0, maxCards);

    for (const recipe of limitedRecipes) {
      const recipeDiv = document.createElement('div');
      recipeDiv.className = 'recipe';

      const check = document.querySelector('#check');
      if (check) {
        const heartImg = document.createElement('img');
        heartImg.className = 'favoritesHome party-heart';
        heartImg.src = '/assets/blue_heart.png';
        heartImg.alt = 'blue_heart';
        heartImg.id = recipe.id;
        recipeDiv.appendChild(heartImg);

        heartImg.addEventListener('click', async (event) => {
          const { id } = event.target;
          const image = document.getElementById(id);
          if (image.alt === 'red_heart') {
            try {
              const response = await fetch(`api/recipes/${id}`, {
                method: 'DELETE',
              });
              const result = await response.json();
              if (result.success) {
                image.src = '/assets/blue_heart.png';
                image.alt = 'blue_heart';
              }
            } catch (error) {
              console.log(error);
            }
          } else {
            try {
              const response = await fetch(`api/recipes/${id}`, {
                method: 'POST',
              });
              const result = await response.json();
              if (result.success) {
                image.src = '/assets/red_heart.png';
                image.alt = 'red_heart';
              }
            } catch (error) {
              console.log(error);
            }
          }
        });
      }

      const image = document.createElement('img');
      image.className = 'recipe-image';
      image.src = recipe.imageUrl;
      image.alt = recipe.name;
      image.addEventListener('click', () => {
        window.location.href = `/recipe-details/${recipe.id}`;
      });
      recipeDiv.appendChild(image);

      const title = document.createElement('h3');
      title.className = 'recipe-title';
      title.innerText = await translateText(recipe.name);
      recipeDiv.appendChild(title);

      const timeToCook = document.createElement('p');
      timeToCook.className = 'recipe-time';
      timeToCook.innerText = `Время приготовления: ${recipe.timeToCook} мин.`;
      recipeDiv.appendChild(timeToCook);

      const ingredientsCount = document.createElement('p');
      ingredientsCount.className = 'recipe-ingridients';
      ingredientsCount.innerText = `Количество ингридиентов: ${recipe.ingredients.length} шт.`;
      recipeDiv.appendChild(ingredientsCount);

      container.appendChild(recipeDiv);
    }
  } catch (error) {
    console.error('Error fetching recipes:', error);
  }
}

window.addEventListener('load', async () => {
  await fetchRecipes(18, 'chicken');
});

// Ловим ручку на добавление в избранное и удаление
const favorites = document.querySelectorAll('.favoritesHome');
favorites.forEach((element) => {
  element.addEventListener('click', async (event) => {
    const { id } = event.target;
    const image = document.getElementById(id);
    if (image.alt === 'red_heart') {
      try {
        const response = await fetch(`api/recipes/${id}`, {
          method: 'DELETE',
        });
        const result = await response.json();
        if (result.success) {
          image.src = '/assets/blue_heart.png';
          image.alt = 'blue_heart';
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await fetch(`api/recipes/${id}`, {
          method: 'POST',
        });
        const result = await response.json();
        if (result.success) {
          image.src = '/assets/red_heart.png';
          image.alt = 'red_heart';
        }
      } catch (error) {
        console.log(error);
      }
    }
  });
});

// Функция для сортировки
async function sortedRecipes(maxCards, dishType = '') {
  try {
    const container = document.getElementById('recipesContainer');
    container.innerHTML = '';

    const response = await fetch(`/api/recipes/?query=${dishType}&time=10`);
    if (!response.ok) {
      throw new Error(`Failed to fetch recipes: ${response.status}`);
    }
    const data = await response.json();
    const limitedRecipes = data.recipes.slice(0, maxCards);

    const argument = document.querySelector('.argument').value;
    const way = document.querySelector('.way').value;
    if (argument === 'ingredients' && way === 'ascending') {
      limitedRecipes.sort((a, b) => a.ingredients.length - b.ingredients.length);
    }
    if (argument === 'ingredients' && way === 'descending') {
      limitedRecipes.sort((a, b) => b.ingredients.length - a.ingredients.length);
    }
    if (argument === 'time' && way === 'descending') {
      limitedRecipes.sort((a, b) => b.timeToCook - a.timeToCook);
    }
    if (argument === 'time' && way === 'ascending') {
      limitedRecipes.sort((a, b) => a.timeToCook - b.timeToCook);
    }
    for (const recipe of limitedRecipes) {
      const recipeDiv = document.createElement('div');
      recipeDiv.className = 'recipe';

      const heartImg = document.createElement('img');
      heartImg.className = 'favoritesHome party-heart';
      heartImg.src = '/assets/blue_heart.png';
      heartImg.alt = 'blue_heart';
      heartImg.id = recipe.id;
      recipeDiv.appendChild(heartImg);

      const image = document.createElement('img');
      image.className = 'recipe-image';
      image.src = recipe.imageUrl;
      image.alt = recipe.name;
      image.addEventListener('click', () => {
        window.location.href = `/recipe-details/${recipe.id}`;
      });
      recipeDiv.appendChild(image);

      const title = document.createElement('h3');
      title.className = 'recipe-title';
      title.innerText = await translateText(recipe.name);
      recipeDiv.appendChild(title);

      const timeToCook = document.createElement('p');
      timeToCook.className = 'recipe-time';
      timeToCook.innerText = `Время приготовления: ${recipe.timeToCook} мин.`;
      recipeDiv.appendChild(timeToCook);

      const ingredientsCount = document.createElement('p');
      ingredientsCount.className = 'recipe-ingridients';
      ingredientsCount.innerText = `Количество ингридиентов: ${recipe.ingredients.length} шт.`;
      recipeDiv.appendChild(ingredientsCount);

      container.appendChild(recipeDiv);
    }
  } catch (error) {
    console.log(error);
  }
}

// Навешиваем обработчик событий для сортировки
const sort = document.querySelector('.sortHome');
sort.addEventListener('submit', async (event) => {
  event.preventDefault();
  await sortedRecipes(18, 'chicken');
});
