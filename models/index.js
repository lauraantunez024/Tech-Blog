const User = require('./User');
const Comment = require('./Comments');
const Post = require('./Post');

User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
  foreignKey: 'postId',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});


Comment.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})


module.exports = { User, Post, Comment };
