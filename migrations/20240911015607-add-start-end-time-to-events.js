/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Events', 'startTime', {
      type: Sequelize.TIME,
      allowNull: false,
      defaultValue: '00:00:00' // Provide a default value
    });
    await queryInterface.addColumn('Events', 'endTime', {
      type: Sequelize.TIME,
      allowNull: false,
      defaultValue: '00:00:00' // Provide a default value
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Events', 'startTime');
    await queryInterface.removeColumn('Events', 'endTime');
  }
};
