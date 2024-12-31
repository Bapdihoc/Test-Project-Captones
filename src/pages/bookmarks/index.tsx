import { Card, Divider, Empty, Flex } from 'antd';

import PageBreadcrumbs from '@/components/core/page-breadcrumbs';
import { PostItem } from '@/components/post/post-item';
import { useBookmarkListing } from '@/hooks/query/bookmark/use-bookmark-listing';

import { PostWrapper } from '../post/layout/post-wrapper';

const BookmarksPage = () => {
    const { data } = useBookmarkListing();

    return (
        <Card>
            <PageBreadcrumbs />
            <Divider />
            {data?.length ? (
                <Flex vertical gap={20}>
                    <PostWrapper>
                        {data?.map(post => (
                            <PostItem key={post.postId} data={post} />
                        ))}
                    </PostWrapper>
                </Flex>
            ) : (
                <Empty />
            )}
        </Card>
    );
};

export default BookmarksPage;
