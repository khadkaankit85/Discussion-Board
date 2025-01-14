import { Request, Response, Router } from "express";
import { Discussion, Post, User } from "../schemas/schemas";

const router = Router();

//router to get the discussions
router.get("/getdiscussions", async (req: Request, res: Response) => {
  try {
    const discussions = await Discussion.find({});
    res.status(200).json(discussions);
  } catch {
    console.log(Error);
    res.status(400).json("couldnt fetch discussions");
  }
});

//router to get posts on the discussion
router.post("/findposts", async (req: Request, res: Response) => {
  const { discussionId } = req.body;
  try {
    const discussion = await Discussion.findOne({ _id: discussionId });
    if (!discussion) {
      res.status(400).json("discussion not found");
      return;
    }
    const posts = await Post.find({ discussionId: discussion._id });
    res.send(JSON.stringify(posts));
  } catch {
    res.status(400).json("couldnt fetch posts");
  }
});

router.post("/createDiscussion", async (req: Request, res: Response) => {
  const { userId, title, discussionBody } = req.body;

  if (!userId || !title || !discussionBody) {
    res.status(400).json("fields are not provided");
    return;
  }
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      res.status(401).send("user doesn't exit");
      return;
    }

    const discussion = await Discussion.create({
      title: title,
      discussionBody: discussionBody,
      postedby: user._id,
    });

    res.status(201).json(discussion);
  } catch (err) {
    console.log(err);
    res.status(400).json("couldnt create discussion");
  }
});

router.post("/createPost", async (req: Request, res: Response) => {
  const { discussionId, body, userId } = req.body;
  console.log(discussionId, body, userId);

  if (!discussionId || !body || !userId) {
    res.status(400).json("fields are not provided");
    return;
  }
  try {
    const discussion = await Discussion.findOne({ _id: discussionId });
    if (!discussion) {
      res.status(401).send("discussion doesn't exist");
      return;
    }

    const post = await Post.create({
      discussionId: discussion._id,
      body: body,
      postedBy: userId,
    });

    res.status(201).json(post);
  } catch {
    console.log(Error);
    res.status(400).json("couldnt create discussion");
  }
});

export default router;
