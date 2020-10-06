const Sequelize = require('sequelize');

const db = require('../db');
const Image = require('./image');
const FolderImages = require('./folderImages');

const Folder = db.define('folder', {
  total: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 50000000
    }
  },
  status: {
    type: Sequelize.STRING,
    defaultValue: 0,
    validate: {
      isIn: [['pending', 'completed']]
    }
  }
});

Folder.getTotalImages = async folderId => {
  const folder = await Folder.findByPk(folderId, {
    include: [{ model: Image, as: FolderImages }]
  });

  const imagesInFolder = folder.images;

  const totalFolder = imagesInFolder.reduce((acc, val) => {
    return acc + val.folderImages.total;
  }, 0);

  folder.total = totalFolder;
  await folder.save();
};

module.exports = Folder;
