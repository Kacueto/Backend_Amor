const { Sequelize, DataTypes  } = require('sequelize');
const sequelize = new Sequelize('postgres://admin:admin123@db_poo:5432/db_poo_dev');

const Image = sequelize.define('Image', {
  encodedImage: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  // Other model options go here
  timestamps: true,
  createdAt: true,
  updatedAt: true
});

// Avoid migrations #TODO: install sequelize-cli to do migrations manually
// Image.sync({ force: true });
// npx sequelize-cli model:generate --name Image --attributes encodedImage:TEXT
module.exports = Image;