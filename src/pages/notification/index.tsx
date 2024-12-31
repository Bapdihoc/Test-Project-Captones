import type { FC } from 'react';

import { Flex } from 'antd';

import { useNotifications } from '@/hooks/query/notification/use-notifications';

import NotificationItem from './notification-item';

const NotificationPage: FC = () => {
    const { data: notifications } = useNotifications();

    return (
        <div>
            <Flex vertical align="stretch" gap={20}>
                {notifications?.map(notification => (
                    <NotificationItem notification={notification} />
                ))}
            </Flex>
        </div>
    );
};

export default NotificationPage;
