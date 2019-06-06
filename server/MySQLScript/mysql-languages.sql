use nodesql;

show databases;




CREATE TABLE forum_user (
    user_id INT NOT NULL AUTO_INCREMENT,
    user_name VARCHAR(20) NOT NULL,
    user_pass VARCHAR(60) NOT NULL,
    user_email VARCHAR(100) NOT NULL,
    user_phone VARCHAR(11) NOT NULL,
    user_avatar VARCHAR(100) NOT NULL,
    user_gender VARCHAR(10) NOT NULL,
    signup_moment VARCHAR(20) NOT NULL,
    user_corpus VARCHAR(10) NOT NULL,
    user_editor VARCHAR(10) NOT NULL,
    email_message VARCHAR(5) NOT NULL,
    self_introduction VARCHAR(200) NOT NULL,
    reward_setting VARCHAR(5) NOT NULL,
    reward_number INT NOT NULL,
    energy_owned INT NOT NULL,
    energy_rewarded INT NOT NULL,
    followers INT NOT NULL,
    PRIMARY KEY (user_id)
)  AUTO_INCREMENT=100000000;
     
create table user_post (
     post_id INT NOT NULL AUTO_INCREMENT,
     author_id VARCHAR(10) NOT NULL,
     author_name varchar(20) not null,
     corpus_tag VARCHAR(40) NOT NULL,
     release_status VARCHAR(3) NOT NULL,
     post_title VARCHAR(100) NOT NULL,
     post_content_html TEXT(0),
     post_content_raw TEXT(0),
     post_moment VARCHAR(20) NOT NULL,
     release_moment VARCHAR(20),
     post_views int(11) NOT NULL,
     post_likes int(11) NOT NULL,
     post_comments int(11) NOT NULL,
     post_collects int(11) NOT NULL,
     post_reward int(11) NOT NULL,
     article_intro varchar(210),
	 intro_img varchar(200),
     blockchain_id varchar(300),
     
     PRIMARY KEY ( post_id ));
     
create table user_comment (
     id INT NOT NULL AUTO_INCREMENT,
     post_id VARCHAR(10) NOT NULL,
	 parent_id VARCHAR(10) NOT NULL,
     user_name VARCHAR(20) NOT NULL,
     user_avatar VARCHAR(100) NOT NULL,
     content VARCHAR(200) NOT NULL,
     format_time VARCHAR(16) NOT NULL,
     time_string VARCHAR(20) NOT NULL,
     floor INT NOT NULL,
	 likes INT NOT NULL,
     PRIMARY KEY ( id ));
     
create table user_follow (
     id INT NOT NULL AUTO_INCREMENT,
     user_id VARCHAR(10) NOT NULL,
     user_name VARCHAR(20) NOT NULL,
	 followed_user_id VARCHAR(10) NOT NULL,
     followed_user_name VARCHAR(20) NOT NULL,
     follow_status VARCHAR(10) NOT NULL,
     created_at VARCHAR(16) NOT NULL,
     PRIMARY KEY ( id ));
     
create table user_like (
     id INT NOT NULL AUTO_INCREMENT,
     user_id VARCHAR(10) NOT NULL,
     user_name VARCHAR(20) NOT NULL,
     author_id VARCHAR(10) NOT NULL,
     author_name VARCHAR(20) NOT NULL,
	 post_id VARCHAR(10) NOT NULL,
	 post_title VARCHAR(100) NOT NULL,
     like_status VARCHAR(10) NOT NULL,
     created_at VARCHAR(16) NOT NULL,
     PRIMARY KEY ( id ));
     
create table user_collect (
     id INT NOT NULL AUTO_INCREMENT,
     user_id VARCHAR(10) NOT NULL,
     user_name VARCHAR(20) NOT NULL,
     author_id VARCHAR(10) NOT NULL,
     author_name VARCHAR(20) NOT NULL,
	 post_id VARCHAR(10) NOT NULL,
	 post_title VARCHAR(100) NOT NULL,
     collect_status VARCHAR(10) NOT NULL,
     created_at VARCHAR(16) NOT NULL,
     PRIMARY KEY ( id ));
     
create table user_reward (
     id INT NOT NULL AUTO_INCREMENT,
     reward_number INT NOT NULL,
     user_id VARCHAR(10) NOT NULL,
     user_name VARCHAR(40) NOT NULL,
     rewarded_user_id VARCHAR(10) NOT NULL,
     rewarded_user_name VARCHAR(20) NOT NULL,
	 post_id VARCHAR(10) NOT NULL,
	 post_title VARCHAR(100) NOT NULL,
     created_at VARCHAR(16) NOT NULL,
     PRIMARY KEY ( id ));
	
    
show tables;
     
