export interface Post {
  _id: number;
  discussionId: number;
  body: string;
}
export interface Discussion {
  _id: string;
  title: string;
  body: string;
}
