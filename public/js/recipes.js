const sort = document.querySelector('.sort');
const recipesList = document.querySelector('.recipesList');

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
        <img src=${recipe.photo} alt=${recipe.name}></img>
        <div>${recipe.name}</div>
        <div className='smallConteiner'>
          <div>Количество ингридиентов: ${recipe.ingridientsCount} шт.</div>
          <div>Время на приготовление: ${recipe.time} минут</div>
        </div>
        `)).join('\n');
    recipesList.innerHTML = recipesHTML;
  } catch (error) {
    console.log(error);
  }
});
