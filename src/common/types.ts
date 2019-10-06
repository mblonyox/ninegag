export interface Comment {
  commentId: string;
  type: string;
  orderKey: string;
  children: Comment[];
  user: User;
}

export interface User {
  displayName: string;
  hashedAccountId: string;
}
