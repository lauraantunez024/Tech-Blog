const User = require('./User');
const Comment = require('./comments');
const Post = require('./post');

User.hasMany(Post, {
  foreignKey: 'UserId',
  onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});


Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
})


module.exports = { User, Post, Comment };
