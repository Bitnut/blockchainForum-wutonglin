/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_reward', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    reward_number: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    user_id: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    user_name: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    rewarded_user_id: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    rewarded_user_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    post_id: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    post_title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    created_at: {
      type: DataTypes.STRING(16),
      allowNull: false
    }
  }, {
    tableName: 'user_reward'
  });
};
