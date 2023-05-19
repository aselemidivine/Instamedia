import Post from "../models/Post.js";

//LOGIC TO CREATE POST
export const createPost = async (req, res, next) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId); // Want to make sure we grab the user info
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save(); // Making sure we save this into the mongoDB

    // This grabs all the posts
    const post = await Post.findOne();
    res.status(201).json(post); // Successfully created a post
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// READ
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post); // Successful response
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// This will only grab the user feed post
export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// UPDATE
export const likePost = async (req, res, next) => {
  try {
    const { id } = req.params; // Trying to grab the particular id
    const { userId } = req.body;
    const post = await Post.findById();
    const isLiked = post.likes.get(userId); //Checking in the likes if the userId exist

    if (isLiked) {
      post.likes.delete(userId); //Delete if it exist
    } else {
      post.likes.set(userId, true); // if it doesnt exist, we are going to set it to true
    }

    // Update the post to the frontend, when the like button is clicked
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
