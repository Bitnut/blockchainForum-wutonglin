/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    user_pass: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    user_email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    user_phone: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    user_avator: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    signup_moment: {
      type: DataTypes.STRING(30),
      allowNull: true
    }
  }, {
    tableName: 'users'
  });
};
