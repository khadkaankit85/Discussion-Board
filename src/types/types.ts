import { Types } from "mongoose";

export interface User {
  name: string;
  email: string;
  userid: string;
}

interface IDiscussion {
  title: string;
  discussionBody: string;
  postedBy: Types.ObjectId;
  posts: Types.ObjectId[];
}

interface IUser {
  name: string;
  email: string;
  emailId?: string;
  password: string;
  role: string;
  discussions: Types.ObjectId[];
  lastOtpRequest: Date;
  otp: number;
  image?: string;
}

interface IPost {
  body: string;
  discussionId: Types.ObjectId;
  postedBy: Types.ObjectId;
  postedAt: Date;
}
