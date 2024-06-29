"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const workspace = await queryInterface.rawSelect(
      'workspaces',
      {
        where: {
          id: 1,
        },
      },
      ['id']
    );

    if (!workspace) {
      await queryInterface.bulkInsert("workspaces", [
        {
          id: 1,
          name: "Sleact",
          url: "sleact",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }

    const channel = await queryInterface.rawSelect(
      'channels',
      {
        where: {
          id: 1,
        },
      },
      ['id']
    );

    if (!channel) {
      await queryInterface.bulkInsert("channels", [
        {
          id: 1,
          name: "일반",
          private: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          WorkspaceId: 1,
        },
      ]);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('channels', { id: 1 }, {});
    await queryInterface.bulkDelete('workspaces', { id: 1 }, {});
  },
};