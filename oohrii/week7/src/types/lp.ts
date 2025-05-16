export type Tag = {
    id: number;
    name: string;
}

export type Likes = {
    id: number;
    userId: number;
    lpId: number;
}

export interface Lp {
    id: number;
    title: string;
    artist: string;
    createdAt: string;
    imageUrl: string;
    description: string;
    tags: string[];
    likes: number;
}

export type ResponseLpListDto = {
    success: boolean;
    data: {
        data: Lp[];
        nextCursor: number | null;
        hasNext: boolean;
    };
    message?: string;
};

