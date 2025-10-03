const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');
const bcrypt = require('bcryptjs');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
        isEmail: true,
    }
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        len: [8, 100],
        IsStrongPassoword(value){
            if (!/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/.test(value)) {
            throw new Error('A senha deve ter pelo menos 8 caracteres, com uma combinação de letras e números.');
          }
        }
    }
  },
  score:{
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  referralCode: {
    type: DataTypes.STRING,
    unique: true,
    defaultValue: DataTypes.UUIDV4 
  }
});

User.beforeCreate(async (user, options) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

module.exports = User;