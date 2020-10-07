const config = require('config');
const multer = require('multer');
const {join} = require('path');
const factory = require('./handlerFactory');
const AppError = require('./../util/appError');
const catchAsync = require('./../util/catchAsync');
const Post = require('../models/postModel');

const activeProvider = config.get('active_provider.name')


const multerFilter = (req, file, cb) => {

  // TODO: Allowed extensions/file types should be configured
  if (file.mimetype.startsWith('image')) { 
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const upload = multer({
  storage: require(join('..', 'providers'))[activeProvider],
  fileFilter: multerFilter
});

exports.uploadImages = upload.fields([{ name: 'images', maxCount: 2 }]);

exports.getPost = factory.getOne(Post, 'images');
exports.createPost = factory.createOne(Post);
exports.updatePost = factory.updateOne(Post);
