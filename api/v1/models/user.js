// models/user.js

const { DataTypes } = require('sequelize');
const db = require('../config/db');

const User = db.sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    address: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    }
});

module.exports = User;
