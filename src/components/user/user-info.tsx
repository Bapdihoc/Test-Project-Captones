import type { Account } from '@/types/account';
import type { FC } from 'react';

import { Avatar, Flex, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AvatarPlaceholder from '/public/avatar-placeholder.svg';
import { setAccountState } from '@/stores/account';
import { setPost } from '@/stores/post';

interface UserInfoProps {
    account: Account;
    isOwner?: boolean;
}

export const UserInfo: FC<UserInfoProps> = ({ account, isOwner = false }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleNavigate = () => {
        if (isOwner) {
            dispatch(setPost({ modal: { open: false, type: 'draft' } }));
        }

        navigate(isOwner ? '/profile' : `/user-profile/${account?.accountId}`);
        dispatch(setAccountState({ userInfo: account }));
    };

    return (
        <Flex
            align="center"
            onClick={e => {
                e.stopPropagation();
                handleNavigate();
            }}
            gap={8}
        >
            <Avatar size={40} shape="circle" src={account?.avatar || AvatarPlaceholder} />
            <Flex vertical>
                <Typography.Text>{account?.username}</Typography.Text>
                <Typography.Text type="secondary">{account?.handle?.toLowerCase()}</Typography.Text>
            </Flex>
        </Flex>
    );
};
