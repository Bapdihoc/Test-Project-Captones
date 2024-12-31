import { Card, Divider, Empty, Flex, Typography } from 'antd';

import PageBreadcrumbs from '@/components/core/page-breadcrumbs';
import { useBlocksListing } from '@/hooks/query/block/use-block-listing';

import { FollowItem } from '../followings/component/follow-item';
import { EventsWrapper } from '../home/layout/events-wrapper';
import { BlockedListItem } from './component/blocked-list-item';

const BLockedListPage = () => {
    const { data: blockedList } = useBlocksListing();

    return (
        <Card>
            <PageBreadcrumbs />
            <Divider />
            <Flex vertical gap={20}>
                <Typography.Title level={4}>Blocked Users</Typography.Title>
                <EventsWrapper>
                    {blockedList?.length ? (
                        blockedList?.map(account => (
                            <BlockedListItem key={account?.accountId} account={account} isBlocked={true} />
                        ))
                    ) : (
                        <Empty description="No recommendation" />
                    )}
                </EventsWrapper>
            </Flex>
        </Card>
    );
};

export default BLockedListPage;
