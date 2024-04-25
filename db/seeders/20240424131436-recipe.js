/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Recipes',
      [
        {
          photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQG_TILFvQla0dFYT1znSF7CtPkla0okKU9d2u6TNW8pQ&s',
          name: 'Куриные тикка бургеры',
          ingridients: 'разные ингридиенты',
          ingridientsCount: 3,
          time: 10,
          info: 'слепить, запечь, достать',
          foreignId: 1555,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSINgaY83gwFDRd2iYGEL_htQGsTtkYNIEYh5PzmpkvxQ&s',
          name: 'Куриные тостады на гриле',
          ingridients: 'разные ингридиенты',
          ingridientsCount: 7,
          time: 20,
          info: 'залить, испечь',
          foreignId: 1600,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          photo: 'https://organicmarket.ru/static/upload/medialibrary/371/37195ae027047a16198c3f0472063cd7.jpg',
          name: 'Нарезанная курица',
          ingridients: 'разные ингридиенты',
          ingridientsCount: 11,
          time: 5,
          info: 'нарезать, потушить, съесть',
          foreignId: 1444,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Recipes', null, {});
  },
};
