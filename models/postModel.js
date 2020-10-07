const mongoose = require('mongoose');
const postSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: true
    },
    // TODO: use `resources` instead of images and change accorodingly
    images: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'images',
      required: true
    },
    isAnonymous: {
      type: Boolean,
      default: true
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
