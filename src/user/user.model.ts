import { DataTypes } from 'sequelize'
import Sequelize from '../db/connection'

export const User = Sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue:
        'https://res.cloudinary.com/dzqbzqgjw/image/upload/v1589788981/default_user_image_xqjqjy.png'
    }
  },
  { timestamps: true }
)
