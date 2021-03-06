'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

    return queryInterface.bulkInsert('Games', [
      {
        id: 1,
        name: 'Bet on Poker',
        code: 'poker'
      },
      {
        id: 2,
        name: 'Baccarat',
        code: 'baccarat'
      },
      {
        id: 3,
        name: 'War of Bets',
        code: 'war'
      }
    ])
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
