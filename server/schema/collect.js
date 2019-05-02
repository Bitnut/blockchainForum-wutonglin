/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('collect', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.STRING(10),
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
    post_img: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    collect_status: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    created_at: {
      type: DataTypes.STRING(16),
      allowNull: false
    }
  }, {
    tableName: 'collect'
  });
};
