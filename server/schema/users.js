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
    user_avatar: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    user_gender: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    signup_moment: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    user_editor: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    email_message: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    self_introduction: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    reward_setting: {
      type: DataTypes.STRING(5),
      allowNull: false
    },
    reward_number: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    }
  }, {
    tableName: 'users'
  });
};
