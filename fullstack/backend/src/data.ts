// Mock data for the social media analytics app

export interface User {
  id: string;
  name: string;
  postCount: number;
  avatarUrl: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  commentCount: number;
  author: {
    id: string;
    name: string;
    avatarUrl: string;
  };
  createdAt: string;
}

// Mock users
export const users: User[] = [
  {
    id: '1',
    name: 'John Doe',
    postCount: 120,
    avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
  },
  {
    id: '2',
    name: 'Jane Smith',
    postCount: 95,
    avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    postCount: 78,
    avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: '4',
    name: 'Alice Williams',
    postCount: 65,
    avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    id: '5',
    name: 'Charlie Brown',
    postCount: 52,
    avatarUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
  },
  {
    id: '6',
    name: 'Eva Green',
    postCount: 47,
    avatarUrl: 'https://randomuser.me/api/portraits/women/6.jpg',
  },
];

// Mock posts
export const posts: Post[] = [
  {
    id: '1',
    title: 'My First Post',
    content: 'This is the content of my first post. It is very interesting!',
    imageUrl: 'https://picsum.photos/seed/post1/800/400',
    commentCount: 25,
    author: {
      id: '1',
      name: 'John Doe',
      avatarUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    createdAt: '2023-05-15T12:00:00Z',
  },
  {
    id: '2',
    title: 'Exploring Nature',
    content: 'Today I went hiking and saw some amazing views!',
    imageUrl: 'https://picsum.photos/seed/post2/800/400',
    commentCount: 42,
    author: {
      id: '2',
      name: 'Jane Smith',
      avatarUrl: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    createdAt: '2023-05-14T10:30:00Z',
  },
  {
    id: '3',
    title: 'Cooking Adventures',
    content: 'I tried a new recipe and it turned out great!',
    imageUrl: 'https://picsum.photos/seed/post3/800/400',
    commentCount: 18,
    author: {
      id: '3',
      name: 'Bob Johnson',
      avatarUrl: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    createdAt: '2023-05-13T15:45:00Z',
  },
  {
    id: '4',
    title: 'Book Recommendations',
    content: 'Here are my top 5 book recommendations for this month.',
    imageUrl: 'https://picsum.photos/seed/post4/800/400',
    commentCount: 35,
    author: {
      id: '4',
      name: 'Alice Williams',
      avatarUrl: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    createdAt: '2023-05-12T09:15:00Z',
  },
  {
    id: '5',
    title: 'Tech News',
    content: 'The latest updates from the tech world you should know about.',
    imageUrl: 'https://picsum.photos/seed/post5/800/400',
    commentCount: 42,
    author: {
      id: '5',
      name: 'Charlie Brown',
      avatarUrl: 'https://randomuser.me/api/portraits/men/5.jpg',
    },
    createdAt: '2023-05-11T14:20:00Z',
  },
]; 