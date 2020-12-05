'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     /* Subcategory-Category association */
     await queryInterface.addColumn('Subcategories', 'categoryId', {
      type: Sequelize.INTEGER,
      after: 'name',
      references: {
        model: 'Categories',
        key: 'categoryId',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    /* Book-Subcategory association */
    await queryInterface.addColumn('Books', 'subcategoryId', {
      type: Sequelize.INTEGER,
      after: 'bookId',
      references: {
        model: 'Subcategories',
        key: 'subcategoryId',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Subcategories', 'categoryId');
    await queryInterface.removeColumn('Books', 'subcategoryId');
    
  }
};
