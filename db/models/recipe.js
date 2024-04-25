const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    static associate({ User }) {
      this.belongsToMany(User, { through: 'Favorites', foreignKey: 'recipe_id' });
    }
  }
  Recipe.init({
    photo: DataTypes.STRING,
    name: DataTypes.STRING,
    ingridients: DataTypes.STRING,
    ingridientsCount: DataTypes.INTEGER,
    time: DataTypes.INTEGER,
    info: DataTypes.STRING,
    foreignId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Recipe',
  });
  return Recipe;
};
