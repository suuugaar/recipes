const React = require("react");
const Layout = require("./Layout");

function RecipeDetails({ recipe }) {
  return (
    <Layout>
      <div className="ingridientsContent">
        <div className="recipeDetails">
          <h2 className='ingridients-title'>{recipe.label}</h2>
          <img className='party-logo ingridients-logo' src={recipe.image} alt={recipe.label} />
          <div>Время приготовления: {recipe.totalTime} мин.</div>
            <h3 className='ingridients-title' >Ингредиенты:</h3>
            <ul className='ingridients-wrapper' >
           {recipe.ingredients.map((ing, index) => (
            <li className='ingridient-item' key={index}>{ing.text}</li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
}

module.exports = RecipeDetails;
