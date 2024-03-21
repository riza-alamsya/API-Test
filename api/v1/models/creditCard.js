
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const CreditCard = sequelize.sequelize.define('credit_card', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    creditcard_type: {
        type: DataTypes.STRING
    },
    creditcard_number: {
        type: DataTypes.STRING
    },
    creditcard_name: {
        type: DataTypes.STRING
    },
    creditcard_expired: {
        type: DataTypes.STRING
    },
    creditcard_cvv: {
        type: DataTypes.STRING
    }
});

module.exports = CreditCard;
