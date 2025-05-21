export interface LpItem {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  tags: { id: number; name: string }[];
  likes: { id: number; userId: number; lpId: number }[];
}

export interface LpListResponse {
  data: Array<LpItem>;
  nextCursor: number | null;
  hasNext: boolean;
}

export interface lpFetchParams {
  cursor?: number;
  limit?: number;
  search?: string;
  order?: 'asc' | 'desc';
}


export interface LpDetailResponse {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
  author: {
    id: number;
    name: string;
    email: string;
    bio: string | null;
    avatar: string | null;
    createdAt: string;
    updatedAt: string;
  };
  tags: { id: number; name: string }[];
  likes: { id: number; userId: number; lpId: number }[];
}


// LP 아이템 타입 정의
export interface LpItem {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  published: boolean;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}