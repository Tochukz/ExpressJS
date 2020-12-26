'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {   
     await queryInterface.bulkInsert('Staffs', [
       {
         firstname: 'John',
         lastname: 'Kelvin',
         email: 'john.kelvin@gmail.com',
         createdAt: new Date(),
         updatedAt: new Date()
       },
       {
         firstname: 'Max',
         lastname: 'Peters',
         email: 'maxpeters@outlook.com',
         createdAt: new Date(),
         updatedAt: new Date()
       }
     ], {});  
  },

  down: async (queryInterface, Sequelize) => {   
    await queryInterface.bulkDelete('Staffs', null, {}); 
  }
};
