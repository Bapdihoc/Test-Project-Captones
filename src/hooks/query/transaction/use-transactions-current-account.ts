import type { FilterTransaction } from '@/types/transaction/transaction';

import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { request } from '@/apis/request';
import { transactionKeys } from '@/consts/factory/transaction';
import { Transaction } from '@/types/transaction/transaction';

export type FilterTransactionParams = {
    viewTransaction: boolean;
    dailyPoint: boolean;
    bonusPoint: boolean;
    orderPoint: boolean;
    orderPointStatus: string;
    startDate?: string;
    endDate?: string;
};

type FilterTransactionProps = {
    params?: FilterTransactionParams;
};

export const useTransactionsCurrentAccount = ({ params }: FilterTransactionProps) => {
    const fetchTransactionsCurrentAccount = async (): Promise<FilterTransaction> => {
        const append =
            params?.startDate && params?.endDate ? `&startDate=${params.startDate}&endDate=${params.endDate}` : '';

        const endpoint = `/utility/filter-transaction?viewTransaction=${params?.viewTransaction}&dailyPoint=${params?.dailyPoint}&bonusPoint=${params?.bonusPoint}&orderPoint=${params?.orderPoint}&orderPointStatus=${params?.orderPointStatus}${append}`;

        const { entity } = await request<FilterTransaction>(
            'get',
            endpoint,
            {},
            {
                paramsSerializer: {
                    indexes: null,
                },
            },
        );

        return entity;
    };

    return useQuery<FilterTransaction>({
        queryKey: transactionKeys.currentAccount(params),
        queryFn: fetchTransactionsCurrentAccount,
        placeholderData: keepPreviousData,
    });
};
