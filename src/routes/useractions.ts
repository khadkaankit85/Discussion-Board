import { Request, Response, Router } from "express";

const router = Router();

//router to get the discussions
router.get("/getdiscussions", (req: Request, res: Response) => {});

//router to get posts on the discussion
router.get("/getposts", (req: Request, res: Response) => {});

router.post("/createDiscussion", (req: Request, res: Response) => {
  const data = req.body;
});

export default router;
