import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/api';

const UpdateUserPage: React.FC = () => {
    const [userId, setUserId] = useState<string>('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
    });
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

    // Функция для обновления пользователя
    const updateUser = async () => {
        setError(null);
        setSuccessMessage(null);

        try {
            const response = await api.put(`/users/${userId}`, formData);
            if (response.data.success === 'read') {
                setSuccessMessage(response.data.message);
            } else {
                setError(response.data.message || 'Ошибка при обновлении пользователя');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Неизвестная ошибка');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Изменить пользователя</h2>

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
                                onClick={() => {
                                    setUserId(user._id);
                                    setFormData({
                                        firstName: user.firstName,
                                        lastName: user.lastName || '',
                                        phone: user.phone,
                                    });
                                }}
                            >
                                {user._id}
                            </span>{' '}
                            - {user.firstName} {user.lastName || ''}
                        </li>
                    ))}
                </ul>
            )}

            {/* Форма для обновления пользователя */}
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
                <label>
                    Новое имя:
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        required
                        style={styles.input}
                    />
                </label>
                <label>
                    Новая фамилия:
                    <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        style={styles.input}
                    />
                </label>
                <label>
                    Новый телефон:
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                        style={styles.input}
                    />
                </label>
                <button onClick={updateUser} style={styles.button}>
                    Обновить
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
        backgroundColor: '#ffc107',
        color: '#000',
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

export default UpdateUserPage;