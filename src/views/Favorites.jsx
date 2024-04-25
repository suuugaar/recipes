const React = require('react');
const Layout = require('./Layout');

module.exports = function Recipes({ login, recipes }) {
  return (
    <Layout login={login}>
          <h1>Избранные рецепты</h1>
          <br /><br />
          <form className='sort'>
          <select size='1' className='argument'>
            <option value='ingredients'>количество ингридиентов</option>
            <option value='time'>время приготовления</option>
          </select>
          <select size='1' name='way' className='way'>
            <option value='ascending'>по возрастанию</option>
            <option value='descending'>по убыванию</option>
          </select>
          <button type='submit'>Сортировать</button>
          </form>

          <div className="recipesList">
            {recipes.map((recipe) => (
              <div className="party" key={recipe.id}>
                
                <img src={recipe.photo} alt={recipe.name}></img>
                <div>{recipe.name}</div>
                <div className='smallConteiner'>
                  <div>{recipe.ingridientsCount}</div>
                  <div>{recipe.time}</div>
                </div>
              </div>
            ))}
          </div>
      <script defer src="/js/recipes.js" />
    </Layout>
  );
};