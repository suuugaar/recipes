const React = require('react');
const Layout = require('./Layout');

module.exports = function Recipes({ login, recipes }) {
  return (
    <Layout login={login}>
          <h1>Избранные рецепты</h1>
          <br /><br />
          <form name='sort'>
          <select multiple>
            <option value='apple'>По возрастанию</option>
            <option value='banana'>По убы</option>
            <option value='orange'>Апельсин</option>
          </select>
          <select multiple>
            <option value='apple'>Яблоко</option>
            <option value='banana'>Банан</option>
            <option value='orange'>Апельсин</option>
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
      {/* <script defer src="/js/party.js" /> */}
    </Layout>
  );
};