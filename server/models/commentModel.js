import mongoose from 'mongoose';

const Populate = (field) =>
  function (next) {
    this.populate(field);
    next();
  };

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

commentSchema
  .pre('find', Populate('author', '-password'))
  .pre('find', Populate('replies'));

const Comment = mongoose.model('comment', commentSchema);
export default Comment;
