const User = require('./user');
const Image = require('./image');
const Folder = require('./folder');
const FolderImages = require('./folderImages');

// Associations:
Folder.belongsTo(User);
User.hasMany(Folder);

Folder.belongsToMany(Image, { through: FolderImages });
Image.belongsToMany(Folder, { through: FolderImages });

module.exports = {
  User,
  Image,
  Folder,
  FolderImages
};
