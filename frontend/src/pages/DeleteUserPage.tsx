import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

const DeleteUserPage: React.FC = () => {
    const [userId, setUserId] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showList, setShowList] = useState<boolean>(false);
    const [users, setUsers] = useState<any[]>([]);

    // Функция для получения списка пользователей
    const fetchUsers = async () => {
        try {
            const response = await api.get('/users');
            if (response.data.success === 'read') {
                setUsers(response.data.data);
                setShowList(true);
            } else {
                setError(response.data.message || 'Ошибка при получении списка пользователей');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Неизвестная ошибка');
        }
    };

    // Функция для удаления пользователя
    const deleteUser = async () => {
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await api.delete(`/users/${userId}`);
            if (response.data.success === 'delete') {
                setSuccessMessage(response.data.message);
                setUserId(''); // Очищаем поле ID
            } else {
                setError(response.data.message || 'Ошибка при удалении пользователя');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Неизвестная ошибка');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Удалить пользователя</h2>

            {/* Кнопка для показа списка пользователей */}
            <button onClick={fetchUsers} style={styles.button}>
                Показать список пользователей
            </button>

            {/* Список пользователей */}
            {showList && (
                <ul style={styles.list}>
                    {users.map((user: any) => (
                        <li key={user._id} style={styles.listItem}>
                            <span
                                style={styles.clickableId}
                                onClick={() => setUserId(user._id)}
                            >
                                {user._id}
                            </span>{' '}
                            - {user.firstName} {user.lastName || ''}
                        </li>
                    ))}
                </ul>
            )}

            {/* Поле для отображения выбранного ID */}
            <form onSubmit={(e) => e.preventDefault()} style={styles.form}>
                <label>
                    ID пользователя:
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Введите ID"
                        style={styles.input}
                        readOnly
                    />
                </label>
                <button onClick={deleteUser} style={styles.button}>
                    Удалить
                </button>
            </form>

            {/* Отображение сообщений */}
            {successMessage && <p style={styles.success}>{successMessage}</p>}
            {error && <p style={styles.error}>{error}</p>}

            <Link to="/" style={styles.link}>Вернуться на главную</Link>
        </div>
    );
};

// Стили
const styles: { [key: string]: React.CSSProperties } = {
    container: {
        textAlign: 'center',
        marginTop: '50px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        marginTop: '20px',
    },
    input: {
        padding: '8px',
        width: '200px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px 20px',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    list: {
        listStyleType: 'none',
        padding: 0,
        marginTop: '20px',
    },
    listItem: {
        margin: '10px 0',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
    },
    clickableId: {
        color: '#007bff',
        cursor: 'pointer',
        textDecoration: 'underline',
    },
    success: {
        color: 'green',
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        fontWeight: 'bold',
    },
    link: {
        marginTop: '20px',
        textDecoration: 'none',
        color: '#007bff',
    },
};

export default DeleteUserPage;