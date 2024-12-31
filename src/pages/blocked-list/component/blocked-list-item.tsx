import type { RootState } from '@/stores';
import type { Account } from '@/types/account';

import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Flex, Image, Modal, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import AmdSvg from '/public/amd.svg';
import { blockKeys } from '@/consts/factory/block';
import { useToggleBlock } from '@/hooks/mutate/block/use-toggle-block';
import { useMessage } from '@/hooks/use-message';
import { setAccountState } from '@/stores/account';
import { PATHS } from '@/utils/paths';

interface BlockedListItemProps {
    account: Account;
    isBlocked?: boolean;
}

const { confirm } = Modal;

export const BlockedListItem = ({ account, isBlocked }: BlockedListItemProps) => {
    const navigate = useNavigate();

    const { accountInfo } = useSelector((state: RootState) => state.account);

    const dispatch = useDispatch();

    const { success, error } = useMessage();
    const queryClient = useQueryClient();
    const { mutate: toggleBlock } = useToggleBlock();

    const handleToggleBlock = () => {
        confirm({
            title: isBlocked
                ? `Do you want to unblock ${account?.username}?`
                : `Do you want to block ${account?.username}?`,
            onOk() {
                toggleBlock(
                    { accountID: account?.accountId as string },
                    {
                        onSuccess: () => {
                            queryClient.invalidateQueries({
                                queryKey: blockKeys.listing(),
                            });
                            success(isBlocked ? 'Unblocked successfully' : 'Blocked successfully');
                        },
                        onError: err => {
                            error(err.message);
                        },
                    },
                );
            },
        });
    };

    return (
        <Flex align="flex-start" gap={10} justify="space-between" onClick={() => navigate(PATHS.RECOMMENDATIONS)}>
            <Flex
                gap={10}
                onClick={e => {
                    e.stopPropagation();
                    navigate(`/user-profile/${account?.accountId}`);
                    dispatch(setAccountState({ userInfo: account }));
                }}
            >
                <Image
                    style={{
                        borderRadius: 10,
                        width: 58,
                        height: 58,
                        objectFit: 'cover',
                        boxShadow: '0px 3px 4px 0px #FA89240F',
                    }}
                    src={account?.avatar || AmdSvg}
                    alt="creator"
                    preview={false}
                />

                <Flex vertical style={{ minWidth: 94 }}>
                    <Typography.Text>{account?.username}</Typography.Text>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                        {account?.handle}
                    </Typography.Text>
                </Flex>
            </Flex>

            {isBlocked ? (
                <Button
                    type="primary"
                    size="small"
                    onClick={e => {
                        e.stopPropagation();
                        handleToggleBlock();
                    }}
                >
                    <MinusOutlined style={{ fontSize: 12, marginRight: 1 }} />
                    UnBlocked
                </Button>
            ) : (
                <Button
                    type="primary"
                    size="small"
                    onClick={e => {
                        e.stopPropagation();
                        handleToggleBlock();
                    }}
                >
                    <PlusOutlined style={{ fontSize: 12, marginRight: 10 }} />
                    Blocked
                </Button>
            )}
        </Flex>
    );
};
