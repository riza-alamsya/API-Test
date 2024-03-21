
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CreditCardUser = sequelize.sequelize.define('credit_card_users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_users: {
        type: DataTypes.INTEGER
    },
    id_cc: {
        type: DataTypes.INTEGER
    },
    status: {
        type: DataTypes.STRING
    },

});
CreditCardUser.associate = (models) => {
    CreditCardUser.belongsTo(models.CreditCard, { foreignKey: 'id_cc', as: 'creditcard' });
};

module.exports = CreditCardUser;
