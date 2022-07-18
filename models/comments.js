const { Model, Datatype, DataTypes } = require('sequelize');
const sequelize = require('../config/connection')

class Comment extends Model {}

Comment.init(
    {
        id: {
            type: Datatype.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'comment',
        freezeTableName: true,
        underscored: true
    }
);

module.exports = Comment;
