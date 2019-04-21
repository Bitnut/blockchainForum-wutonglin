/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comments', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    post_id: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    parent_id: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    user_avatar: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    content: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    format_time: {
      type: DataTypes.STRING(16),
      allowNull: false
    },
    time_string: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    floor: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    likes: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'comments'
  });
};
