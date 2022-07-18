const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: 'post',
    freezeTableName: true,
    underscored: true
  }
  
);

module.exports = Post;
