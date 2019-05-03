/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('posts', {
    post_id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    author_id: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    corpus_tag: {
      type: DataTypes.STRING(40),
      allowNull: false
    },
    release_status: {
      type: DataTypes.STRING(5),
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
      type: DataTypes.DATE,
      allowNull: false
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
    intro_img: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    article_intro: {
      type: DataTypes.STRING(210),
      allowNull: true
    },
    release_moment: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    author_name: {
      type: DataTypes.STRING(60),
      allowNull: false
    },
    blockchain_id: {
      type: DataTypes.STRING(300),
      allowNull: true
    },
    post_collects: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    }
  }, {
    tableName: 'posts'
  });
};
