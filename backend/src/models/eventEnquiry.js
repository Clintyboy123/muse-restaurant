// An enquiry about a function at Muse or external catering (Events & Catering page).
module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    'EventEnquiry',
    {
      name: { type: DataTypes.STRING(120), allowNull: false },
      email: { type: DataTypes.STRING(254), allowNull: false },
      phone: { type: DataTypes.STRING(30), allowNull: false },
      eventType: { type: DataTypes.STRING(60), allowNull: false },
      preferredDate: { type: DataTypes.DATEONLY, allowNull: true },
      guests: { type: DataTypes.SMALLINT.UNSIGNED, allowNull: true },
      requirements: { type: DataTypes.TEXT, allowNull: true },
      status: { type: DataTypes.ENUM('new', 'in_progress', 'closed'), allowNull: false, defaultValue: 'new' },
      notifiedAt: { type: DataTypes.DATE, allowNull: true },
    },
    { tableName: 'event_enquiries' }
  );
