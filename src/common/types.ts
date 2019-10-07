export interface Post {
  id: string;
  creationTs: number;
  url: string;
  title: string;
  postSection: {
    name: string;
    url: string;
    imageUrl: string;
  };
  tags: Array<{ key: string; url: string }>;
  upVoteCount: number;
  downVoteCount: number;
  commentsCount: number;
  type: 'Photo' | 'Animated';
  images: {
    image460: Image;
    image460sv?: Video;
    image460svwm?: Video;
    image700: Image;
  };
}

interface Media {
  url: string;
  width: number;
  height: number;
}
export interface Image extends Media {
  webpUrl?: string;
}

export interface Video extends Media {
  duration: number;
  hasAudio: 0 | 1;
  vp9Url?: string;
  h265Url?: string;
}

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
