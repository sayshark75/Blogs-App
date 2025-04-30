interface JWTPayload {
  email: string;
  name: ?string;
}

interface BlogsType {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
  views: number;
  userId: number;
}

interface BlogsResponseType {
  posts: BlogsType[];
  total: number;
  skip: number;
  limit: number;
}

interface User {
  name: string;
  email: string;
  loggedIn: boolean;
}

interface SignupInput extends User {
  password: string;
}
