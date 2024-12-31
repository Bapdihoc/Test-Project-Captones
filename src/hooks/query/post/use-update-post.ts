import type { Post } from '@/types/post/post';

import { request } from '@/apis/request';

export const useUpdatePostStatus = (id: string | undefined, status: string) => {
    return async (): Promise<Post[]> => {
        const { entity } = await request<Post[]>(
            'put',
            `/post/update/${id}/status?status=${status}`,
            {},
            {
                paramsSerializer: {
                    indexes: null,
                },
            },
        );

        return entity;
    };
};
