import Post from '../models/postModel.js';

//CREATE
const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const loggedInUser = req.user;
    const newPost = new Post({
      content,
      author: loggedInUser._id,
      likes: [],
      comments: [],
    });
    await newPost.save();

    const allPost = await Post.find({})
      .populate('comments')
      .populate('author', '-password');
    res.status(201).json(allPost);
  } catch (err) {
    res.status(409).json({
      message: err.message,
    });
  }
};

// READ
const getFeedPosts = async (req, res) => {
  try {
    const allPost = await Post.find({})
      .populate('comments')
      .populate('likes')
      .populate('author', '-password');
    res.status(200).json(allPost);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

//UPDATE
const likePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);

    const { userId } = req.body;

    if (post.likes.includes(userId)) {
      await Post.findByIdAndUpdate(
        { _id: postId },
        { $pull: { likes: userId } }
      );
      return res.status(200).send({ comment: 'UnLicked' });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      { _id: postId },
      { $push: { likes: userId } }
    );

    return res.send({ comment: 'Licked' }).status(200);
  } catch (err) {
    res.status(404).json({
      message: err.message,
    });
  }
};

const getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id })
      .populate('author', '-password')
      .populate('likes')
      .populate('comments');
    res.status(200).json(post);
  } catch (error) {
    res.status(500).send(error);
  }
};
/*

route.patch("/editPost/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).send(error);
  }
});

route.delete("/deletePost/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete({ _id: req.params.id });
    res.status(200).send(deletedPost);
  } catch (error) {
    res.status(500).send(error);
  }
});
*/

export { getSinglePost, createPost, getFeedPosts, likePost };
