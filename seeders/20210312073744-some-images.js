"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "images",
      [
        {
          title: "Lake",
          url: "https://gr.pinterest.com/pin/11399805445385876/",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Forest",
          url: "https://gr.pinterest.com/pin/197595502392575318/",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Wave",
          url: "https://gr.pinterest.com/pin/6473993204728466/",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Road",
          url: "https://gr.pinterest.com/pin/3518505948959827/",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Sunset",
          url: "https://gr.pinterest.com/pin/13370130133742515/",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    Example: await queryInterface.bulkDelete("images", null, {});
  },
};
