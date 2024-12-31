import type { RootState } from '@/stores';
import type { OnAction, PaginationParams } from '@/types';
import type { FC } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Button, Divider, Empty, Flex, Form, Modal } from 'antd';
import { sortBy } from 'lodash';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { PostItem } from '@/components/post/post-item';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from '@/consts/common';
import { postKeys } from '@/consts/factory/post';
import { useDeleteDraftPost } from '@/hooks/mutate/post/use-delete-post';
import { useDraftsListing } from '@/hooks/query/post/use-posts-listing';
import { useMessage } from '@/hooks/use-message';
import { PostWrapper } from '@/pages/home/layout/post-wrapper';
import { PATHS } from '@/utils/paths';

interface FormFieldValues {
    post: {
        postId: string;
        checked: boolean;
    };
}

interface DraftListProps {
    onCancel: OnAction;
}

const DraftList: FC<DraftListProps> = ({ onCancel }) => {
    const [form] = Form.useForm();

    const { type, open } = useSelector((state: RootState) => state.post.modal);
    const { success } = useMessage();
    const [searchParams, setSearchParams] = useSearchParams();
    const [deletedDrafts, setDeletedDrafts] = useState<string[]>([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialParams: PaginationParams = {
        page: DEFAULT_PAGE,
        perPage: DEFAULT_PAGE_SIZE,
    };

    const [isSelectAll, setIsSelectAll] = useState(false);

    const { data } = useDraftsListing({
        params: {
            ...initialParams,
        },
    });

    const filteredData = data?.filter(post => post?.topic?.category?.categoryId === searchParams.get('category'));

    const queryClient = useQueryClient();

    const { mutate: deleteDraft } = useDeleteDraftPost();

    const toggleSelectAll = () => {
        setIsSelectAll(prev => !prev);
    };

    const handleSelectAll = () => {
        toggleSelectAll();
        form.setFieldValue(
            'post',
            sortBy(filteredData, 'createdDate').map(post => ({
                postId: post.postId,
                checked: true,
            })),
        );
    };

    const handleUnselectAll = () => {
        toggleSelectAll();
        form.setFieldValue(
            'post',
            sortBy(filteredData, 'createdDate').map(post => ({
                postId: post.postId,
                checked: false,
            })),
        );
    };

    const onFinish = (values: FormFieldValues) => {
        console.log(values);
    };

    const handleDeleteDrafts = async () => {
        const deletedIds = form
            .getFieldValue('post')
            .filter((post: FormFieldValues['post']) => post.checked)
            .map((post: FormFieldValues['post']) => post.postId);

        deleteDraft(deletedIds, {
            onSuccess: () => {
                form.resetFields();
                queryClient.invalidateQueries({
                    queryKey: postKeys.drafts(),
                });
                success('Drafts deleted successfully');
            },
        });
    };

    const remainingDrafts = [...(data || [])]?.filter(post => !deletedDrafts.includes(post.postId));

    useEffect(() => {
        if (data) {
            form.setFieldsValue({
                post: data.map(post => ({
                    postId: post.postId,
                })),
            });
        }
    }, [data]);

    return (
        <Modal
            title={
                <Flex justify="space-between">
                    Drafts List
                    <Button
                        htmlType="submit"
                        form="draft"
                        style={{
                            marginRight: 24,
                        }}
                    >
                        Done
                    </Button>
                </Flex>
            }
            open={type === 'draft' && open}
            onCancel={onCancel}
            width={'80vw'}
            footer={null}
        >
            <PostWrapper>
                {filteredData?.length ? (
                    <>
                        <Form<FormFieldValues> name="draft" form={form} onFinish={onFinish}>
                            <Form.List name="post">
                                {fields => (
                                    <PostWrapper>
                                        {fields.map((field, index) => (
                                            <PostItem
                                                data={filteredData[index]}
                                                key={field.key}
                                                showActions={false}
                                                showCheckbox
                                                field={field}
                                                showDetail={false}
                                                showComment={false}
                                                showLike={false}
                                                showPublic={false}
                                                isDraft={true}
                                                onClick={() => {
                                                    navigate(
                                                        `${PATHS.POST_DETAIL_DRAFT.replace(
                                                            ':id',
                                                            filteredData[index].postId,
                                                        )}?category=${searchParams.get('category')}`,
                                                    );
                                                }}
                                            />
                                        ))}
                                    </PostWrapper>
                                )}
                            </Form.List>
                        </Form>

                        <Divider />

                        <Flex justify="space-between">
                            {isSelectAll ? (
                                <Button size="large" type="link" onClick={handleUnselectAll}>
                                    Unselect All
                                </Button>
                            ) : (
                                <Button size="large" type="link" onClick={handleSelectAll}>
                                    Select All
                                </Button>
                            )}
                            <Button size="large" danger type="link" onClick={handleDeleteDrafts}>
                                Delete
                            </Button>
                        </Flex>
                    </>
                ) : (
                    <Empty />
                )}
            </PostWrapper>
        </Modal>
    );
};

export default DraftList;
