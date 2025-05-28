export interface User {
  id: string;
  username: string;
  avatar: string;
}

export interface Post {
  id: string;
  user: User;
  imageUrl: string;
  caption: string;
  likes: number;
  liked: boolean;
  comments: Comment[];
  createdAt: string;
}

export interface Comment {
  id: string;
  user: User;
  text: string;
  createdAt: string;
}