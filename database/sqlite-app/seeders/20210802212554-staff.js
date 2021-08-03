'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.bulkInsert('staffs', [
      {       
        firstname: 'John', 
        lastname: 'Smith', 
        email: 'json@gmail.om',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      ], {});
    
  },

  down: async (queryInterface, Sequelize) => {   
     await queryInterface.bulkDelete('staffs', null, {});     
  }
};
