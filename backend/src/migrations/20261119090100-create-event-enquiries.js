'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('event_enquiries', {
      id: { type: Sequelize.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
      name: { type: Sequelize.STRING(120), allowNull: false },
      email: { type: Sequelize.STRING(254), allowNull: false },
      phone: { type: Sequelize.STRING(30), allowNull: false },
      event_type: { type: Sequelize.STRING(60), allowNull: false },
      preferred_date: { type: Sequelize.DATEONLY, allowNull: true },
      guests: { type: Sequelize.SMALLINT.UNSIGNED, allowNull: true },
      requirements: { type: Sequelize.TEXT, allowNull: true },
      status: { type: Sequelize.ENUM('new', 'in_progress', 'closed'), allowNull: false, defaultValue: 'new' },
      notified_at: { type: Sequelize.DATE, allowNull: true },
      created_at: { type: Sequelize.DATE, allowNull: false },
      updated_at: { type: Sequelize.DATE, allowNull: false },
    });
    await queryInterface.addIndex('event_enquiries', ['created_at']);
    await queryInterface.addIndex('event_enquiries', ['status']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('event_enquiries');
  },
};
