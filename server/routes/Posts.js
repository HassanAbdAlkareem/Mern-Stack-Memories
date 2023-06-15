const router = require("express").Router();
const Post = require("../models/Posts");
const verfiyAuth = require("../middleware/VerfiyAuth");
const User = require("../models/User");

// get all Post
router.get("/", async (req, res) => {
  const PAGE_SIZE = 6;
  const page = req.query.page || "0";

  try {
    const totalPage = await Post.countDocuments();
    const posts = await Post.find({})
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * page);
    res
      .status(200)
      .json({ posts, totalPage: Math.ceil(totalPage / PAGE_SIZE) });
  } catch (error) {
    res.status(401).send(error.message);
    console.log(error.message);
  }
});

//get single post
router.get("/:id", async (req, res) => {
  try {
    const singlePost = await Post.findById(req.params.id);
    res.status(200).send(singlePost);
  } catch (error) {
    res.status(401).send(error.message);
    console.log(error.message);
  }
});

// Create Post
router.post("/", verfiyAuth, async (req, res) => {
  try {
    const newPost = Post(req.body);
    newPost.save();
    res.status(200).send(newPost);
  } catch (error) {
    res.status(401).send(error.message);
    console.log(error.message);
  }
});

// Update Post
router.put("/:id", verfiyAuth, async (req, res) => {
  const checkUser = await Post.findById(req.params.id);
  const checkAdmin = await User.findOne({ name: req.body.name });

  if (checkUser.name === req.body.name || checkAdmin.isAdmin === true) {
    try {
      const updatePost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).send(updatePost);
    } catch (error) {
      res.status(401).send(error);
      console.log(error.message);
    }
  } else {
    res.status(401).send("you are not allowed to do this event");
  }
});

// update like
router.put("/like/:id", verfiyAuth, async (req, res) => {
  try {
    const updateLike = await Post.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updateLike);
  } catch (error) {
    res.status(401).send(error);
    console.log(error.message);
  }
});

// Delete post
router.delete("/:id", verfiyAuth, async (req, res) => {
  const checkUser = await Post.findById(req.params.id);
  const checkAdmin = await User.findOne({ name: req.body.name });

  if (req.body.name === checkUser.name || checkAdmin.isAdmin === true) {
    try {
      const deletePost = await checkUser.delete();
      res.status(200).send(deletePost);
    } catch (error) {
      res.status(401).send(error.message);
      console.log(error.message);
    }
  } else {
    console.log("you are not allowed to do this event");
    res.status(401).send("you are not allowed to do this event");
  }
});

// Delete All
router.delete("/", verfiyAuth, async (req, res) => {
  const checkUser = await Post.findOne({ name: req.body.name });
  const checkAdmin = await User.findOne({ name: req.body.name });
  //
  if (req.body.name === checkUser.name || checkAdmin.isAdmin === true) {
    try {
      const deleteMany = await Post.deleteMany({ name: req.body.name });
      res.status(200).send(deleteMany);
    } catch (error) {
      res.status(401).send(error.message);
      console.log(error);
    }
  } else {
    console.log("you are not allowed to do this event");
    res.status(401).send("you are not allowed to do this event");
  }
});

//comments on post
router.post("/comment/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = {
      value: req.body.value,
      username: req.body.username,
    };
    post.comments.push(comment);
    const updatePost = await Post.findByIdAndUpdate(req.params.id, post, {
      new: true,
    });
    res.status(200).send(updatePost);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/comment/:id", async (req, res) => {
  try {
    const getCommentsForOnePost = await Post.findById(req.params.id);
    res.status(200).send(getCommentsForOnePost);
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.delete("/comment/:id", async (req, res) => {
  const { index } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    const filter = post.comments.filter((value, i) => {
      return index !== i;
    });

    post.comments = filter;
    const updatePost = await Post.findByIdAndUpdate(req.params.id, post, {
      new: true,
    });

    res.status(200).send(updatePost);
  } catch (error) {
    res.status(401).sned(error.message);
  }
});
//
module.exports = router;
