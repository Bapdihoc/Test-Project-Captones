import type { FC } from 'react';

import { BellOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import { PATHS } from '@/utils/paths';

const NotificationIcon: FC = () => {
    const navigate = useNavigate();

    return (
        <div>
            <BellOutlined
                onClick={() => {
                    navigate(PATHS.NOTIFICATION);
                }}
            />
        </div>
    );
};

export default NotificationIcon;
