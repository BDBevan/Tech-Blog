// migrations/YYYYMMDDHHMMSS-create-comments.js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Posts', // Reference to the Posts table
          key: 'id',
        },
        onDelete: 'CASCADE', // If a post is deleted, its comments are also deleted
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users', // Reference to the Users table
          key: 'id',
        },
        onDelete: 'CASCADE', // If a user is deleted, their comments are also deleted
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Comments');
  },
};
