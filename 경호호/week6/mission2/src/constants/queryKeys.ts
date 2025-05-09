export const QUERY_KEYS = {
  LP: {
    all: ['lp'] as const,
    lists: () => [...QUERY_KEYS.LP.all, 'list'] as const,
    list: (params: Record<string, any>) => [...QUERY_KEYS.LP.lists(), params] as const,
    infiniteLists: () => [...QUERY_KEYS.LP.all, 'infiniteList'] as const,
    infiniteList: (params: Record<string, any>) => [...QUERY_KEYS.LP.infiniteLists(), params] as const,
    details: () => [...QUERY_KEYS.LP.all, 'detail'] as const,
    detail: (id: string) => [...QUERY_KEYS.LP.details(), id] as const,
  },
  COMMENT: {
    all: ['comment'] as const,
    lists: () => [...QUERY_KEYS.COMMENT.all, 'list'] as const,
    list: (params: Record<string, any>) => [...QUERY_KEYS.COMMENT.lists(), params] as const,
    infiniteLists: () => [...QUERY_KEYS.COMMENT.all, 'infiniteList'] as const,
    infiniteList: (params: Record<string, any>) => [...QUERY_KEYS.COMMENT.infiniteLists(), params] as const,
  },
};
