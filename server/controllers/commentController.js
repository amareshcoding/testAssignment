import Comment from '../models/commentModel.js';
import Post from '../models/postModel.js';

// CREATE
const commentOnAPost = async (req, res) => {
  try {
    const { content, author } = req.body;
    console.log('content, author: ', content, author);
    const { postId } = req.params;
    const newComment = {
      content,
      author: author,
      likes: [],
      replies: [],
    };
    const comment = await Comment.create(newComment);

    const updatedPost = await Post.findByIdAndUpdate(
      { _id: postId },
      { $push: { comments: comment._id } }
    );
    console.log('updatedPost: ', updatedPost);
    res.status(200).send(comment);
  } catch (error) {
    res.status(500).send(error);
  }
};

const commentOnAComment = async (req, res) => {
  try {
    const { content, author } = req.body;
    const { commentId } = req.params;
    const newComment = {
      content,
      author: author,
      likes: [],
      replies: [],
    };

    const comment = await Comment.create(newComment);
    const updatedComment = await Comment.findByIdAndUpdate(
      { _id: commentId },
      { $push: { replies: comment._id } }
    );
    res.status(200).send(comment);
  } catch (err) {
    res.status(409).json({
      message: err.message,
    });
  }
};

//PATCH
const likeAComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId } = req.body;

    const comment = await Comment.findById({ _id: commentId });
    if (comment.likes.includes(userId)) {
      await Comment.findByIdAndUpdate(
        { _id: commentId },
        { $pull: { likes: userId } }
      );
      return res.send({ comment: 'UnLicked' }).status(200);
    }
    await Comment.findByIdAndUpdate(
      { _id: commentId },
      { $push: { likes: userId } }
    );
    return res.send({ comment: 'Licked' }).status(200);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

export { commentOnAPost, commentOnAComment, likeAComment };
