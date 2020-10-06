const Sequelize = require('sequelize');
const db = require('../db');

const Image = db.define('image', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: 'No Description'
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isUrl: true
    }
  },
  stock: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 1000
    }
  },
  owner: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Image;
