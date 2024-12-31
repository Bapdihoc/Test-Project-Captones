import type { Notification } from '@/types/notification';
import type { FC } from 'react';

import { css } from '@emotion/react';
import { Avatar, Card, Flex, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, FULL_TIME_FORMAT } from '@/consts/common';
import { useGetAllComments } from '@/hooks/query/comment/use-comment-by-post';
import { useCommentListing } from '@/hooks/query/comment/use-comment-listing';
import { usePostsListing } from '@/hooks/query/post/use-posts-listing';
import { useUpvoteListing } from '@/hooks/query/upvote/use-upvote-listing';
import { StarIcon } from '@/utils/asset';
import { PATHS } from '@/utils/paths';
import { put } from '@/utils/service';

interface NotificationItemProps {
    notification: Notification;
}

const NotificationItem: FC<NotificationItemProps> = ({ notification }) => {
    const { data: upvotes } = useUpvoteListing();
    const { data: comments } = useGetAllComments();
    const { data: posts } = usePostsListing({
        params: {
            page: DEFAULT_PAGE,
            perPage: DEFAULT_PAGE_SIZE,
        },
    });
    const navigate = useNavigate();

    if (!notification) return null;

    const notiParsed = notification?.message?.includes('{')
        ? JSON.parse(notification?.message ?? '{}')
        : notification?.message;

    const handleReadNotification = async () => {
        const endpoint = `/notification/update-status/${notification?.notificationId}`;
        const updatedData = { read: true };
        const response = await put<Notification>(endpoint, updatedData);

        if (response.status === 200) {
            notiParsed?.id && notiParsed?.entity === 'Post';
            navigate(PATHS.POST_DETAIL.replace(':id', notiParsed?.id));
        }
    };

    return (
        <Card css={styles} onClick={handleReadNotification}>
            <Flex vertical gap={6}>
                <Flex align="center" gap={10}>
                    <div>
                        <img src={StarIcon} alt="Star Icon" />
                    </div>
                    <div>
                        <Avatar src={notification?.account?.avatar} />
                    </div>
                    {!notification.read && (
                        <Tag color="blue" css={unreadTagStyle}>
                            Unread
                        </Tag>
                    )}
                </Flex>
                <div>
                    <Typography.Text className="notification-title">{notification?.title}</Typography.Text>
                </div>
                <div>
                    <Typography.Text>
                        {notiParsed?.entity === 'Upvote' &&
                            `${
                                upvotes?.find(upvote => upvote?.upvoteId === notiParsed?.id)?.account?.username
                            } liked your post`}
                        {notiParsed?.entity === 'Comment' &&
                            `${
                                comments?.find(comment => comment?.commentId === notiParsed?.id)?.account?.username
                            } commented on your post`}
                        {notiParsed?.entity === 'Report' &&
                            `${
                                posts?.find(post => post?.postId === notiParsed?.id)?.account?.username
                            } reported on your post`}{' '}
                        {notiParsed?.entity === 'Daily point' && 'You have received daily point'}-{' '}
                        {notification?.createdDate ? dayjs(notification?.createdDate).format(FULL_TIME_FORMAT) : ''}
                    </Typography.Text>
                </div>
            </Flex>
        </Card>
    );
};

const styles = css(`
    border-radius: 0;

    .notification-title {
        font-weight: 600;
        font-size: 16px;
    }
`);

const unreadTagStyle = css(`
    margin-left: 8px;
`);

export default NotificationItem;
