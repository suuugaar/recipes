const React = require("react");
const Layout = require("./Layout");

function Home({ login, data }) {
  return (
    <Layout login={login}>
      <div className="mainContainer">

      <form className='sortHome'>
           <select size='1' className='argument'>
              <option value='ingredients'>Кол-во ингредиентов</option>
              <option value='time'>Время приготовления</option>
            </select>
            <select size='1' name='way' className='way'>
              <option value='ascending'>По возрастанию</option>
              <option value='descending'>По убыванию</option>
            </select>
            <button className='sortBtn' type='submit'>Сортировать</button>
          </form>

        <h1 className="title">Все рецепты</h1>
        <div id="recipesContainer"></div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <script defer src="/js/recipesApi.js"></script>
    </Layout>
  );
}

module.exports = Home;
