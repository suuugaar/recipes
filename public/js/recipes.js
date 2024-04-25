const sort = document.querySelector('.sort');
const recipesList = document.querySelector('.recipesList');
const favorites = document.querySelectorAll('.favorites');

sort.addEventListener('submit', async (event) => {
  event.preventDefault();
  let result;
  try {
    const argument = document.querySelector('.argument').value;
    const way = document.querySelector('.way').value;
    const response = await fetch('/api/favorites', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        argument, way,
      }),
    });
    result = await response.json();
    const recipesHTML = result.recipes.map((recipe) => (
      `<div className="party" key=${recipe.id}>
        <img clasas='party-logo' src=${recipe.photo} alt=${recipe.name}></img>
        <div class='recipe-title'>${recipe.name}</div>
        <div>Количество ингридиентов: ${recipe.ingridientsCount} шт.</div>
        <div class='recipe-ingridients'>Время на приготовление: ${recipe.time} минут</div>
      </div>
        `)).join('\n');
    recipesList.innerHTML = recipesHTML;
  } catch (error) {
    console.log(error);
  }
});

favorites.forEach((element) => {
  element.addEventListener('click', async (event) => {
    const { id } = event.target;
    const image = document.getElementById(id);
    if (image.alt === 'red_heart') {
      try {
        const response = await fetch(`api/favorites/${id}`, {
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
        const response = await fetch(`api/favorites/${id}`, {
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
