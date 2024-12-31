import type { RootState } from '@/stores';
import type { PostModalType } from '@/stores/post';
import type { ReportAccountReasons } from '@/types/report/report';

import { Button, Card, Divider, Flex, Modal } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import PageBreadcrumbs from '@/components/core/page-breadcrumbs';
import { PostItem } from '@/components/post/post-item';
import { useCreateReportPost } from '@/hooks/mutate/report/use-create-report';
import { useGetPost } from '@/hooks/query/post/use-get-post';
import { useMessage } from '@/hooks/use-message';
import { setPost } from '@/stores/post';
import { reportAccountReasons } from '@/types/report/report';
import { PATHS } from '@/utils/paths';

import { UpdatePostDraft } from '../post/components/update-post-draft';
import ReportReason from '../user-profile/components/report-reason';

const PostDetailDraftPage = () => {
    const { id } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { modal } = useSelector((state: RootState) => state.post);

    const { success } = useMessage();

    const { data, refetch } = useGetPost(id || '');

    const [selectedReason, setSelectedReason] = useState<ReportAccountReasons>();

    const { mutate: createReport, isPending: isPendingCreateReport } = useCreateReportPost(id || '');

    const handleCancel = (type: PostModalType) => {
        dispatch(setPost({ modal: { open: false, type } }));
    };

    useEffect(() => {
        refetch();
    }, [modal, success, selectedReason]);

    const handleReportAccount = () => {
        if (!selectedReason) {
            return;
        }

        createReport(selectedReason, {
            onSuccess: () => {
                success('Reported successfully!');
                setSelectedReason(undefined);
                dispatch(setPost({ modal: { open: false, type: 'report' } }));
            },
        });
    };

    return (
        <Flex vertical gap={20}>
            <Card>
                <PageBreadcrumbs title="Drafts" />
                <Divider />
            </Card>
            {data && (
                <PostItem
                    data={data}
                    showComment={false}
                    showPublic={false}
                    onClick={() => navigate(`${PATHS.POST_DETAIL_DRAFT.replace(':id', data?.postId)}`)}
                    showLike={false}
                    hideComment={true}
                    isDraft={true}
                />
            )}

            <Modal
                title="Report"
                open={modal.open && modal.type === 'report'}
                onCancel={() => handleCancel('report')}
                footer={null}
            >
                {reportAccountReasons.map((reason, index) => (
                    <ReportReason
                        key={index}
                        reason={reason}
                        selectedReason={selectedReason}
                        setSelectedReason={setSelectedReason}
                    />
                ))}

                <Flex justify="center">
                    <Button
                        type="primary"
                        onClick={handleReportAccount}
                        loading={isPendingCreateReport}
                        disabled={!selectedReason}
                    >
                        Submit
                    </Button>
                </Flex>
            </Modal>

            <UpdatePostDraft onCancel={() => handleCancel('update')} />
        </Flex>
    );
};

export default PostDetailDraftPage;
