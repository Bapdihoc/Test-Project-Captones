import type { AxiosResponse } from 'axios';

import axios from 'axios';

const BASE_URL = 'https://fifoforumonline.click';

export async function get<T>(endpoint: string): Promise<AxiosResponse<T>> {
    try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get<T>(`${BASE_URL}${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        throw new Error(`GET request failed: ${error}`);
    }
}

export async function post<T>(endpoint: string, data: any): Promise<AxiosResponse<T>> {
    try {
        const token = localStorage.getItem('access_token');
        const response = await axios.post<T>(`${BASE_URL}${endpoint}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        throw new Error(`POST request failed: ${error}`);
    }
}

export async function put<T>(endpoint: string, data: any): Promise<AxiosResponse<T>> {
    try {
        const token = localStorage.getItem('access_token');
        const response = await axios.put<T>(`${BASE_URL}${endpoint}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        throw new Error(`PUT request failed: ${error}`);
    }
}

export async function deleteRequest<T>(endpoint: string): Promise<AxiosResponse<T>> {
    try {
        const token = localStorage.getItem('access_token');
        const response = await axios.delete<T>(`${BASE_URL}${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response;
    } catch (error) {
        throw new Error(`DELETE request failed: ${error}`);
    }
}
