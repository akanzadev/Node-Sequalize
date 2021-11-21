import { DataTypes, Model } from 'sequelize'
import Sequelize from '../db/connection'

class UserModel extends Model {
    public id!: number
    public name!: String
    public lastname!: string
    public age!: number
    public email!: string
    public password!: string
    public status!: boolean
    public image!: string
    public createdAt!: Date
    public updatedAt!: Date
}

export const User = Sequelize.define<UserModel>(
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
    password: {
      type: DataTypes.STRING,
      allowNull: false
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
