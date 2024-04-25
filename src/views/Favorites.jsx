const React = require('react');
const Layout = require('./Layout');

module.exports = function Recipes({ login, recipes }) {
  return (
    <Layout login={login}>
      <div className="mainContainer">
          <h1 className='title favTitle' >Избранные рецепты</h1>
          
          <form className='sort'>
           <select size='1' className='argument'>
              <option value='ingredients'>Кол-во ингридиентов</option>
              <option value='time'>Время приготовления</option>
            </select>
            <select size='1' name='way' className='way'>
              <option value='ascending'>По возрастанию</option>
              <option value='descending'>По убыванию</option>
            </select>
            <button className='sortBtn' type='submit'>Сортировать</button>
          </form>

          <div className="recipesList">
            {recipes.map((recipe) => (
              <div className="party" key={recipe.id}>
                <img src="/assets/red_heart.png" alt="red_heart" className='favorites party-heart' id={recipe.id}></img>
                <img className='party-logo' src={recipe.photo} alt={recipe.name}></img>
                <div className='recipe-title'>{recipe.name}</div>
                <div>Время приготовления: {recipe.time} мин.</div>
                  <div className='recipe-ingridients'>Количество ингредиентов: {recipe.ingridientsCount} шт.</div>
                  
              </div>
            ))}
          </div>
        </div>
      <script defer src="/js/recipes.js" />
    </Layout>
  );
};