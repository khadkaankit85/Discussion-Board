import { Request, Response, Router } from "express";
import { Discussion, Post } from "../schemas/schemas";

const router = Router();

//router to get the discussions
router.get("/getdiscussions", (req: Request, res: Response) => {
  try {
    const discussions = Discussion.find();
    res.status(200).json(discussions);
  } catch {
    res.status(400).json("couldnt fetch discussions");
  }
});

//router to get posts on the discussion
router.get("/getposts", (req: Request, res: Response) => {
  const { discussionId } = req.body;
  try {
    const discussions = Post.find({ discussionId });
    res.status(200).json(discussions);
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
    const discussion = await Discussion.create({
      title: title,
      discussionBody: discussionBody,
      postedby: userId,
    });

    res.status(201).json(discussion);
  } catch (err) {
    res.status(400).json("couldnt create discussion");
  }
});

router.post("/createPost", async (req: Request, res: Response) => {
  const { discussionId, body, userId } = req.body;

  if (!discussionId || !body || !userId) {
    res.status(400).json("fields are not provided");
    return;
  }
  try {
    const post = await Post.create({
      discussionId: discussionId,
      body: body,
      postedBy: userId,
    });

    res.status(201).json(post);
  } catch {
    res.status(400).json("couldnt create discussion");
  }
});

export default router;
