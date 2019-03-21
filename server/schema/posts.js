/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('posts', {
    post_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    post_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    md: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    uid: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    moment: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    comments: {
      type: DataTypes.STRING(300),
      allowNull: false,
      defaultValue: '0'
    },
    pv: {
      type: DataTypes.STRING(40),
      allowNull: false,
      defaultValue: '0'
    },
    avator: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'posts'
  });
};
