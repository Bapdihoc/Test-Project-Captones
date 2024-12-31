import type { RootState } from '@/stores';
import type { CommentCreatePayload } from '@/types/comment/comment';

import { useQueryClient } from '@tanstack/react-query';
import { Avatar, Flex, Form, Input } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import AvatarPlaceholder from '/public/avatar-placeholder.svg';
import { SOCKET_EVENT } from '@/consts/common';
import { commentKeys } from '@/consts/factory/comment';
import { useCreateComment } from '@/hooks/mutate/comment/use-create-comment';
import { setAccountState } from '@/stores/account';
import { useWebSocket } from '@/utils/socket';

import { SecondaryButton } from '../core/secondary-button';
import PostCommentList from './post-comment-list';

interface PostCommentProps {
    postId: string;
    isShown: boolean;
}

const PostComment = ({ postId, isShown }: PostCommentProps) => {
    const socket = useWebSocket();
    const [form] = Form.useForm();

    const queryClient = useQueryClient();
    const { accountInfo } = useSelector((state: RootState) => state.account);

    const { mutate: createComment, isPending: isPendingCreateComment } = useCreateComment();

    useEffect(() => {
        socket.on(SOCKET_EVENT.COMMENT, () => {
            queryClient.invalidateQueries({
                queryKey: commentKeys.byPost(postId),
            });
        });

        return () => {
            socket.off(SOCKET_EVENT.COMMENT);
        };
    }, []);

    const onFinish = (values: CommentCreatePayload) => {
        createComment(
            { ...values, postId },
            {
                onSuccess: () => {
                    form.resetFields();
                    // queryClient.invalidateQueries({
                    //     queryKey: commentKeys.byPost(postId),
                    // });
                },
            },
        );
    };

    return (
        <Flex vertical gap={16}>
            <Flex gap={24} align="center" justify="space-between">
                <Avatar src={accountInfo?.avatar || AvatarPlaceholder} style={{ minWidth: 32 }} />
                <Form
                    name="comment-form"
                    form={form}
                    onFinish={onFinish}
                    style={{
                        width: '100%',
                    }}
                >
                    <Form.Item<CommentCreatePayload>
                        name="content"
                        style={{
                            marginBottom: 0,
                        }}
                    >
                        <Input
                            style={{ width: '100%' }}
                            size="large"
                            placeholder="Enter you comment..."
                            disabled={isPendingCreateComment}
                        />
                    </Form.Item>
                </Form>

                <SecondaryButton form="comment-form" htmlType="submit" loading={isPendingCreateComment}>
                    Comment
                </SecondaryButton>
            </Flex>

            <PostCommentList postId={postId} isShown={isShown} />
        </Flex>
    );
};

export default PostComment;
