import { useState, useEffect } from 'react';
import api from '../api/api';

interface ApiResponse {
    success: string;
    message: string;
    data?: any; // Массив пользователей или ошибка
}

const useFetchUsers = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get<ApiResponse>('/users');
                if (response.data.success === 'read') {
                    setUsers(response.data.data); // Устанавливаем данные пользователей
                } else {
                    setError(response.data.message || 'Ошибка при получении данных');
                }
            } catch (err: any) {
                setError(err.message || 'Неизвестная ошибка');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return { users, isLoading, error };
};

export default useFetchUsers;