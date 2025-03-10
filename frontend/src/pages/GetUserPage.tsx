import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

const GetUserPage: React.FC = () => {
    const [userId, setUserId] = useState<string>('');
    const [user, setUser] = useState<any>(null);
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

    // Функция для получения пользователя по ID
    const fetchUserById = async () => {
        setError(null);
        setSuccessMessage(null);
        setUser(null);

        try {
            const response = await api.get(`/users/${userId}`);
            if (response.data.success === 'read') {
                setUser(response.data.data);
                setSuccessMessage('Пользователь успешно найден');
            } else {
                setError(response.data.message || 'Ошибка при получении пользователя');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Неизвестная ошибка');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Получить пользователя</h2>

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

            {/* Поле для ввода ID пользователя */}
            <form onSubmit={(e) => e.preventDefault()} style={styles.form}>
                <label>
                    ID пользователя:
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        placeholder="Введите ID"
                        style={styles.input}
                    />
                </label>
                <button onClick={fetchUserById} style={styles.button}>
                    Получить
                </button>
            </form>

            {/* Отображение данных пользователя */}
            {successMessage && <p style={styles.success}>{successMessage}</p>}
            {error && <p style={styles.error}>{error}</p>}
            {user && (
                <div style={styles.userInfo}>
                    <p><strong>Имя:</strong> {user.firstName}</p>
                    <p><strong>Фамилия:</strong> {user.lastName || 'Не указано'}</p>
                    <p><strong>Телефон:</strong> {user.phone}</p>
                </div>
            )}

            <Link to="/" style={styles.link}>Вернуться на главную</Link>
        </div>
    );
};

// Стили
const styles = {
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
        backgroundColor: '#007bff',
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
    userInfo: {
        marginTop: '20px',
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        backgroundColor: '#f9f9f9',
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

export default GetUserPage;