import type { TabsProps } from 'antd';

import React from 'react';

import PageBreadcrumbs from '@/components/core/page-breadcrumbs';
import { BaseTab } from '@/components/core/tab';

import AdminFeedbackWrapper from '../feedback/layout/admin-feedback-wrapper';
import AdminAccountReportList from './components/admin-account-report-list';
import AdminReportList from './components/admin-report-list';

const AdminReportPage = () => {
    const items: TabsProps['items'] = [
        {
            key: '1',
            label: '',
            children: <AdminReportList />,
        },
        // {
        //     key: '2',
        //     label: 'Account',
        //     children: <AdminAccountReportList />,
        // },
    ];

    return (
        <AdminFeedbackWrapper>
            <PageBreadcrumbs />
            <BaseTab items={items} defaultActiveKey="1" />
            {/* <AdminReportList /> */}
        </AdminFeedbackWrapper>
    );
};

export default AdminReportPage;
