const { Sequelize, DataTypes  } = require('sequelize');
const sequelize = new Sequelize('postgres://admin:admin123@db_poo:5432/db_poo_dev');

const User = sequelize.define('User', {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM(['user', 'admin']),
    defaultValue: 'user'
  }
}, {
  // Other model options go heree
  timestamps: true,
  createdAt: true,
  updatedAt: true
});

// Avoid migrations #TODO: install sequelize-cli to do migrations manually
// User.sync({ force: true });

module.exports = User;
// npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,username:string,password:string,email:string,role:enum:'{user,admin}'