export interface Discussion {
  id: number;
  title: string;
  body: string;
}

export interface Post {
  id: number;
  discussionId: number;
  body: string;
}
