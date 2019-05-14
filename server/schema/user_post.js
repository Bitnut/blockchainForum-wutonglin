/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_post', {
    post_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    author_id: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    author_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    corpus_tag: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    release_status: {
      type: DataTypes.STRING(3),
      allowNull: false
    },
    post_title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    post_content_html: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    post_content_raw: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    post_moment: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    release_moment: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    post_views: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    post_likes: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    post_comments: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    post_collects: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    post_reward: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    article_intro: {
      type: DataTypes.STRING(210),
      allowNull: true
    },
    intro_img: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    blockchain_id: {
      type: DataTypes.STRING(300),
      allowNull: true
    }
  }, {
    tableName: 'user_post'
  });
};
